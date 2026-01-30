import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ControlCards from "./components/ControlCards";
import NavigationCards from "./components/NavigationCards";
import ImageCarousel from "./components/ImageCarousel";

// pages secondarie
import Program from "./pages/Program";
import Account from "./pages/Account";
import Subscription from "./pages/Subscription";

export default function App() {
  /* =========================
     TIMER
  ========================= */
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  /* =========================
     AUDIO
  ========================= */
  const audioRef = useRef(null);

  /* =========================
     CAROUSEL
  ========================= */
  const [carouselActive, setCarouselActive] = useState(false);
  const carouselRef = useRef(null);

  const handleStartCarousel = () => {
    if (carouselActive) {
      carouselRef.current?.reset();
    }
    setCarouselActive(true);
  };

  /* =========================
     TIMER EFFECT
  ========================= */
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          timerRef.current?.handleStop();

          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-300">



      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>

              <Header
                timeLeft={timeLeft}
                duration={duration}
                isRunning={isRunning}
                audioRef={audioRef}
              />

              <ControlCards
                duration={duration}
                setDuration={setDuration}
                setTimeLeft={setTimeLeft}
                setIsRunning={setIsRunning}
                isRunning={isRunning}
                timerRef={timerRef}
                audioRef={audioRef}
                setCarouselActive={setCarouselActive}
                carouselActive={carouselActive}
                carouselRef={carouselRef}
                handleStartCarousel={handleStartCarousel}
              />

              <NavigationCards />

              <ImageCarousel
                ref={carouselRef}
                active={carouselActive}
                setCarouselActive={setCarouselActive}
              />
            </>
          }
        />

        {/* ALTRE PAGINE */}
        <Route path="/program" element={<Program />} />
        <Route path="/account" element={<Account />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>

      {/* AUDIO globale */}
      <audio ref={audioRef} />
    </div>
  );
}
