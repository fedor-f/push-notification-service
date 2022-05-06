namespace Api.Models;

/// <summary>
/// Represents registered user information in a database. 
/// </summary>
public class User
{
    public int id { get; set; }
    
    public string token { get; set; }
}