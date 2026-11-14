import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    id: "01",
    title: "Новая коллекция",
    subtitle: "Свежие силуэты сезона — от коктейльных платьев до строгих костюмов.",
    image: "/src/assets/editorial-silk.webp",
  },
  {
    id: "02",
    title: "Специальные предложения",
    subtitle: "Избранные модели по особым ценам для наших клиенток.",
    image: "/src/assets/editorial-suit.webp",
  },
  {
    id: "03",
    title: "Сезонные скидки",
    subtitle: "Скидки на капсулы сезона и модели прошлых коллекций.",
    image: "/src/assets/editorial-boutique.webp",
  },
  {
    id: "04",
    title: "Ограниченные предложения",
    subtitle: "Единичные экземпляры в каждом размере — успейте выбрать свой.",
    image: "/src/assets/editorial-limited.webp",
  },
];

export const SeasonShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 bg-[#FDFBF7]">
      <div className="container mx-auto px-4 mb-8">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Lally · 2026</span>
        <h2 className="text-3xl md:text-4xl font-serif mt-2">Сезон в деталях</h2>
      </div>

      {/* Горизонтальный скролл контейнер */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 pb-6 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div 
            key={item.id}
            className="min-w-[300px] md:min-w-[420px] h-[500px] relative rounded-lg overflow-hidden flex flex-col justify-end p-6 snap-center shrink-0 group cursor-pointer shadow-sm"
          >
            {/* Фоновое изображение */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            
            {/* Затемнение для читаемости текста */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Контент карточки */}
            <div className="relative z-10 text-white flex justify-between items-end">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1 opacity-80">Lally · 2026</p>
                <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                <p className="text-sm opacity-90 line-clamp-2">{item.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-light font-serif">{item.id}</span>
                <span className="text-lg font-light opacity-60">/ 04</span>
              </div>
            </div>

            {/* Кнопка перехода в углу */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-10 transition-colors group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
