import TimerCard from "./TimerCard";
import MusicCard from "./MusicCard";
import CarouselCard from "./CarouselCard";
import { useRef } from "react";

export default function ControlCards({ timerRef, ...props }) {

  const musicRef = useRef(null);

  const handleMusicRef = () => {
    musicRef.current?.handleStopMusic();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      <TimerCard
        ref={timerRef}
        duration={props.duration}
        setDuration={props.setDuration}
        setTimeLeft={props.setTimeLeft}
        setIsRunning={props.setIsRunning}
        isRunning={props.isRunning}
        setCarouselActive={props.setCarouselActive}
        handleStartCarousel={props.handleStartCarousel}
        carouselRef={props.carouselRef}
        handleMusicRef={handleMusicRef}
      />


      <MusicCard
        ref={musicRef}
        setSelectedMusic={props.setSelectedMusic}
        audioRef={props.audioRef}
      />

      <CarouselCard
        setCarouselActive={props.setCarouselActive}
        handleStartCarousel={props.handleStartCarousel}
        carouselActive={props.carouselActive}
        carouselRef={props.carouselRef}
      />
    </section>
  );
}
