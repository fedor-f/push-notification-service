/*
 * Move the file to the root of your app's directory to register firebase service worker.
 */ 
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const credentials = await(
    fetch('https://paper-api-host.herokuapp.com/api/ClientAccess')
        .then(response => response.json())
        .then(data => data));

firebase.initializeApp(credentials);
const messaging = firebase.messaging();