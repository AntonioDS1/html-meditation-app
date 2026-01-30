import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const MusicCard = forwardRef(({ audioRef }, ref) => {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("Select Music/Sound Effect");
  const [isPaused, setIsPaused] = useState(false);
  const dropdownRef = useRef(null);

  const musicCategories = [
    {
      category: "Relax",
      items: [
        { label: "Relax", src: "/music/relax.mp3" },
        { label: "Zen", src: "/music/zen.mp3" },
      ],
    },
    {
      category: "Nature",
      items: [
        { label: "Ocean Waves", src: "/music/ocean-waves.mp3" },
        { label: "Rain", src: "/music/rain.mp3" },
        { label: "Thunderstorm", src: "/music/thunderstorm.mp3" },
        { label: "Forest", src: "/music/forest.mp3" },
        { label: "River Stream", src: "/music/river.mp3" },
      ],
    },
    {
      category: "Atmosphere",
      items: [
        { label: "Fireplace", src: "/music/fireplace.mp3" },
        { label: "Wind", src: "/music/wind.mp3" },
        { label: "Night Ambience", src: "/music/night.mp3" },
      ],
    },
    {
      category: "Focus",
      items: [
        { label: "Focus", src: "/music/focus2.mp3" },
        { label: "Deep Focus", src: "/music/deep-focus.mp3" },
        { label: "Binaural Beats", src: "/music/binaural.mp3" },
      ],
    },
    {
      category: "Sleep",
      items: [
        { label: "Sleep", src: "/music/sleep.mp3" },
        { label: "Deep Sleep", src: "/music/deep-sleep.mp3" },
        { label: "White Noise", src: "/music/white-noise.mp3" },
        { label: "Brown Noise", src: "/music/brown-noise.mp3" },
      ],
    },
    {
      category: "Soft Music",
      items: [
        { label: "Ambient Piano", src: "/music/piano.mp3" },
        { label: "Soft Guitar", src: "/music/guitar.mp3" },
        { label: "Lo-Fi Chill", src: "/music/lofi.mp3" },
      ],
    },
  ];

  const hasSelection = selectedLabel !== "Select Music/Sound Effect";



  // Pause / Keep playing
  const handlePauseToggle = () => {
    if (!audioRef.current) return;

    if (isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

    // 🎵 Selezione musica
  const handleSelect = (music) => {
    if (!audioRef.current) return;

    setSelectedLabel(music.label);
    setOpen(false);
    setOpenCategory(null);

    const audio = audioRef.current;

    audio.pause();
    audio.src = music.src;
    audio.currentTime = 0;
    audio.loop = true;

    audio.play().catch(() => {});

    // 🔓 SBLOCCA AudioContext
    const ctx = audio._audioCtx;
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }

    setIsPaused(false);
    handlePauseToggle();
  };



  // Stop Music
  const handleStopMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPaused(true);
  };

    useImperativeHandle(ref, () => ({
      handleStopMusic
    }));

  // Chiudi cliccando fuori
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setOpenCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="bg-white/30 p-4 rounded-xl text-center relative shadow-lg"
    >
      <h2 className="font-semibold mb-2 text-white/80">Music</h2>

      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="
          w-full
          bg-green-500
          text-white
          py-2
          px-4
          rounded
          flex
          justify-between
          items-center
          transition
          duration-200
          border-none
          hover:bg-green-600
          hover:shadow-md
          active:scale-95
        "
      >
        <span>{selectedLabel}</span>
        <span
          className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
            }`}
        >
          ▾
        </span>
      </button>

      {/* Controls */}
      <div className="flex gap-2 my-4">
        <button
          onClick={handlePauseToggle}
          disabled={!hasSelection}
          className="
            flex-1
            bg-blue-500
            text-white
            py-2
            rounded
            transition
            duration-200
            hover:bg-blue-600
            hover:shadow-md
            active:scale-95
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {isPaused ? "Play" : "Pause"}
        </button>

        <button
          onClick={handleStopMusic}
          disabled={!hasSelection}
          className="
            flex-1
            bg-white/20
            backdrop-blur-md
            text-black
            py-2
            rounded
            border
            border-black/20
            transition
            duration-200
            hover:bg-white/30
            hover:shadow-md
            active:scale-95
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Stop
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-rose-50 rounded-xl shadow-lg overflow-hidden z-10">
          {musicCategories.map((cat) => (
            <div key={cat.category}>
              <button
                onClick={() =>
                  setOpenCategory(
                    openCategory === cat.category ? null : cat.category
                  )
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2
                  font-semibold
                  text-rose-900
                  hover:bg-rose-100
                  flex
                  justify-between
                "
              >
                {cat.category}
                <span>{openCategory === cat.category ? "−" : "+"}</span>
              </button>

              {openCategory === cat.category &&
                cat.items.map((music) => (
                  <button
                    key={music.src}
                    onClick={() => handleSelect(music)}
                    className={`
                      w-full
                      text-left
                      pl-8
                      pr-4
                      py-2
                      text-rose-800
                      transition
                      ${selectedLabel === music.label
                        ? "bg-rose-200 font-semibold"
                        : "hover:bg-rose-100"
                      }
                    `}
                  >
                    {music.label}
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default MusicCard;
