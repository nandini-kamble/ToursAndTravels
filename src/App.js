import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Login from './Login';
import Signup from './Signup';

const carouselImages = [
  'https://wallpaperaccess.com/full/2592133.jpg', 
  'https://img.freepik.com/premium-photo/travel-traveling-symbolic-picture-vacation-background-86_1032298-2270.jpg', 
  'https://wallpaperaccess.com/full/1431673.jpg', 
];

const destinations = [
  {
    name: "Europe Highlights",
    image: "https://cdn.tourradar.com/s3/tour/1500x800/46921_5df9984de8bf6.jpg", 
    description: "Explore Switzerland, Paris, Italy, and London in one unforgettable tour.",
  },
  {
    name: "Thailand Getaway",
    image: "https://th.bing.com/th/id/R.0841bdb280b065ae115f0dea89080a9c?rik=gesG5sn1KeGqoA&riu=http%3a%2f%2fwww.destinasiatours.com%2fwp-content%2fuploads%2f2015%2f12%2fgatewayto-thailand-1.jpg&ehk=gXtWwAWlm3RAlbau3fihI8LHsLzdKqITGCNuitbJ7kg%3d&risl=&pid=ImgRaw&r=0", 
    description: "Bangkok, Pattaya, Phuket and more. Beaches, temples, and vibrant nightlife.",
  },
  {
    name: "Singapore & Malaysia",
    image: "https://www.gokite.travel/wp-content/uploads/2024/02/1.-Singapore-and-Malaysia-Tour-1-870x480.webp", 
    description: "A perfect blend of modern city life and cultural heritage.",
  },
  {
    name: "Dubai Adventure",
    image: "https://cdn.tourcms.com/a/5903/234/1/large.jpg", 
    description: "Desert safaris, Burj Khalifa, shopping, and luxury experiences.",
  },
  {
    name: "Kashmir Paradise",
    image: "https://th.bing.com/th/id/R.9818b7a6064c987b5b9a549c25c2fc35?rik=MR68i0qDswL4Ew&riu=http%3a%2f%2fblog.via.com%2fwp-content%2fuploads%2f2015%2f12%2fKashmir.jpg&ehk=X3qiKj5KOL9hJ%2fIpJVGJ8qNMxQ4sS6yXKJJa9j7H3Vk%3d&risl=&pid=ImgRaw&r=0", 
    description: "Srinagar, Gulmarg, Pahalgam – the crown of India.",
  },
  {
    name: "Himachal Wonders",
    image: "https://himachal-tourism.org.in/assets/images/g7.jpg", 
    description: "Shimla, Manali, Rohtang Pass, and more in the Himalayas.",
  },
  {
    name: "Kerala Backwaters",
    image: "https://www.wendywutours.com.au/resource/upload/643/kerala-backwater-cruisetour.jpg", 
    description: "Houseboats, lush greenery, and tranquil waters in God's Own Country.",
  },
  {
    name: "Rajasthan Royal Tour",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/DestMainImgLscape/mmt/activities/m_Jaipur_1_l_787_1181.jpg", 
    description: "Jaipur, Udaipur, Jodhpur – palaces, forts, and desert adventures.",
  },
  {
    name: "Andaman Islands",
    image: "https://www.andamantourism.org/wp-content/uploads/2019/02/andaman1.jpg", 
    description: "Pristine beaches, water sports, and tropical beauty.",
  },
  {
    name: "Nepal & Bhutan",
    image: "https://nepaltraveltalk.com/wp-content/uploads/2019/11/nepal-bhutan-tour-1024x683.jpg", 
    description: "Himalayan kingdoms, monasteries, and breathtaking landscapes.",
  },
  {
    name: "Sri Lanka Discovery",
    image: "https://s3-ap-southeast-1.amazonaws.com/akbartravelsholidays/admin/thumbnail16906414623176rsz_srilanka-thumb.jpg", 
    description: "Ancient ruins, tea gardens, and golden beaches.",
  },
];

const uniqueDestinations = destinations.filter(
  (dest, index, self) =>
    index === self.findIndex((d) => d.image === dest.image)
);

