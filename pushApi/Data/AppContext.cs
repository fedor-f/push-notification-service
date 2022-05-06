using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class AppContext : DbContext
{
    public DbSet<User> users { get; set; }
    
    public AppContext(DbContextOptions<AppContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSerialColumns();
    }
}
