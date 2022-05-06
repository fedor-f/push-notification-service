using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientAccessController : ControllerBase
{
    [HttpGet]
    [EnableCors("policy")]
    public async Task<IActionResult> GetClientData()
    {
        var fetchClientConfig = Environment.GetEnvironmentVariable("FIREBASE_CLIENT_CREDENTIALS");

        return Ok(fetchClientConfig);
    }
}