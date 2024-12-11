namespace PIMS.WebAPI.Models.Dto
{
    public class AddProductRequestDto
    {
        public string Name { get; set; } = null!;

        public int Quantity { get; set; }

        public decimal Price { get; set; } = 0;
    }
}
