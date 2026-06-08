// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

const assetUrls = {
  catAnimated: new URL('./assets/cat-animated.webp', import.meta.url).href,
  pets: new URL('./assets/pets.webp', import.meta.url).href,
};

const BODY_POINTS = {
  // Clockwise from left ear tip:
  prefix: '24,2  18,10  14,18  12,22  16,28  22,30  14,38  10,46',
  suffix: '8,52  8,62  4,70  4,80  6,88  14,92  18,100  28,100  32,94  36,100  40,100  44,100  48,94  52,100  56,100  60,92  68,88  72,80  72,70  78,62  82,52  82,40  76,28  72,22  72,18  76,10  70,2  64,10  62,18  48,14  30,14  28,18  26,10',
};

// Tail tip A — rest (swings slightly left)
const tailA = '2,50  -2,44  2,38  6,42';
// Tail tip B — swing right / curl inward
const tailB = '4,46  6,38  12,34  8,40';
// Tail tip C — swing left / extend out
const tailC = '-2,54  -6,46  -2,38  4,42';

function buildPoints(tail) {
  return `${BODY_POINTS.prefix}  ${tail}  ${BODY_POINTS.suffix}`;
}

const pA = buildPoints(tailA);
const pB = buildPoints(tailB);
const pC = buildPoints(tailC);

function CatPolygon({ animateTail = false }) {
  const shapeClass = animateTail ? 'animated-cat-shape' : 'cat-shape';

  return (
    <svg
      viewBox="-10 0 110 100"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
    >
      {animateTail ? (
        <polygon className={shapeClass} strokeLinejoin="round" strokeLinecap="round">
          <animate
            attributeName="points"
            dur="2.4s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0; 0.33; 0.66; 1"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            values={`${pA}; ${pB}; ${pC}; ${pA}`}
          />
        </polygon>
      ) : (
        <polygon
          className={shapeClass}
          points={pA}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

function App() {
  const [activePopup, setActivePopup] = useState(null);

  const catPopups = {
    cat_tail: {
      title: 'Si Buntut Goyang',
      message: 'Miauw! Ekor saya bergoyang karena senang Anda datang!',
    },
    cat2: {
      title: 'Si Jahe',
      message: 'Miauw! Selamat datang di undangan kami. Makanannya enak-enak, lho!',
    },
    cat3: {
      title: 'Si Belang Tiga',
      message: 'Halo! Aku Si Belang Tiga. Ayo Cek namamu di buku tamu!',
    },
    cat4: {
      title: 'Si Kelabu',
      message: 'Selamat menikmati pesta kami. Jangan lupa foto-foto, miauw!',
    },
    cat5: {
      title: 'Si Putih',
      message: 'Miauw! Aku Si Putih yang menggemaskan. Terima kasih sudah datang!',
    },
    cat_animated: {
      title: 'Si Kucing Animasi',
      message: 'Kucing animasi ini muncul di atas kursi oranye. Klik untuk melihat koleksi hewan peliharaan!',
    },
  };

  const closePopup = () => setActivePopup(null);

  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (e.target.classList.contains('overlay')) closePopup();
    };
    if (activePopup) window.addEventListener('click', handleOverlayClick);
    return () => window.removeEventListener('click', handleOverlayClick);
  }, [activePopup]);

  return (
    <div id="root">
      <div className="app-container">

        {/* Kucing 1 — animated tail */}
        <div
          className="cat-hotspot cat_tail"
          onClick={() => setActivePopup('cat_tail')}
          title="Klik Kucing Buntut"
        >
          <CatPolygon animateTail={true} />
        </div>

        {/* Kucing 2 */}
        <div
          className="cat-hotspot cat2"
          onClick={() => setActivePopup('cat2')}
          title="Klik Si Jahe"
        >
          <CatPolygon />
        </div>

        {/* Animated cat di atas kursi orange */}
        <div
          className="cat-animated"
          onClick={() => setActivePopup('cat_animated')}
          title="Klik Kucing Animasi"
        >
          <img src={assetUrls.catAnimated} alt="Cat Animated" />
        </div>

        {/* Kucing 3 */}
        <div
          className="cat-hotspot cat3"
          onClick={() => setActivePopup('cat3')}
          title="Klik Si Belang Tiga"
        >
          <CatPolygon />
        </div>

        {/* Kucing 4 */}
        <div
          className="cat-hotspot cat4"
          onClick={() => setActivePopup('cat4')}
          title="Klik Si Kelabu"
        >
          <CatPolygon />
        </div>

        {/* Kucing 5 */}
        <div
          className="cat-hotspot cat5"
          onClick={() => setActivePopup('cat5')}
          title="Klik Si Putih"
        >
          <CatPolygon />
        </div>
      </div>

      {/* Popup / Overlay */}
      <div className={`overlay ${activePopup ? 'active' : ''}`}>
        {activePopup === 'cat_animated' ? (
          /* Show only the image for the animated cat — no bordered modal */
          <img src={assetUrls.pets} alt="Pets" className="bare-popup-image" />
        ) : (
          <div className="popup-modal">
            <button className="popup-close" onClick={closePopup}>&times;</button>

            {activePopup && (
              <>
                <h2 className="cat-popup-title">
                  Miauw dari {catPopups[activePopup].title}
                </h2>
                <p className="cat-popup-message">
                  {catPopups[activePopup].message}
                </p>

                {activePopup === 'cat3' && (
                  <div>
                    <button
                      onClick={() => alert('Fitur Cek Nama sedang dalam pengembangan!')}
                      className="guest-button"
                    >
                      Cek Nama di Buku Tamu
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
