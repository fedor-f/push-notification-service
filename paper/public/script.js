const service = new NotificationService();

if ('Notification' in window) {
    if (Notification.permission === 'granted') {
        service.subscribe();
    }

    $('#subscribe').on('click', () => {
        service.subscribe();
    });

    $('#unsubscribe').on('click', () => {
        service.unsubscribe();
    });

    $('#send').on('click', () => {
        service.sendAll();
    });

    $('#topic-subscribe').on('click', () => {
        service.topicSubscribe();
    });

    $('#topic-unsubscribe').on('click', () => {
        service.topicUnsubscribe();
    });

    $('#send-by-topic').on('click', () => {
        service.sendByTopic();
    });
}