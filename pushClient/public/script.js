const service = new NotificationService();

if ('Notification' in window) {
    $('#subscribe').on('click', () => {
        service.subscribe();
    });

    $('#unsubscribe').on('click', () => {
        service.unsubscribe();
    });

    $('#send').on('click', () => {
        let titleForm = document.querySelector('#title').value;
        let bodyForm = document.querySelector('#body').value;
        let imageForm = document.querySelector('#image').value;

        service.sendAll(titleForm, bodyForm, imageForm);
    });

    $('#topic-subscribe').on('click', () => {
        let topicButtons = $("#topic :selected").text();

        service.topicSubscribe(topicButtons);
    });

    $('#topic-unsubscribe').on('click', () => {
        let topicButtons = $("#topic :selected").text();

        service.topicUnsubscribe(topicButtons);
    });

    $('#send-by-topic').on('click', () => {
        let titleForm = document.querySelector('#title-topic').value;
        let bodyForm = document.querySelector('#body-topic').value;
        let imageForm = document.querySelector('#image-topic').value;
        let topicButtons = $("#topic-send :selected").text();

        service.sendByTopic(titleForm, bodyForm, imageForm, topicButtons);
    });
} else {
    alert("Уведомления не поддерживаются этим браузером");
}