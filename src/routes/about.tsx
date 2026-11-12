import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, MapPin, Phone } from "lucide-react";

import boutiqueImg from "@/assets/editorial-boutique.webp";
import silkImg from "@/assets/editorial-silk.webp";
import suitImg from "@/assets/editorial-suit.webp";
import { editorialButton } from "@/components/site/button-styles";
import { Marquee } from "@/components/site/Marquee";
import { Parallax } from "@/components/site/Parallax";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { SITE } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О бутике · Haqqımızda | LALLY BOUTIQUE, Nizami Mall Баку" },
      {
        name: "description",
        content:
          "Философия LALLY BOUTIQUE, контакты и доставка: Nizami Mall, магазин №316, Баку. Телефон +994 70 652 02 92, WhatsApp и Instagram.",
      },
      { property: "og:title", content: "О бутике LALLY BOUTIQUE" },
      {
        property: "og:description",
        content: "Стиль — это способ рассказать о себе без слов. Nizami Mall, магазин №316, Баку. Доставка по всему Азербайджану.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-header">
      {/* Manifesto */}
      <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-12 md:px-10 md:pb-32 md:pt-20">
        <p className="animate-fade-up type-eyebrow text-muted-foreground">{t.about.eyebrow}</p>
        <h1 className="animate-fade-up mt-6 max-w-[16ch] font-serif text-[13vw] font-medium leading-[0.9] tracking-[-0.02em] [animation-delay:150ms] md:text-[7.4vw] 2xl:text-[8.5rem]">
          {t.about.title}
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-12 px-5 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-7">
          <Reveal variant="clip">
            <Parallax speed={0.12} className="aspect-[4/5] md:aspect-[6/7]" innerClassName="scale-[1.2]">
              <img src={suitImg} alt="" className="h-full w-full object-cover" />
            </Parallax>
          </Reveal>
        </div>
        <div className="flex flex-col justify-between gap-12 md:col-span-4 md:col-start-9">
          <Reveal className="space-y-6 md:pt-16">
            <p className="font-serif text-8xl leading-[0.5] text-silver" aria-hidden="true">“</p>
            {t.about.mission.map((p, i) => (
              <p key={i} className={i === 0 ? "font-serif text-3xl leading-tight md:text-4xl" : "leading-relaxed text-muted-foreground"}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal variant="clip" delay={150}>
            <Parallax speed={0.06} className="aspect-[3/4]" innerClassName="scale-[1.15]">
              <img src={silkImg} alt="" className="h-full w-full object-cover" />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40">
        <Reveal>
          <h2 className="type-eyebrow text-muted-foreground">{t.about.valuesTitle}</h2>
        </Reveal>
        <div className="mt-10 grid border-t border-foreground md:grid-cols-3">
          {t.about.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 110} className="border-b border-border py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <span className="font-display text-5xl text-silver">0{i + 1}</span>
              <h3 className="mt-8 font-serif text-4xl">{v.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee className="border-y border-foreground py-5 font-display text-4xl md:py-7 md:text-6xl" />

      {/* Delivery */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="font-serif text-6xl leading-none md:text-8xl">{t.about.deliveryTitle}</h2>
            <p className="mt-6 max-w-xs text-sm text-muted-foreground">{t.about.deliveryNote}</p>
          </Reveal>
          <ol className="md:col-span-7 md:col-start-6">
            {t.about.delivery.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 100} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-7 first:border-t first:border-t-foreground">
                <span className="type-eyebrow pt-2 text-muted-foreground">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-3xl">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Contacts */}
      <section className="relative overflow-hidden bg-ink text-milk">
        <Parallax speed={0.15} className="absolute inset-0 opacity-25" innerClassName="scale-[1.3]">
          <img src={boutiqueImg} alt="" loading="lazy" className="h-full w-full object-cover" />
        </Parallax>
        <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <Reveal>
            <p className="type-eyebrow text-ink-muted">{t.about.contactsTitle}</p>
            <p className="type-masthead mt-8 text-[17vw] md:text-[9vw] 2xl:text-[10rem]">LALLY BOUTIQUE</p>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <Reveal>
              <p className="flex items-center gap-2 type-eyebrow text-ink-muted">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> {t.addressCity}
              </p>
              <p className="mt-3 font-serif text-3xl">{t.addressStore}</p>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block type-eyebrow underline underline-offset-8">
                {t.about.map}
              </a>
            </Reveal>
            <Reveal delay={100}>
              <p className="flex items-center gap-2 type-eyebrow text-ink-muted">
                <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> {t.about.phone}
              </p>
              <a href={SITE.phoneHref} className="mt-3 block font-serif text-3xl hover:opacity-70">
                {SITE.phoneDisplay}
              </a>
            </Reveal>
            <Reveal delay={200}>
              <p className="flex items-center gap-2 type-eyebrow text-ink-muted">
                <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} /> Instagram
              </p>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 block font-serif text-3xl hover:opacity-70">
                {SITE.instagramHandle}
              </a>
            </Reveal>
          </div>
          <Reveal className="mt-14 flex flex-wrap gap-4">
            <a href={whatsappLink(t.wa.general)} target="_blank" rel="noopener noreferrer" className={editorialButton({ variant: "milk", size: "lg" })}>
              <WhatsAppIcon className="h-4 w-4" />
              <span>{t.about.writeWhatsapp}</span>
            </a>
            <a href={SITE.phoneHref} className={editorialButton({ variant: "light", size: "lg" })}>
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              <span>{t.about.call}</span>
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={editorialButton({ variant: "light", size: "lg" })}>
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
              <span>{t.about.instagram}</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1600px] justify-center px-5 py-20 md:px-10">
        <Link to="/catalog" className={editorialButton({ variant: "outline", size: "lg" })}>
          <span>{t.home.aboutCta}</span>
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </section>
    </div>
  );
}
