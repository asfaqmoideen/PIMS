using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PIMS.WebAPI.Models.Domain;

namespace PIMS.WebAPI.Data
{
    public class PIMSWebAPIContext : DbContext
    {
        public PIMSWebAPIContext (DbContextOptions<PIMSWebAPIContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);             
        }

    }
}
