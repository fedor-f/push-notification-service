using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationHandlerController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationHandlerController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpPost]
    [Route("send/topic")]
    [EnableCors("policy")]
    public async Task<ActionResult<List<User>>> SendByTopic([FromBody] MessageInfo messageInfo)
    {
        if (messageInfo.Topic is null) return BadRequest("Topic can not be null");
        
        try
        {
            return Ok(await _notificationService.SendByTopicAsync(messageInfo));
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("send")]
    [EnableCors("policy")]
    public async Task<IActionResult> SendAll([FromBody] MessageInfo messageInfo)
    {
        try
        {
            return Ok(await _notificationService.SendEveryoneAsync(messageInfo));
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("subscribe/topic")]
    [EnableCors("policy")]
    public async Task<IActionResult> SubscribeToTopic([FromBody] MessageInfo topicInfo)
    {
        if (topicInfo.Token is null) return BadRequest();
        
        return Ok(await _notificationService.SubscribeToTopicAsync(topicInfo));
    }

    [HttpPost]
    [Route("unsubscribe/topic")]
    [EnableCors("policy")]
    public async Task<IActionResult> UnsubscribeToTopic([FromBody] MessageInfo topicInfo)
    {
        if (topicInfo.Token is null) return BadRequest();
        
        return Ok(await _notificationService.UnsubscribeFromTopicAsync(topicInfo));
    }

    [HttpPost]
    [EnableCors("policy")]
    public async Task<ActionResult<List<User>>> Subscribe([FromBody] User obj)
    {
        return Ok(await _notificationService.SubscribeAsync(obj));
    }

    [HttpDelete]
    [EnableCors("policy")]
    public async Task<ActionResult<List<User>>> Unsubscribe([FromBody] User obj)
    {
        try
        {
            return Ok(await _notificationService.UnsubscribeAsync(obj));
        }
        catch (ArgumentNullException)
        {
            return BadRequest("The item does not exist");
        }
    }
}