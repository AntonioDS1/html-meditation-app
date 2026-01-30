import { forwardRef, useImperativeHandle, useState } from "react";

const TimerCard = forwardRef(({
  setTimeLeft,
  setIsRunning,
  isRunning,
  setCarouselActive,
  handleStartCarousel,
  carouselRef,
  handleMusicRef
}, ref) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const clamp59 = (n) => Math.max(0, Math.min(59, Number(n) || 0));

  /* Ferma tutto quando il timer finisce, (FUNZIONE ESPOSTA CON forwardRef E useImperativeHandle)*/

  const handleStop = async () => {
    setIsRunning(false);
    handleStartCarousel();
    handleMusicRef();
    carouselRef.current?.reset();
    setCarouselActive(false);
  };

  useImperativeHandle(ref, () => ({
    handleStop,
      }
    )
  );

  const handleStart = () => {
    const totalSeconds =
      (Number(hours) || 0) * 3600 + clamp59(minutes) * 60 + clamp59(seconds);

    if (totalSeconds <= 0) return;

    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  return (
    <div className="bg-white/30 backdrop-blur-md p-4 rounded-xl text-center text-black shadow-lg">
      <h2 className="font-semibold mb-3 text-white/80">Timer</h2>

      {/* hh:mm:ss */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <input
          type="number"
          min="0"
          value={hours}
          onChange={(e) => setHours(Math.max(0, Number(e.target.value) || 0))}
          className="w-16 p-2 rounded border border-black/20 bg-white/70 text-center text-black outline-none focus:ring-2 focus:ring-black/20"
          placeholder="hh"
        />
        <span className="text-black/70">:</span>
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => setMinutes(clamp59(e.target.value))}
          className="w-16 p-2 rounded border border-black/20 bg-white/70 text-center text-black outline-none focus:ring-2 focus:ring-black/20"
          placeholder="mm"
        />
        <span className="text-black/70">:</span>
        <input
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) => setSeconds(clamp59(e.target.value))}
          className="w-16 p-2 rounded border border-black/20 bg-white/70 text-center text-black outline-none focus:ring-2 focus:ring-black/20"
          placeholder="ss"
        />
      </div>

      {/* Bottoni: Start sempre, Stop solo se attivo */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleStart}
          className="
          bg-purple-600
          text-white
          px-4
          py-2
          rounded
          transition
          duration-200
          border-none
          hover:bg-purple-700
          hover:shadow-md
          active:scale-95
        "
        >
          Start
        </button>

        {isRunning && (
          <button
            onClick={handleStop}
            className="
            bg-white/20
            backdrop-blur-md
            text-black
            px-4
            py-2
            rounded
            border
            border-black/20
            transition
            duration-200
            hover:bg-white/30
            hover:shadow-md
            active:scale-95
          "
          >
            Stop
          </button>
        )}

      </div>
    </div>
  );
});

export default TimerCard;
