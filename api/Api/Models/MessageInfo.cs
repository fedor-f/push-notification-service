namespace Api.Models;

/// <summary>
/// Represents information about message to be sent.
/// </summary>
public class MessageInfo
{
    public string? Title { get; set; }
    
    public string? Body { get; set; }
    
    public string? Image { get; set; }
    
    public string? Topic { get; set; }
    
    public string? Token { get; set; }
}