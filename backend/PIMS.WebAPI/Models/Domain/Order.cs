namespace PIMS.WebAPI.Models.Domain
{
    public class Order
    {
        public int Id { get; set; }

        public string CustomerName { get; set; } = null!;

        public string CustomerEmail { get; set; } = null!;

        public List<OrderedProduct> OrderedProducts { get; set; } = null!;

    }

    public class OrderedProduct
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int ProductQuantity { get; set; }

    }
}
