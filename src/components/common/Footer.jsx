import { ShieldCheck, Scale, Info } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-primary text-white py-8 px-6 mt-auto border-t border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-saffron flex items-center justify-center font-bold text-white text-xs">
              B
            </div>
            <span className="font-bold text-base font-serif">
              भारत वन (BharatOne AI)
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            India's AI Public Services Companion
          </p>
        </div>

        {/* Center compliance links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300">
          <a
            href="/privacy"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-150"
          >
            <ShieldCheck className="h-4 w-4 text-green" />
            <span>DPDP सहमति (Consent Policy)</span>
          </a>
          <a
            href="/legal-disclaimer"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-150"
          >
            <Scale className="h-4 w-4 text-saffron" />
            <span>कानूनी अस्वीकरण (Disclaimer)</span>
          </a>
          <a
            href="/help"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-150"
          >
            <Info className="h-4 w-4 text-accent" />
            <span>मदद और सहायता (Help Desk)</span>
          </a>
        </div>

        {/* Right copyright metadata */}
        <div className="text-right text-[10px] text-slate-400">
          <div>डिजिटल इंडिया पहल (Digital India Initiative)</div>
          <div className="mt-1">© 2026. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
