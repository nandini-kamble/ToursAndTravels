function AboutUs() {
  return (
    <div className="aboutus-page" style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="aboutus-content-card" style={{width: '100%', maxWidth: 900}}>
        <div className="aboutus-team-section">
          <h2 style={{textAlign: 'center', margin: '40px 0 24px 0', color: '#ff7a00'}}>Meet Our Team</h2>
          <div className="aboutus-team-list" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 32}}>
            <div className="aboutus-team-card">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" className="aboutus-team-img" />
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
              <p><b>Email:</b> john@wanderlite.com</p>
              <p><b>Phone:</b> +1 234 567 1011</p>
            </div>
            <div className="aboutus-team-card">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Smith" className="aboutus-team-img" />
              <h3>Jane Smith</h3>
              <p>Head of Operations</p>
              <p><b>Email:</b> jane@wanderlite.com</p>
              <p><b>Phone:</b> +1 234 567 2022</p>
            </div>
            <div className="aboutus-team-card">
              <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Mike Lee" className="aboutus-team-img" />
              <h3>Mike Lee</h3>
              <p>Travel Consultant</p>
              <p><b>Email:</b> mike@wanderlite.com</p>
              <p><b>Phone:</b> +1 234 567 3033</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs; 