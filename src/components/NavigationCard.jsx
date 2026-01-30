export default function NavigationCard({
  icon,
  title,
  description,
  buttonLabel,
  accentClass,
  onClick
}) {
  return (
    <div
      className="
        bg-white/30
        p-6
        rounded-2xl
        text-white
        flex
        flex-col
        justify-between
        shadow-lg
        transition

      "
    >
      {/* Header */}
      <div>
        <div className="text-4xl mb-4">{icon}</div>

        <h2 className="text-xl font-semibold mb-2">
          {title}
        </h2>

        <p className="text-sm text-white/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onClick}
        className={`
            mt-6 py-2 px-4 rounded-xl font-medium border-none
            transition-all duration-300
            active:scale-95
            ${accentClass}
        `}
        >
        {buttonLabel}
        </button>
    </div>
  );
}