function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="hero-section" id="home">
      <div className="carousel-container">
        <img src={carouselImages[current]} alt="Travel" className="carousel-image" />
        <div className="carousel-overlay">
          <h1>Explore the World with Us!</h1>
          <p>Your adventure starts here. Discover amazing tours and travel packages.</p>
        </div>
      </div>
    </header>
  );
}

function Destinations() {
  const [start, setStart] = useState(0);
  const visibleCount = 3;
  const total = uniqueDestinations.length;
  const prev = () => setStart((start - 1 + total) % total);
  const next = () => setStart((start + 1) % total);
  const getVisible = () => {
    const arr = [];
    const used = new Set();
    let idx = start;
    while (arr.length < visibleCount && used.size < total) {
      const dest = uniqueDestinations[idx % total];
      if (!used.has(dest.image)) {
        arr.push(dest);
        used.add(dest.image);
      }
      idx++;
    }
    return arr;
  };
  const navigate = useNavigate();
  return (
    <section className="destinations-section">
      <h2>Popular Places to Visit</h2>
      <div className="destinations-carousel">
        <button className="carousel-arrow transparent-arrow left" onClick={prev} aria-label="Previous Place">&#8592;</button>
        <div className="destinations-list carousel-list">
          {getVisible().map((place, idx) => (
            <div className="destination-card carousel-card" key={place.name + idx}>
              <img src={place.image} alt={place.name} className="destination-img" />
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <button className="form-btn" onClick={() => navigate(`/place/${encodeURIComponent(place.name)}`)}>Explore</button>
            </div>
          ))}
        </div>
        <button className="carousel-arrow transparent-arrow right" onClick={next} aria-label="Next Place">&#8594;</button>
      </div>
      <div className="carousel-indicators">
        {uniqueDestinations.map((_, idx) => (
          <span key={idx} className={idx === start ? 'active' : ''} />
        ))}
      </div>
    </section>
  );
}

