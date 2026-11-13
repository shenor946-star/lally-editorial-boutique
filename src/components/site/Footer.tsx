import { Link } from "@tanstack/react-router";

import brandLogo from "@/assets/lally-boutique-logo.png";
import { SITE } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-ink text-milk">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <img
              src={brandLogo}
              alt="LALY BOUTIQUE"
              loading="lazy"
              className="w-[min(78vw,22rem)] object-contain invert"
            />
            <p className="mt-8 font-serif text-2xl italic text-ink-muted">{t.footer.tagline}</p>
          </div>
          <div className="md:col-span-3">
            <p className="type-eyebrow text-ink-muted">{t.footer.navTitle}</p>
            <ul className="mt-6 space-y-3 font-serif text-2xl">
              <li>
                <Link to="/" className="transition-opacity hover:opacity-60">{t.nav.home}</Link>
              </li>
              <li>
                <Link to="/catalog" className="transition-opacity hover:opacity-60">{t.nav.catalog}</Link>
              </li>
              <li>
                <Link to="/about" className="transition-opacity hover:opacity-60">{t.nav.about}</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="type-eyebrow text-ink-muted">{t.footer.contactTitle}</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed">
              <li>{t.addressStore}</li>
              <li>{t.addressCity}</li>
              <li>
                <a href={SITE.phoneHref} className="transition-opacity hover:opacity-60">{SITE.phoneDisplay}</a>
              </li>
              <li>
                <a href={whatsappLink(t.wa.general)} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">
                  WhatsApp
                </a>
                <span className="mx-2 text-ink-muted">/</span>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-3 border-t border-milk/15 pt-6 type-eyebrow text-ink-muted md:flex-row">
          <span>© {new Date().getFullYear()} LALLY BOUTIQUE. {t.footer.rights}</span>
          <span>Bakı · Azərbaycan</span>
        </div>
      </div>
    </footer>
  );
}
