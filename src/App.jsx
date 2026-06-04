// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

/**
 * ─── CAT POLYGON COMPONENT ───────────────────────────────────────────────────
 *
 * A sitting cat silhouette traced from your reference image.
 * ViewBox is "-10 0 110 100" to give the tail room on the left.
 *
 * Point layout (rough ASCII):
 *
 *      (24,2)        (58,2)       ← ear tips
 *     /      \      /      \
 *  (18,10) (30,14)-(48,14) (64,10)← ear bases
 *      \                   /
 *   (12,22)────────────(72,22)    ← cheek width
 *       \               /
 *    (16,28)─────────(76,28)      ← shoulder
 *   /                      \
 * (8,40)                 (82,40)  ← body mid
 * (8,62)                 (82,62)  ← haunches
 *   |   \               /   |
 *  legs  ──────────────  legs
 *  paws                    paws
 *
 * TAIL branches from left body (~(8,52)):
 * Animates between three tip positions.
 */

// ── Tail tip keyframes — only these 4 points change ──
// Points order: ... (10,46) [tail-root] → [tip group: 3 pts] → (8,52) ...
//                                         ↑ these 3 animate

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

      {/* Popup Modal */}
      <div className={`overlay ${activePopup ? 'active' : ''}`}>
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
                <div style={{ marginTop: '25px' }}>
                  <button
                    onClick={() => alert('Fitur Cek Nama sedang dalam pengembangan!')}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#e07a5f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                  >
                    Cek Nama di Buku Tamu
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
