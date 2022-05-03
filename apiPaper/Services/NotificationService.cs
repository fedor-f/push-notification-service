using Api.Models;
using FirebaseAdmin.Messaging;
using Microsoft.EntityFrameworkCore;
using AppContext = Api.Data.AppContext;

namespace Api.Services;

public class NotificationService : INotificationService
{
    private readonly AppContext _appContext;

    public NotificationService(AppContext appContext)
    {
        _appContext = appContext;
    }
    
    public async Task<List<Model>> SubscribeAsync(Model obj)
    {
        _appContext.users.Add(obj);
        await _appContext.SaveChangesAsync();

        return await _appContext.users.ToListAsync();
    }

    public async Task<List<Model>> UnsubscribeAsync(Model obj) 
    {
        var objectToRemove = _appContext.users.FirstOrDefaultAsync(model => model.token == obj.token);
        _appContext.users.Remove(await objectToRemove);
        await _appContext.SaveChangesAsync();
        
        return await _appContext.users.ToListAsync();
    }

    public async Task<TopicManagementResponse> SubscribeToTopicAsync(MessageInfo messageInfo)
    {
        var list = new List<string>
        {
            messageInfo.Token
        };
        var response = await FirebaseMessaging.DefaultInstance.SubscribeToTopicAsync(list, messageInfo.Topic);
        return response;
    }

    public async Task<TopicManagementResponse> UnsubscribeFromTopicAsync(MessageInfo messageInfo)
    {
        var list = new List<string>
        {
            messageInfo.Token
        };
        var response = await FirebaseMessaging.DefaultInstance.UnsubscribeFromTopicAsync(list, messageInfo.Topic);
        return response;
    }

    public async Task<BatchResponse> SendEveryoneAsync(MessageInfo messageInfo)
    {
        var message = new MulticastMessage()
        {
            Tokens = _appContext.users.Select(tokens => tokens.token).ToList(),
            Notification = new Notification()
            {
                Title = messageInfo.Title,
                Body = messageInfo.Body,
                ImageUrl = messageInfo.Image
            }
        };
        
        if (!message.Tokens.Any())
        {
            throw new ArgumentException("No one subscribed.");
        }

        if (message.Notification.Title is null && message.Notification.Body is null)
        {
            throw new ArgumentException("Cannot send a notification without body and title." +
                                        $"{Environment.NewLine}At least body or title should be present.");
        }
        return await FirebaseMessaging.DefaultInstance.SendMulticastAsync(message);
    }

    public async Task<string> SendByTopicAsync(MessageInfo messageInfo)
    {
        var message = new Message()
        {
            Topic = messageInfo.Topic,
            Notification = new Notification()
            {
                Title = messageInfo.Title,
                Body = messageInfo.Body,
                ImageUrl = messageInfo.Image
            }
        };

        if (message.Notification.Title is null && message.Notification.Body is null)
        {
            throw new ArgumentException("Cannot send a notification without body and title." +
                                        $"{Environment.NewLine}At least body or title should be present.");
        }
        var response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
        return response;
    }
}