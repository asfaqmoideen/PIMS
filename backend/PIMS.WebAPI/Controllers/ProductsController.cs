
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PIMS.WebAPI.Data;
using PIMS.WebAPI.Models.Domain;
using PIMS.WebAPI.Models.Dto;
using System;

namespace PIMS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly PIMSWebAPIContext _context;
        private readonly IMapper mapper;
        public ProductsController(PIMSWebAPIContext context, IMapper automapper)
        {
            _context = context;
            mapper = automapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(mapper.Map<List<ProductDto>>(products));
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(AddProductRequestDto productDto)
        {   
            var product = mapper.Map<Product>(productDto);
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, UpdateProductRequestDto productDto)
        {
            
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound("Product not found.");
            }

            var product = mapper.Map<Product>(productDto);
            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.Quantity = product.Quantity;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Concurrency issue occurred. The record may have been modified or deleted.");
            }

            return Ok(mapper.Map<ProductDto>(existingProduct));
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}
