using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class BasketController: BaseApiController
  {
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();
        Console.WriteLine(basket);

        if (basket == null) return NotFound();

        return MapBasketToDto(basket);
    }



    [HttpPost] // api/basket?productId=3&quantity=2
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
      // get basket || // create basket

      var basket = await RetrieveBasket();

      if (basket == null) basket = CreateBasket();

      // get product
      var product = await _context.Products.FindAsync(productId);
      if (product == null) return NotFound();

      // add item
      basket.AddItem(product, quantity);

      // save changes
      var result = await _context.SaveChangesAsync() > 0; // 0보다 작으면 문제가 있는거임

      if(result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

      // 위 조건에 안걸리면 밑에꺼 실행
      return BadRequest(new ProblemDetails{Title = "Problem occured"});

    }


    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {

      var basket = await RetrieveBasket();

      if (basket == null) return NotFound();
    
      basket.RemoveItem(productId, quantity);

      var result = await _context.SaveChangesAsync() > 0 ;

      if (result)
      {
        return Ok();
      } 

      return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"});

    }


    private async Task<Basket> RetrieveBasket()
    {
      return await _context.Baskets
        .Include(i => i.Items)
        .ThenInclude(p => p.Product)
        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
    }

    private Basket CreateBasket()
    {
      var buyerId = Guid.NewGuid().ToString();
      if (string.IsNullOrEmpty(buyerId))
        {
            buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        }

      var basket = new Basket { BuyerId = buyerId };
      _context.Baskets.Add(basket);
      return basket;
    }

    private BasketDto MapBasketToDto(Basket basket)
    {
      return new BasketDto
      {
        Id = basket.Id,
        BuyerId = basket.BuyerId,
        Items = basket.Items.Select(item => new BasketItemDto
        {
          ProductId = item.ProductId,
          Name = item.Product.Name,
          Price = item.Product.Price,
          PictureUrl = item.Product.PictureUrl,
          Brand = item.Product.Brand,
          Type = item.Product.Type,
          Quantity = item.Quantity
        }).ToList()
      };
    }
  }
}