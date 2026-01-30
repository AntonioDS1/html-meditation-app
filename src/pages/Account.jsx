import Back from "../components/Back";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  return (
    <div className="text-white pt-10 px-6 max-w-xl mx-auto">
      <Back />

      <h1 className="text-2xl font-semibold mb-4">Account</h1>

      <p className="text-sm opacity-80 mb-6">
        Create a free account to save your meditation programs
        and personalize your experience.
      </p>

      <button className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-xl mb-4">
        Create free account
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm opacity-70 mb-2">
          Want advanced features?
        </p>

        <button
          onClick={() => navigate("/subscription")}
          className="bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-xl"
        >
          View premium plans
        </button>
      </div>
    </div>
  );
}
