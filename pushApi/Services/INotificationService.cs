using Api.Models;
using FirebaseAdmin.Messaging;

namespace Api.Services;

/// <summary>
/// Represents a service that handles operations with push notifications.
/// </summary>
public interface INotificationService
{
    /// <summary>
    /// Subscribes a user to push notifications by its token.
    /// </summary>
    /// <param name="user">
    /// User object where user's token has to be included in the body of a request.
    /// </param>
    /// <returns></returns>
    Task<List<User>> SubscribeAsync(User user);
    
    /// <summary>
    /// Unsubscribes a user from all push notifications by its token.
    /// </summary>
    /// <param name="user">
    /// User object where user's token has to be included in the body of a request.
    /// </param>
    /// <returns></returns>
    Task<List<User>> UnsubscribeAsync(User user);
    
    /// <summary>
    /// Subscribes a user to a specific topic.
    /// </summary>
    /// <param name="messageInfo">
    /// MessageInfo object where user's token and the chosen topic name
    /// have to be included in the body of a request.
    /// </param>
    /// <returns></returns>
    Task<TopicManagementResponse> SubscribeToTopicAsync(MessageInfo messageInfo);
    
    /// <summary>
    /// Unsubscribes a user from a specific topic.
    /// </summary>
    /// <param name="messageInfo">
    /// MessageInfo object where user's token and the chosen topic name
    /// have to be included in the body of a request.
    /// </param>
    /// <returns></returns>
    Task<TopicManagementResponse> UnsubscribeFromTopicAsync(MessageInfo messageInfo);
    
    /// <summary>
    /// Sends a push notification to subscribed users.
    /// </summary>
    /// <param name="messageInfo">
    /// Information about message to be sent.
    /// Required properties in the body of a request are topic, title or body. 
    /// </param>
    /// <returns></returns>
    Task<BatchResponse> SendEveryoneAsync(MessageInfo messageInfo);
    
    /// <summary>
    /// Sends a push notification by topic.
    /// </summary>
    /// <param name="messageInfo">
    /// Information about message to be sent.
    /// Required properties in the body of a request are topic, title or body.
    /// </param>
    /// <returns></returns>
    Task<string> SendByTopicAsync(MessageInfo messageInfo);
}