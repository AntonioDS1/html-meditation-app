import Back from "../components/Back";

export default function Subscription() {
  return (
    <div className="text-white pt-10 px-6 max-w-xl mx-auto">
      <Back />

      <h1 className="text-2xl font-semibold mb-6">
        Premium Subscription
      </h1>

      <ul className="space-y-3 text-sm opacity-80 mb-6">
        <li>✔ Unlimited personalized programs</li>
        <li>✔ Advanced meditation techniques</li>
        <li>✔ Progress & streak tracking</li>
        <li>✔ Exclusive soundscapes</li>
      </ul>

      <button className="
        w-full
        bg-gradient-to-r
        from-purple-500
        to-pink-500
        hover:brightness-110
        transition
        text-white
        border-none
        py-2
        rounded-xl
      ">
        Upgrade to Premium
      </button>
    </div>
  );
}
