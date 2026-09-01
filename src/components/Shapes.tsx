/**
 * Purely decorative background layer: animated blobs, rings, triangles,
 * squares, dots, squiggles and stars. Non-interactive and hidden from
 * assistive tech. All motion is disabled under prefers-reduced-motion.
 */
export default function Shapes() {
  return (
    <div className="bp-shapes" aria-hidden="true">
      <span className="bp-blob bp-blob--1" />
      <span className="bp-blob bp-blob--2" />
      <span className="bp-blob bp-blob--3" />
      <span className="bp-blob bp-blob--4" />

      <span className="bp-ring bp-ring--1" />
      <span className="bp-ring bp-ring--2" />
      <span className="bp-ring bp-ring--3" />

      <span className="bp-tri bp-tri--1" />
      <span className="bp-tri bp-tri--2" />

      <span className="bp-square bp-square--1" />
      <span className="bp-square bp-square--2" />

      <span className="bp-dot bp-dot--1" />
      <span className="bp-dot bp-dot--2" />
      <span className="bp-dot bp-dot--3" />
      <span className="bp-dot bp-dot--4" />
      <span className="bp-dot bp-dot--5" />

      <svg className="bp-squiggle bp-squiggle--1" viewBox="0 0 120 24" fill="none">
        <path
          d="M3 12c7.5-11 15 11 22.5 0S40.5 23 48 12s15 11 22.5 0S93 23 100.5 12 117 3 117 3"
          stroke="url(#bpSq1)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="bpSq1" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#ff2d95" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="bp-squiggle bp-squiggle--2" viewBox="0 0 120 24" fill="none">
        <path
          d="M3 12c7.5-11 15 11 22.5 0S40.5 23 48 12s15 11 22.5 0S93 23 100.5 12 117 3 117 3"
          stroke="url(#bpSq2)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="bpSq2" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00c2ff" />
            <stop offset="1" stopColor="#a3e635" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="bp-star bp-star--1" viewBox="0 0 24 24">
        <path d="M12 0c1.1 6.3 5.7 10.9 12 12-6.3 1.1-10.9 5.7-12 12-1.1-6.3-5.7-10.9-12-12C6.3 10.9 10.9 6.3 12 0z" fill="#ffc93c" />
      </svg>
      <svg className="bp-star bp-star--2" viewBox="0 0 24 24">
        <path d="M12 0c1.1 6.3 5.7 10.9 12 12-6.3 1.1-10.9 5.7-12 12-1.1-6.3-5.7-10.9-12-12C6.3 10.9 10.9 6.3 12 0z" fill="#ff2d95" />
      </svg>
      <svg className="bp-star bp-star--3" viewBox="0 0 24 24">
        <path d="M12 0c1.1 6.3 5.7 10.9 12 12-6.3 1.1-10.9 5.7-12 12-1.1-6.3-5.7-10.9-12-12C6.3 10.9 10.9 6.3 12 0z" fill="#00c2ff" />
      </svg>
    </div>
  )
}
