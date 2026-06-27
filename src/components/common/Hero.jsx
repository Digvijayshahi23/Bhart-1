export function Hero({
  title = "भारत वन (BharatOne AI)",
  subtitle = "आपका भरोसेमंद AI साथी (Your Trusted AI Companion)",
  description = "सरकारी योजनाएँ, दस्तावेज़ समझें, स्वास्थ्य और बहुत कुछ - अब एक ही जगह, आपकी भाषा में। (Discover government benefits, translate documents, access healthcare advice, and more - all in one place, in your local language.)",
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface border border-border-subtle p-6 md:p-8 shadow-sm flex flex-col gap-4">
      {/* Flag color top line */}
      <div className="absolute top-0 inset-x-0 h-1.5 flex">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-green" />
      </div>

      <div className="flex flex-col gap-2 max-w-3xl">
        <span className="text-xs text-saffron uppercase font-bold tracking-wider font-serif">
          डिजिटल भारत | Digital India Initiative
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-primary font-serif leading-tight mt-1">
          {title}
        </h2>
        <h3 className="text-lg md:text-xl font-bold text-accent">{subtitle}</h3>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed mt-2">
          {description}
        </p>
      </div>
    </div>
  );
}
