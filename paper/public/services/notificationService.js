let messaging;

class NotificationService {
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyAQYtWqy3K9n7bNkonXMFk8dkNhHxjgjDE",
            authDomain: "windowspaper-55794.firebaseapp.com",
            projectId: "windowspaper-55794",
            storageBucket: "windowspaper-55794.appspot.com",
            messagingSenderId: "454663090251",
            appId: "1:454663090251:web:ab888033f4bb4f6cf55dce"
        });
        
        messaging = firebase.messaging();    
    }

    topicSubscribe() {
        messaging.getToken().then((currentToken) => {
            let topicButtons = $("#topic :selected").text();
            
            let data = { topic: topicButtons, token: currentToken };
    
            $.ajax({
                type: 'POST',
                url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler/subscribe/topic',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
        });
    }
    
    topicUnsubscribe() {
        messaging.getToken().then((currentToken) => {
            let topicButtons = $("#topic :selected").text();
            let data = { topic: topicButtons, token: currentToken };
    
            $.ajax({
                type: 'POST',
                url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler/unsubscribe/topic',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
        });
    }
    
    sendByTopic() {
        let titleForm = document.querySelector('#title-topic').value;
        let bodyForm = document.querySelector('#body-topic').value;
        let imageForm = document.querySelector('#image-topic').value;
        let topicButtons = $("#topic-send :selected").text();
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
    
    unsubscribe() {
        messaging.getToken().then((currentToken) => {
            console.log(currentToken);
            window.localStorage.removeItem('sentFirebaseMessagingToken');
            let data = { token: currentToken };
    
            $.ajax({
                type: 'DELETE',
                url: 'https://paper-api-host.herokuapp.com/api/NotificationHandler',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }); 
        });
    }
    
    sendAll() {
        let titleForm = document.querySelector('#title').value;
        let bodyForm = document.querySelector('#body').value;
        let imageForm = document.querySelector('#image').value;
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
    
    subscribe() {
        messaging.requestPermission()
            .then(() => {
                messaging.getToken()
                    .then((currentToken) => {
                        console.log(currentToken);
                        if (currentToken) {
                            sendTokenToServer(currentToken);
                        } else {
                            console.warn('Не удалось получить токен.');
                            setTokenSentToServer(false);
                        }
                    })
                    .catch(function (err) {
                        console.warn('При получении токена произошла ошибка.', err);
                        setTokenSentToServer(false);
                    });
        })
        .catch(function (err) {
            console.warn('Не удалось получить разрешение на показ уведомлений.', err);
        });
    }
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Отправка токена на сервер...');

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
        console.log('Токен уже отправлен на сервер.');
    }
}

function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') === currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}