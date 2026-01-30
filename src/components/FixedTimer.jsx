export default function FixedTimer({ timeLeft }) {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n) => n.toString().padStart(2, "0");

  return (
    <div className="text-white text-2xl font-mono mb-2 text-center">
      {hours > 0
        ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`}
    </div>
  );
}
