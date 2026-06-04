/**
 * CatPolygon.jsx
 * 
 * A reusable SVG polygon that accurately traces the sitting cat silhouette.
 * The tail (left side) animates naturally back and forth.
 * 
 * USAGE in App.jsx — replace each cat-hotspot's inner SVG:
 * 
 *   import CatPolygon from './CatPolygon';
 *   <div className="cat-hotspot cat2" onClick={...}>
 *     <CatPolygon animateTail={true} />   // or false for static cats
 *   </div>
 */

export default function CatPolygon({ animateTail = false }) {
  /**
   * POINT GUIDE — viewBox is 0 0 100 100
   * The cat is a sitting cat facing forward/slightly right.
   * 
   * Sections (top → bottom):
   *  - Left ear:  tip at (24,2), base (18,14)–(28,14)
   *  - Right ear: tip at (58,2), base (48,14)–(62,14)
   *  - Head:      forehead arch (28,8)–(58,8), cheeks (14,22)–(68,22)
   *  - Neck:      (22,26)–(62,26)  → narrows slightly
   *  - Body:      wide oval (10,28)–(78,60)  sitting cat body bulk
   *  - Back legs / haunches: wide at (8,62)–(80,62)
   *  - Front paws: two rounded bumps at bottom center (28,95)–(56,95)
   *  - Tail:      curves left from body at ~(10,48), tip at (-8,38)
   *               The tip points are the ones that animate.
   */

  // ─── BODY (static — does not move) ──────────────────────────────────────
  // Read as a clockwise outline of the cat silhouette.
  // Each coord is percentage of the 100×100 viewBox.

  // Tail tip positions for animation:
  //  Rest (A): tip at (2, 30)  — tail hangs slightly to the left
  //  Right (B): tip at (10, 22) — tail swings inward / upward
  //  Left (C): tip at (-6, 32) — tail swings further out
  // The tail connects from the body at approx. (14, 58)

  // Full polygon points strings:
  // Note: "tail tip" points are indices 0–3 (the leftward bulge).
  // We define three keyframe strings and animate between them.

  /**
   * Point layout (cat sitting, front-facing):
   * 
   *        (24,2)          (58,2)         ← ear tips
   *       /      \        /      \
   *    (18,12) (30,12)--(48,12) (64,12)   ← ear bases
   *       \                         /
   *   (12,20)──────────────────(72,20)    ← cheek width
   *        \                   /
   *     (16,28)──────────(68,28)          ← neck/shoulder
   *    /                         \
   *  (8,40)                    (80,40)    ← body sides (mid)
   *  (8,58)                    (80,58)    ← haunches top
   *  (4,68)                    (84,68)    ← haunches wide
   *    |                           |
   *  (4,76)                    (84,76)    ← upper leg
   * 
   * TAIL branches off the left body (from ~(8,52)):
   * Goes to (2,44) → tip → back to (8,46)
   * 
   * Lower body / legs:
   *  (8,76)→(8,86)→(18,88)→(22,96)→(30,96)→(34,88)  ← left leg/paw
   *  gap in middle (belly)
   *  (50,88)→(54,96)→(62,96)→(66,88)→(72,86)→(72,76) ← right leg/paw
   */

  // ── Keyframe A: tail resting, slightly left ──
  const pointsA = `
    24,2  18,10  14,18
    12,22  16,28  22,30
    14,38  10,46
    6,52
    2,50  -2,44  2,38
    6,42
    8,52  8,62  4,70
    4,80  6,88  14,92  18,100  28,100  32,94  36,100  40,100
    44,100  48,94  52,100  56,100  60,92  68,88  72,80
    72,70  78,62  82,52  82,40
    76,30  72,26  68,22
    72,18  76,10  70,2
    64,10  62,18
    48,14  30,14
    28,18  26,10
  `.trim().replace(/\s+/g, ' ');

  // ── Keyframe B: tail swings right (inward, curving up) ──
  const pointsB = `
    24,2  18,10  14,18
    12,22  16,28  22,30
    14,38  10,46
    6,52
    4,46  6,38  12,34
    8,40
    8,52  8,62  4,70
    4,80  6,88  14,92  18,100  28,100  32,94  36,100  40,100
    44,100  48,94  52,100  56,100  60,92  68,88  72,80
    72,70  78,62  82,52  82,40
    76,30  72,26  68,22
    72,18  76,10  70,2
    64,10  62,18
    48,14  30,14
    28,18  26,10
  `.trim().replace(/\s+/g, ' ');

  // ── Keyframe C: tail swings left (outward) ──
  const pointsC = `
    24,2  18,10  14,18
    12,22  16,28  22,30
    14,38  10,46
    6,52
    -2,54  -6,46  -2,38
    4,42
    8,52  8,62  4,70
    4,80  6,88  14,92  18,100  28,100  32,94  36,100  40,100
    44,100  48,94  52,100  56,100  60,92  68,88  72,80
    72,70  78,62  82,52  82,40
    76,30  72,26  68,22
    72,18  76,10  70,2
    64,10  62,18
    48,14  30,14
    28,18  26,10
  `.trim().replace(/\s+/g, ' ');

  return (
    <svg
      viewBox="-10 0 110 100"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
    >
      {animateTail ? (
        // Animated tail version
        <polygon
          className="animated-cat-shape"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <animate
            attributeName="points"
            dur="2.4s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0; 0.33; 0.66; 1"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
            values={`${pointsA}; ${pointsB}; ${pointsC}; ${pointsA}`}
          />
        </polygon>
      ) : (
        // Static version
        <polygon
          className="cat-shape"
          points={pointsA}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
