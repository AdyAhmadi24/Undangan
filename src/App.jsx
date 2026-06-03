import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  // State to track which popup is currently open (null, 'cats', 'schedule', or 'books')
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => {
    setActivePopup(null);
  };

  // Close popup with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closePopup();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close popup when clicking the dark overlay outside the popup box
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      closePopup();
    }
  };

  return (
    <div className="phone-wrap">
      <div className="phone-frame">
        
        {/* Status Bar */}
        <div className="status-bar">
          <span>9:41</span>
          <span>●●● WiFi 100%</span>
        </div>

        {/* Room Scene */}
        <div className="room-container" id="room">
          <img
            className="room-bg"
            src="/images/room.png" /* Make sure to place this image in your public/images folder */
            alt="Ruangan"
            onError={(e) => (e.target.style.display = 'none')}
          />

          {/* Top-left Navigation Icons */}
          <div className="nav-icons">
            <div className="nav-icon plane" title="Mode pesawat">✈</div>
            <div className="nav-icon bulb" title="Lampu">💡</div>
          </div>

          {/* Hotspots */}
          <div 
            className="hotspot" 
            style={{ left: '26%', top: '38%', width: '100px', height: '160px', borderRadius: '12px' }}
            onClick={() => setActivePopup('cats')}
          >
            <div className="hotspot-label">Kucing Pak Anies</div>
          </div>

          <div 
            className="hotspot" 
            style={{ right: '4%', top: '3%', width: '70px', height: '80px', borderRadius: '10px' }}
            onClick={() => setActivePopup('cats')}
          >
            <div className="hotspot-label">Aslan</div>
          </div>

          <div 
            className="hotspot" 
            style={{ right: '6%', top: '32%', width: '70px', height: '90px', borderRadius: '10px' }}
            onClick={() => setActivePopup('cats')}
          >
            <div className="hotspot-label">Lego</div>
          </div>

          <div 
            className="hotspot" 
            style={{ left: '32%', top: '62%', width: '80px', height: '70px', borderRadius: '10px' }}
            onClick={() => setActivePopup('cats')}
          >
            <div className="hotspot-label">Snowball</div>
          </div>

          <div 
            className="hotspot" 
            style={{ left: '28%', top: '4%', width: '100px', height: '50px', borderRadius: '6px' }}
            onClick={() => setActivePopup('schedule')}
          >
            <div className="hotspot-label">Schedule</div>
          </div>

          <div 
            className="hotspot" 
            style={{ left: '0%', top: '18%', width: '80px', height: '260px', borderRadius: '6px' }}
            onClick={() => setActivePopup('books')}
          >
            <div className="hotspot-label">Koleksi Buku</div>
          </div>

          {/* Overlay & Popups */}
          <div 
            className={`overlay ${activePopup ? 'active' : ''}`} 
            onClick={handleOverlayClick}
          >
            
            {/* POPUP: Kucing */}
            <div className="popup" style={{ display: activePopup === 'cats' ? 'block' : 'none' }}>
              <div className="popup-title-bar">
                <span className="popup-title-text">kucing pak Anies</span>
                <button className="popup-close" onClick={closePopup} aria-label="Tutup">×</button>
              </div>
              <div className="popup-ig">
                📷 <strong>@pawswedan</strong>
              </div>
              <div className="cats-grid">
                <div className="cat-card">
                  <div className="cat-img-wrap" style={{ background: '#1a1a1a' }}>🐈‍⬛</div>
                  <div className="cat-name">OBDY</div>
                </div>
                <div className="cat-card">
                  <div className="cat-img-wrap" style={{ background: '#d8c8a0' }}>🐱</div>
                  <div className="cat-name">ASLAN</div>
                </div>
                <div className="cat-card">
                  <div className="cat-img-wrap" style={{ background: '#f0eee8' }}>🤍</div>
                  <div className="cat-name">SNOWBALL</div>
                </div>
                <div className="cat-card">
                  <div className="cat-img-wrap" style={{ background: '#e8e0d0' }}>🐈</div>
                  <div className="cat-name">LEGO</div>
                </div>
              </div>
            </div>

            {/* POPUP: Schedule */}
            <div className="popup" style={{ display: activePopup === 'schedule' ? 'block' : 'none' }}>
              <div className="popup-title-bar">
                <span className="popup-title-text">Anies's Schedule</span>
                <button className="popup-close" onClick={closePopup} aria-label="Tutup">×</button>
              </div>
              <div className="popup-body">
                <div className="popup-section-title">●● Agenda Mendatang</div>
                <div className="schedule-grid">
                  <div className="schedule-cell">Kampanye Jakarta</div>
                  <div className="schedule-cell">Dialog Warga</div>
                  <div className="schedule-cell">Press Conference</div>
                  <div className="schedule-cell">Meet &amp; Greet</div>
                  <div className="schedule-cell empty">TBA</div>
                  <div className="schedule-cell empty">TBA</div>
                </div>
                <div className="pemilu-tag">Pemilu 2024 — PEMILU</div>
              </div>
            </div>

            {/* POPUP: Buku */}
            <div className="popup" style={{ display: activePopup === 'books' ? 'block' : 'none' }}>
              <div className="popup-title-bar">
                <span className="popup-title-text">Koleksi Buku</span>
                <button className="popup-close" onClick={closePopup} aria-label="Tutup">×</button>
              </div>
              <div className="popup-body">
                <div className="book-list">
                  <div className="book-item">
                    <div className="book-spine" style={{ background: '#e05030' }}></div>
                    <div>
                      <div className="book-title">Indonesia Maju</div>
                      <div className="book-sub">Visi &amp; Misi Bangsa</div>
                    </div>
                  </div>
                  <div className="book-item">
                    <div className="book-spine" style={{ background: '#4090d0' }}></div>
                    <div>
                      <div className="book-title">Merawat Indonesia</div>
                      <div className="book-sub">Anies Baswedan</div>
                    </div>
                  </div>
                  <div className="book-item">
                    <div className="book-spine" style={{ background: '#50c070' }}></div>
                    <div>
                      <div className="book-title">Demokrasi &amp; Keadilan</div>
                      <div className="book-sub">Catatan Perjalanan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bottom-bar">
          <span className="bottom-hashtag">#HAVESOMEDAY</span>
          <span className="bottom-hint">klik elemen untuk info!</span>
        </div>

      </div>
    </div>
  );
}