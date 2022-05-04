importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAQYtWqy3K9n7bNkonXMFk8dkNhHxjgjDE",
    authDomain: "windowspaper-55794.firebaseapp.com",
    projectId: "windowspaper-55794",
    storageBucket: "windowspaper-55794.appspot.com",
    messagingSenderId: "454663090251",
    appId: "1:454663090251:web:ab888033f4bb4f6cf55dce"
});

const messaging = firebase.messaging();