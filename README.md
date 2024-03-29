# push-notification-service

This is a web service for enabling Push notifications on websites and a demo website. <br><br>
The folder pushApi is for handling requests on a server side.<br> The folder pushClient contains the logic for a client side.<br>

Backend is based on
* C#
* REST
* ASP .NET Core
* Entity Framework
* PostgreSQL
* Firebase Cloud Messaging

Frontend:
* HTML
* CSS
* JavaScript
* Firebase Cloud Messaging

The main goal of the project is to make a service that helps a developer to enable push notifications for websites.<br/>
To demonstrate what the service is capable for I created a demo web app (frontend):<br/>

Users of the demo app can:
* Subscribe for push notifications
* Unsubscribe from push notifications
* Send a message to all subscribed users
* Subscribe to a topic of messages
* Unsubscribe from a topic of messages
* Send a message by its topic

Main page:
<img width="1070" alt="Снимок экрана 2022-08-25 в 00 51 23" src="https://user-images.githubusercontent.com/70920112/186534297-f2c7eba1-e3de-4a68-85ca-6f994972cf09.png">

<img width="1070" alt="Снимок экрана 2022-08-25 в 00 51 36" src="https://user-images.githubusercontent.com/70920112/186534553-a2c93737-3f97-4a4e-becc-2bef9875c389.png">

Sending a message from another browser and getting a message in inactive browser:<br>
<img width="1440" alt="Снимок экрана 2022-08-25 в 00 56 09" src="https://user-images.githubusercontent.com/70920112/186534662-0f1a9364-d11c-4d7d-9029-afd394c54055.png">

Sending a message by its topic:
<img width="1440" alt="Снимок экрана 2022-08-25 в 00 59 12" src="https://user-images.githubusercontent.com/70920112/186535335-c242ce2e-20ff-4dc7-976e-380963638568.png">
