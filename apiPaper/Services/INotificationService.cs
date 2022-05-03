using Api.Models;
using FirebaseAdmin.Messaging;

namespace Api.Services;

public interface INotificationService
{
    Task<List<Model>> SubscribeAsync(Model model);
    Task<List<Model>> UnsubscribeAsync(Model model);
    Task<TopicManagementResponse> SubscribeToTopicAsync(MessageInfo messageInfo);
    Task<TopicManagementResponse> UnsubscribeFromTopicAsync(MessageInfo messageInfo);
    Task<BatchResponse> SendEveryoneAsync(MessageInfo messageInfo);
    Task<string> SendByTopicAsync(MessageInfo messageInfo);
}