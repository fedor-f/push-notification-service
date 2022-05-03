using Api.Services;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using AppContext = Api.Data.AppContext;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppContext>(options =>
{
    string[] strings = {"postgres://", ":", "@", "/"};
    var data = Environment.GetEnvironmentVariable("DATABASE_URL").Split(strings, StringSplitOptions.None);
    options.UseNpgsql($"Server={data[3]};Database={data[5]};Port={data[4]};User Id={data[1]};Password={data[2]}");
});
builder.Services.AddScoped<INotificationService, NotificationService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("policy",
        policy =>
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors();

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("windowspaper.json")
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();