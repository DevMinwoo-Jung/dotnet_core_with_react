using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<Product> Products { get; set; } // db table처럼 접근 가능함

    }
}
