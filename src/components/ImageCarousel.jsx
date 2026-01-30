import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";

import axios from "axios";

const THEMES = [
  "peaceful forest",
  "calm lake reflection",
  "zen stones water",
  "sunset sea meditation",
  "soft light nature",
  "misty mountains",
  "quiet beach sunrise",
  "green meadow sunlight",
  "tranquil river",
  "meditation nature"
];

const SPEED = 0.3;

// Axios instance
const api = axios.create({
  baseURL: "https://white-fire-26d3.desienagaetano646.workers.dev/",
  timeout: 6000
});

const ImageCarousel = forwardRef(function ImageCarousel({ active }, ref) {
  const [images, setImages] = useState([]);

  const viewportRef = useRef(null); // EVENTI (FERMO)
  const trackRef = useRef(null);    // ANIMAZIONE (SI MUOVE)

  const rafRef = useRef(null);
  const position = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const isAnimating = useRef(false);

  /* ---------- API PUBBLICA ---------- */
  useImperativeHandle(ref, () => ({
    reset() {
      position.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = "translateX(0px)";
      }
    }
  }));

  /* ---------- FETCH (con AXIOS) ---------- */
  useEffect(() => {
    let cancelled = false;

    async function fetchImages() {
      const out = [];

      for (const theme of THEMES) {
        try {
          const res = await api.get("/", {
            params: { q: theme }
          });

          const img = res.data?.results?.[0]?.urls?.regular;
          if (img) out.push(img);
        } catch {
          null;
        }
      }

      if (!cancelled) setImages(out);
    }

    fetchImages();
    return () => (cancelled = true);
  }, []);

  /* ---------- ANIMATE ---------- */
  useEffect(() => {
    if (!active || !trackRef.current) {
      isAnimating.current = false;
      cancelAnimationFrame(rafRef.current);
      return;
    }

    if (isAnimating.current) return;
    isAnimating.current = true;

    function animate() {
      if (!isAnimating.current || isDragging.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      position.current -= SPEED;
      trackRef.current.style.transform =
        `translateX(${position.current}px)`;

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isAnimating.current = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  /* ---------- DRAG ---------- */
  function onPointerDown(e) {
    isDragging.current = true;
    lastX.current = e.clientX;
    viewportRef.current.style.cursor = "grabbing";
    viewportRef.current.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!isDragging.current) return;

    let dx = e.clientX - lastX.current;
    lastX.current = e.clientX;

    // resistenza se oltre 0
    if (position.current > 0 && dx > 0) {
      dx *= 0.1;
    }

    position.current += dx;

    trackRef.current.style.transform =
      `translateX(${position.current}px)`;
  }

  function onPointerUp(e) {
    isDragging.current = false;

    if (viewportRef.current.hasPointerCapture(e.pointerId)) {
      viewportRef.current.releasePointerCapture(e.pointerId);
    }

    viewportRef.current.style.cursor = "grab";

    if (position.current > 0) {
      animateSnapToZero();
    }
  }

  function animateSnapToZero() {
    cancelAnimationFrame(rafRef.current);

    function step() {
      const distance = -position.current;

      if (Math.abs(distance) < 0.5) {
        position.current = 0;
        trackRef.current.style.transform = "translateX(0px)";
        return;
      }

      position.current += distance * 0.15;
      trackRef.current.style.transform =
        `translateX(${position.current}px)`;

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
  }

  if (!images.length) return null;

  /* ---------- RENDER ---------- */
  return (
    <div
      ref={viewportRef}
      className="overflow-hidden w-full mt-10 touch-none cursor-grab"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{ width: "200%" }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            draggable={false}
            alt=""
            className="
              w-[90vw] h-[80vh] object-cover rounded-3xl shadow-2xl flex-shrink-0 mx-6 mb-10
            "
          />
        ))}
      </div>
    </div>
  );
});

export default ImageCarousel;
