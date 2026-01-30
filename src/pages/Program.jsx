import { useNavigate } from "react-router-dom";
import Back from "../components/Back";

const PRESET_PROGRAMS = [
  {
    id: 1,
    title: "Morning Calm",
    duration: "10 min",
    description: "Start your day with clarity and focus."
  },
  {
    id: 2,
    title: "Deep Relax",
    duration: "20 min",
    description: "Release tension and slow down your mind."
  },
  {
    id: 3,
    title: "Sleep Preparation",
    duration: "15 min",
    description: "Prepare your body and mind for deep sleep."
  },
  {
    id: 4,
    title: "Focus Boost",
    duration: "25 min",
    description: "Improve concentration and productivity."
  }
];

export default function Program() {
  const navigate = useNavigate();

  // TEMPORANEO (poi diventerà stato globale)
  const isAuthenticated = false;

  const handleSelectProgram = () => {
    if (!isAuthenticated) {
      navigate("/account", { state: { from: "program" } });
    }
  };

  return (
    <div className="text-white pt-10 px-6 max-w-5xl mx-auto">
      <Back />

      <h1 className="text-2xl font-semibold mb-6">
        Meditation Programs
      </h1>

      {/* Preset programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {PRESET_PROGRAMS.map((program) => (
          <div
            key={program.id}
            className="bg-white/20 p-5 rounded-xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-medium mb-1">
                {program.title}
              </h2>
              <p className="text-sm opacity-70 mb-2">
                {program.duration}
              </p>
              <p className="text-sm opacity-80">
                {program.description}
              </p>
            </div>

            <button
              onClick={handleSelectProgram}
              className="
                mt-4
                bg-emerald-500
                hover:bg-emerald-600
                border-none
                transition
                text-white
                py-2
                rounded-xl
              "
            >
              Select program
            </button>
          </div>
        ))}
      </div>

      {/* Custom program */}
      <div className="bg-white/30 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2">
          Create your own program
        </h2>

        <p className="text-sm opacity-80 mb-4">
          Build a meditation routine tailored to your needs and goals.
        </p>

        <button
          onClick={() =>
            navigate("/account", { state: { from: "custom-program" } })
          }
          className="
            bg-purple-500
            hover:bg-purple-600
            transition
            text-white
            border-none
            px-4
            py-2
            rounded-xl
          "
        >
          Create custom program
        </button>
      </div>
    </div>
  );
}
