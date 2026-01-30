import FixedTimer from "./FixedTimer";
import AudioVisualizer from "./AudioVisualizer";
import logo from "../assets/logo.png";

import { useApp } from "../stores/AppContext";

export default function Header({
  timeLeft,
  duration,
  audioRef,
}) {
  const { isRunning } = useApp();

  return (
    <header
      className="sticky top-0 z-50 bg-white/20 backdrop-blur-md p-6 transition-all"
      data-running={isRunning}
      data-duration={duration}
    >
      <div className="flex justify-center items-center gap-4 mb-4">
        <img src={logo} alt="Logo" className="w-40 h-40 -mr-10" />

        <div className="text-left">
          <h1 className="font-title text-[2.5rem] md:text-[2.75rem] font-semibold tracking-wide text-white/80">
            Meditation
          </h1>
          <p className="font-subtitle text-sm tracking-[0.25em] text-white/80">
            Calm Mind & Strong Body
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center -mt-10">
        <FixedTimer timeLeft={timeLeft} />

        <AudioVisualizer
          audioRef={audioRef}
          isRunning={isRunning}
        />
      </div>
    </header>
  );
}
