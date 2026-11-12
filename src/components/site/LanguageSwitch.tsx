import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/translations";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className={cn("flex items-center gap-1 type-eyebrow", className)} role="group" aria-label="Language">
      {LANGS.map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span className="text-silver">/</span>}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={cn(
              "relative px-1 py-2 transition-opacity duration-300",
              lang === code ? "opacity-100" : "opacity-45 hover:opacity-100",
            )}
          >
            {code.toUpperCase()}
            <span
              className={cn(
                "absolute inset-x-1 bottom-1 h-px origin-left bg-current transition-transform duration-500",
                lang === code ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        </span>
      ))}
    </div>
  );
}
