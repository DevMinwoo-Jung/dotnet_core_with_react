using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace API.Controllers
{
  public class BasketController: BaseApiController
  {
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
      var basket = await RetrieveBasket();

      if (basket == null) return NotFound();

      return basket;
    }


    [HttpPost] // api/basket?productId=3&quantity=2
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
      // get basket || // create basket

      var basket = await RetrieveBasket();

      if(basket == null) basket = CreateBasket();

      // get product
      var product = await _context.Products.FindAsync(productId);
      if (product == null) return NotFound();

      // add item
      basket.AddItem(product, quantity);

      // save changes
      var result = await _context.SaveChangesAsync() > 0; // 0보다 작으면 문제가 있는거임

      if(result) return StatusCode(201);

      // 위 조건에 안걸리면 밑에꺼 실행
      return BadRequest(new ProblemDetails{Title = "Problem occured"});

    }


    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
      // get basket
      // remove item or reduce quantity
      // save changes
      return Ok();
    }


    private async Task<Basket?> RetrieveBasket()
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

  }
}