function PlaceDetails() {
  const { name } = useParams();
  const place = uniqueDestinations.find(p => p.name === name);
  const navigate = useNavigate();
  if (!place) return <div style={{padding: 40, textAlign: 'center'}}>Place not found.</div>;

  const placeInfos = {
    'Europe Highlights': `Experience the magic of Europe with our exclusive tour covering Switzerland's Alps, the romance of Paris, the art of Italy, and the history of London. Enjoy guided city tours, breathtaking landscapes, and world-class cuisine. Perfect for first-time visitors and seasoned travelers alike!`,
    'Thailand Getaway': `Thailand offers a vibrant mix of bustling cities, tranquil beaches, and rich cultural heritage. Explore the temples of Bangkok, the nightlife of Pattaya, and the tropical paradise of Phuket. Savor authentic Thai food and enjoy thrilling water sports and island hopping adventures!`,
    'Singapore & Malaysia': `Discover the best of Southeast Asia with a journey through Singapore's futuristic skyline and Malaysia's cultural gems. Visit Gardens by the Bay, Sentosa Island, Kuala Lumpur's Petronas Towers, and the historic streets of Malacca. A perfect blend of modernity and tradition!`,
    'Dubai Adventure': `Dubai dazzles with its ultramodern architecture, luxury shopping, and desert adventures. Marvel at the Burj Khalifa, enjoy a desert safari, and shop in world-famous malls. Experience the vibrant nightlife and indulge in gourmet dining in this city of superlatives!`,
    'Kashmir Paradise': `Known as the 'Crown of India', Kashmir enchants with its snow-capped mountains, lush valleys, and serene lakes. Glide on a shikara in Dal Lake, ski in Gulmarg, and trek through Pahalgam. A haven for nature lovers and adventure seekers!`,
    'Himachal Wonders': `Himachal Pradesh is a Himalayan wonderland with charming hill stations like Shimla and Manali, the adventure of Rohtang Pass, and the spiritual calm of Dharamshala. Enjoy river rafting, paragliding, and scenic mountain views!`,
    'Kerala Backwaters': `Kerala, 'God's Own Country', is famous for its tranquil backwaters, lush greenery, and houseboat cruises. Explore the spice plantations, relax on palm-fringed beaches, and experience the unique culture and cuisine of South India!`,
    'Rajasthan Royal Tour': `Step into the royal past of India with Rajasthan's majestic palaces, forts, and vibrant culture. Visit Jaipur's Pink City, Udaipur's lakes, and Jodhpur's blue houses. Enjoy folk music, camel rides, and traditional Rajasthani cuisine!`,
    'Andaman Islands': `The Andaman Islands are a tropical paradise with pristine beaches, crystal-clear waters, and vibrant coral reefs. Perfect for snorkeling, scuba diving, and relaxing on sun-kissed sands. Discover the history of Cellular Jail and the beauty of Havelock Island!`,
    'Nepal & Bhutan': `Explore the Himalayan kingdoms of Nepal and Bhutan. Visit Kathmandu's ancient temples, trek to Everest Base Camp, and experience Bhutan's monasteries and festivals. A spiritual and scenic journey through the world's highest mountains!`,
    'Sri Lanka Discovery': `Sri Lanka is a land of ancient ruins, lush tea gardens, and golden beaches. Climb Sigiriya Rock, visit the sacred city of Kandy, and relax in the coastal town of Galle. Enjoy wildlife safaris and the warm hospitality of the locals!`,
  };
  const moreInfo = placeInfos[place.name] || place.description;

  return (
    <div style={{minHeight: '80vh', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 40, flexWrap: 'wrap'}}>
      <img src={place.image} alt={place.name} style={{maxWidth: 600, minWidth: 320, width: '40vw', height: 520, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 12px #0002'}} />
      <div style={{maxWidth: 540, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 style={{color: '#ff7a00', marginBottom: 12, textAlign: 'center'}}>{place.name}</h2>
        <p style={{fontSize: '1.15rem', color: '#444', marginBottom: 32, textAlign: 'center'}}>{moreInfo}</p>
        <button className="form-btn" style={{maxWidth: 220, alignSelf: 'center'}} onClick={() => navigate('/login')}>Book a Trip</button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 12}}>
        <span><b>Contact Us:</b> info@toursandtravels.com | Phone: +1 234 567 890</span>
        <span style={{fontWeight: 400}}>| © {new Date().getFullYear()} WanderLite Tours. All rights reserved.</span>
      </div>
    </footer>
  );
}

function App() {
  function FooterConditional() {
    const location = useLocation();
    const hideFooter = ["/contact", "/login", "/signup"].includes(location.pathname);
    return hideFooter ? null : <Footer />;
  }
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" style={{textDecoration: 'none'}}>
            <div className="navbar-logo" style={{display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '2rem', color: '#ff7a00', letterSpacing: 2, cursor: 'pointer'}}>
              <span style={{fontSize: '2.2rem', marginRight: 10}}>🌍</span>
              <span style={{fontFamily: 'Segoe Script, Pacifico, cursive', fontWeight: 700, fontSize: '2rem', color: '#232b38'}}>WanderLite</span>
              <span style={{fontWeight: 400, fontSize: '1.2rem', color: '#40916c', marginLeft: 6}}>Tours</span>
            </div>
          </Link>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<><Home /><MainContent /></>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/place/:name" element={<PlaceDetails />} />
        </Routes>
        <FooterConditional />
      </div>
    </Router>
  );
}

function MainContent() {
  return (
    <>
      <section className="tours-section">
        <h2>Featured Tours</h2>
        <div className="tours-list">
          <div className="tour-card">
            <h3>Paris Getaway</h3>
            <p>Experience the romance and beauty of Paris with our exclusive 5-day tour.</p>
          </div>
          <div className="tour-card">
            <h3>Safari Adventure</h3>
            <p>Join us for a thrilling safari in Kenya and witness the majestic wildlife.</p>
          </div>
          <div className="tour-card">
            <h3>Beach Paradise</h3>
            <p>Relax on the pristine beaches of Maldives with our all-inclusive package.</p>
          </div>
        </div>
      </section>
      <Destinations />
    </>
  );
}

export default App;
