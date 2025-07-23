using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToursAndTravels.Data;
using ToursAndTravels.Models;

namespace ToursAndTravels.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DestinationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destination>>> GetAll()
        {
            return await _context.Destinations.ToListAsync();
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<Destination>> GetByName(string name)
        {
            var dest = await _context.Destinations
                .FirstOrDefaultAsync(d => d.Name.ToLower() == name.ToLower());

            if (dest == null)
                return NotFound();

            return dest;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Destination>> AddDestination(Destination dest)
        {
            _context.Destinations.Add(dest);
            await _context.SaveChangesAsync();
            return Ok(dest);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDestination(int id)
        {
            var dest = await _context.Destinations.FindAsync(id);
            if (dest == null)
                return NotFound();

            _context.Destinations.Remove(dest);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Destination deleted successfully." });
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDestination(int id, Destination updatedDest)
        {
            var existing = await _context.Destinations.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = updatedDest.Name;
            existing.Description = updatedDest.Description;
            existing.ImageUrl = updatedDest.ImageUrl;
            await _context.SaveChangesAsync();

            return Ok(existing);
        }
    }
}
