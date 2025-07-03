import { useState } from 'react';

const contactImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
];

function ContactUs() {
  return (
    <div className="contactus-page">
      <div className="contactus-card">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <div className="form-group">
            <input type="text" required className="form-input" placeholder=" " />
            <label className="form-label">Your Name</label>
          </div>
          <div className="form-group">
            <input type="email" required className="form-input" placeholder=" " />
            <label className="form-label">Your Email</label>
          </div>
          <div className="form-group">
            <textarea required rows={5} className="form-input" placeholder=" "></textarea>
            <label className="form-label">Your Message</label>
          </div>
          <button type="submit" className="form-btn">Send Message</button>
        </form>
        <div className="contact-details">
          <p><b>Email:</b> info@toursandtravels.com</p>
          <p><b>Phone:</b> +1 234 567 890</p>
          <p><b>Address:</b> 123, WanderLite Avenue, City, Country</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs; 