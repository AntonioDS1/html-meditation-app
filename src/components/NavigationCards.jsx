import { useNavigate } from "react-router-dom";
import NavigationCard from "./NavigationCard";

export default function NavigationCards() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

      <NavigationCard
        icon="🧘"
        title="Program"
        description="Create and follow a personalized meditation routine based on your goals and daily habits."
        buttonLabel="Create program"
        accentClass="
          bg-emerald-500
          hover:bg-emerald-600
          text-white
        "
        onClick={() => navigate("/program")}
      />

      <NavigationCard
        icon="👤"
        title="Account"
        description="Manage your profile, preferences, and personal information in one place."
        buttonLabel="Manage account"
        accentClass="
          bg-blue-500
          hover:bg-blue-600
          text-white
        "
        onClick={() => navigate("/account")}
      />

      <NavigationCard
        icon="💎"
        title="Subscription"
        description="Unlock premium features, advanced programs, and exclusive meditation content."
        buttonLabel="View plans"
        accentClass="
            bg-gradient-to-r from-purple-500 to-pink-500 text-white
            hover:brightness-110
            hover:shadow-xl
            hover:-translate-y-0.5
        "
        onClick={() => navigate('/subscription')}
        />


    </section>
  );
}
