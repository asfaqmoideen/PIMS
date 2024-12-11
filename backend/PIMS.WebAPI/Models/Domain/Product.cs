using System.ComponentModel.DataAnnotations;

namespace PIMS.WebAPI.Models.Domain
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public int Quantity { get; set; }

        public decimal Price { get; set; } = 0;
    }
}
