import { useEffect, useRef } from "react";

export default function AudioVisualizer({ audioRef, isRunning }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;

    if (!audio || !canvas) return;

    const ctx2d = canvas.getContext("2d");

    /* =========================
       AUDIO CONTEXT (singleton)
    ========================= */
    if (!audio._audioCtx) {
      audio._audioCtx = new AudioContext();
    }

    const audioCtx = audio._audioCtx;

    /* =========================
       SOURCE NODE (singleton)
    ========================= */
    if (!audio._sourceNode) {
      audio._sourceNode = audioCtx.createMediaElementSource(audio);
    }

    /* =========================
       ANALYSER NODE (singleton)
    ========================= */
    if (!audio._analyserNode) {
      audio._analyserNode = audioCtx.createAnalyser();
      audio._analyserNode.fftSize = 2048;

      audio._sourceNode.connect(audio._analyserNode);
      audio._analyserNode.connect(audioCtx.destination);

      audio._dataArray = new Uint8Array(audio._analyserNode.fftSize);
    }

    const analyser = audio._analyserNode;
    const dataArray = audio._dataArray;
    const bufferLength = analyser.fftSize;

    /* =========================
       DRAW LOOP
    ========================= */
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      ctx2d.clearRect(0, 0, canvas.width, canvas.height);

      ctx2d.beginPath();
      ctx2d.lineWidth = 2;
      ctx2d.strokeStyle = "rgba(255,255,255,0.85)";

      if (audio.paused) {
        ctx2d.moveTo(0, canvas.height / 2);
        ctx2d.lineTo(canvas.width, canvas.height / 2);
        ctx2d.stroke();
        return;
      }

      analyser.getByteTimeDomainData(dataArray);

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128;
        const y = (v * canvas.height) / 2;

        i === 0 ? ctx2d.moveTo(x, y) : ctx2d.lineTo(x, y);
        x += sliceWidth;
      }

      ctx2d.stroke();
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [audioRef, isRunning]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={80}
      className="mx-auto block mt-3"
    />
  );
}
