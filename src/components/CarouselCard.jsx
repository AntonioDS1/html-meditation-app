export default function CarouselCard({
  setCarouselActive,
  carouselActive,
  handleStartCarousel
}) {





  return (
    <div className="bg-white/30 backdrop-blur-md p-4 rounded-xl text-center shadow-lg">
      <h2 className="font-semibold mb-3 text-white/80">Images</h2>

      <div className="flex justify-center gap-3">
        <button
          onClick={handleStartCarousel}
          className="
            bg-blue-500
            text-white
            px-4
            py-2
            rounded
            transition
            duration-200
            hover:bg-blue-600
            hover:shadow-md
            active:scale-95
          "
        >
          Start Images view
        </button>

        {carouselActive && (
          <button
            onClick={() => setCarouselActive(false)}
            className="
              bg-white/20
              text-black
              backdrop-blur-md
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
}
