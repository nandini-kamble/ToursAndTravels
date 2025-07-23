using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToursAndTravels.Data;
using ToursAndTravels.Models;
using System.Security.Claims;

namespace ToursAndTravels.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> BookTrip([FromBody] Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok(booking);
        }

        [HttpGet("user")]
        [Authorize(Roles = "User,Admin")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetUserBookings()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return Unauthorized();

            var bookings = await _context.Bookings
                .Include(b => b.Destination)
                .Where(b => b.UserId == user.Id)
                .ToListAsync();

            return Ok(bookings);
        }
    }
}
