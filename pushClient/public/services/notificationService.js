let messaging;

class NotificationService {
    constructor() {
        this.initialize();
    }

    async initialize() {
        const credentials = await (
            fetch('https://paper-api-host.herokuapp.com/api/ClientAccess')
                .then(response => response.json())
                .then(data => data));

        firebase.initializeApp(credentials);
        messaging = firebase.messaging();
        this.showOnMobileDeviceAndInForeground(messaging);
    }

    showOnMobileDeviceAndInForeground(messaging) {
        messaging.onMessage(payload => {
            navigator.serviceWorker.register('services/messaging-sw.js');

            Notification.requestPermission(result => {
                if (result === 'granted') {
                    navigator.serviceWorker.ready.then(registration => {
                        return registration.showNotification(payload.notification.title, payload.notification);
                    });
                }
            });
        });
    }

    topicSubscribe(topicName) {
        messaging.getToken().then(currentToken => {
            console.log(currentToken);

            if (!isTokenSentToServer(currentToken, topicName)) {
                window.localStorage.setItem(topicName, currentToken);
            } else {
                console.log("The user is already subscribed to the topic.")
            }

            let data = { topic: topicName, token: currentToken };

            $.ajax({
                type: 'POST',
                url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler/subscribe/topic',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
        });
    }

    topicUnsubscribe(topicName) {
        let data = { topic: topicName, token: window.localStorage.getItem(topicName) };

        $.ajax({
            type: 'POST',
            url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler/unsubscribe/topic',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        window.localStorage.removeItem(topicName);
    }

    sendByTopic(titleForm, bodyForm, imageForm, topicButtons) {
        let data;

        if ((imageForm === '' || imageForm.match(/^ *$/) !== null)) {
            data = { title: titleForm, body: bodyForm, topic: topicButtons };
        } else {
            data = { title: titleForm, body: bodyForm, image: imageForm, topic: topicButtons };
        }

        $.ajax({
            type: 'POST',
            url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler/send/topic',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    sendAll(titleForm, bodyForm, imageForm) {
        let data;

        if ((imageForm === '' || imageForm.match(/^ *$/) !== null)) {
            data = { title: titleForm, body: bodyForm };
        } else {
            data = { title: titleForm, body: bodyForm, image: imageForm };
        }

        $.ajax({
            type: 'POST',
            url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler/send',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    unsubscribe() {
        messaging.deleteToken().then(success => {
            if (success) {
                let data = { token: window.localStorage.getItem('sentFirebaseMessagingToken') };

                $.ajax({
                    type: 'DELETE',
                    url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });

                window.localStorage.removeItem('sentFirebaseMessagingToken');
            } else {
                console.log("An error occurred while deleting a token");
            }
        });
    }

    subscribe() {
        messaging.getToken()
            .then(currentToken => {
                console.log(currentToken);
                if (currentToken) {
                    sendTokenToServer(currentToken);
                } else {
                    console.warn('Unable to get token');
                    setTokenSentToServer(false);
                }
            })
    }
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken, 'sentFirebaseMessagingToken')) {
        console.log('Sent to a server');

        var dataJSON = { token: currentToken };

        $.ajax({
            type: 'POST',
            url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler',
            data: JSON.stringify(dataJSON),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        setTokenSentToServer(currentToken);
    } else {
        console.log('Token already exists.');
    }
}

function isTokenSentToServer(currentToken, name) {
    return window.localStorage.getItem(name) === currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}