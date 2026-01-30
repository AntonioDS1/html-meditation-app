import { useNavigate } from "react-router-dom";

export default function Back() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="
        mb-6
        border-none
        text-sm
        text-white/80
        hover:text-white
        transition
        flex
        items-center
        gap-2
      "
    >
      ← Back
    </button>
  );
}
