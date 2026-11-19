export type Lang = "ru" | "az";
export const LANGS: Lang[] = ["ru", "az"];

/** A text that exists in both languages. */
export type Localized = { ru: string; az: string };

const ru = {
  nav: { home: "Главная", catalog: "Каталог", about: "О бутике", menu: "Меню", close: "Закрыть" },
  address: "Nizami Mall, магазин №316, Баку",
  addressCity: "Баку, Азербайджан",
  addressStore: "Nizami Mall, магазин №316",
  home: {
    eyebrow: "Новая коллекция · Осень — Зима 2026",
    slogan: "Выбор стильных женщин",
    cta: "Открыть каталог",
    scroll: "Листайте",
    infoTitle: "Сезон в деталях",
    infoCta: "Смотреть в каталоге",
    info: [
      { title: "Новая коллекция", text: "Свежие силуэты сезона — от коктейльных платьев до строгих костюмов." },
      { title: "Специальные предложения", text: "Избранные модели по особым ценам для наших клиенток." },
      { title: "Сезонные скидки", text: "Скидки на капсулы сезона и модели прошлых коллекций." },
      { title: "Ограниченные предложения", text: "Единичные экземпляры в каждом размере — успейте выбрать свой." },
    ],
    promoTitle: "АКЦИИ",
    promoLead: (n: number) => `Скидки до ${n}% на избранные модели`,
    promoText: "Цены уже снижены — выберите размер и закажите в WhatsApp за пару минут.",
    promoCta: "Смотреть все акции",
    aboutEyebrow: "О бутике",
    aboutTitle: "Современная женская мода в сердце Баку",
    aboutText:
      "LALLY BOUTIQUE — это пространство, где каждая вещь выбрана с вниманием к деталям, эстетике и индивидуальности. Приходите в Nizami Mall или выбирайте онлайн.",
    aboutCta: "Перейти в каталог",
    aboutMore: "Подробнее о бутике",
  },
  catalog: {
    eyebrow: "Коллекция 2026",
    title: "Каталог",
    intro: "Платья, костюмы и вечерние образы. Выберите цвет, листайте фото и нажмите на модель, чтобы рассмотреть её ближе и выбрать размер.",
    count: (n: number) => `${n} ${plural(n, "модель", "модели", "моделей")}`,
    empty: "В этой категории пока нет моделей. Загляните чуть позже.",
    all: "Все",
    categories: {
      dresses: "Платья",
      suits: "Костюмы",
      casual: "Повседневная одежда",
      evening: "Вечерняя одежда",
      new: "Новинки",
    },
    sku: "Артикул",
    size: "Размер",
    sizes: "Размеры",
    chooseSize: "Выберите размер",
    chooseSizeFirst: "Сначала выберите размер",
    oldPrice: "Старая цена",
    newPrice: "Цена со скидкой",
    discount: "Скидка",
    isNew: "Новинка",
    details: "Подробнее",
    order: "Заказать",
    orderWhatsapp: "Заказать через WhatsApp",
    close: "Закрыть",
    sizeUnavailable: "нет в наличии",
    color: "Цвет",
    fabric: "Ткань и уход",
    prevPhoto: "Предыдущее фото",
    nextPhoto: "Следующее фото",
    photoOf: (i: number, n: number) => `Фото ${i} из ${n}`,
    colorOf: (name: string) => `Цвет: ${name}`,
    note: "Наличие и примерку уточнит консультант в WhatsApp. Оплата при получении.",
    helpTitle: "Не нашли свой размер?",
    helpText: "Напишите нам — подберём модель и расскажем о новых поступлениях.",
    helpCta: "Написать в WhatsApp",
  },
  about: {
    eyebrow: "О бутике",
    title: "Стиль — это способ рассказать о себе без слов",
    mission: [
      "LALLY BOUTIQUE — пространство современной женской моды, где каждая коллекция создаётся с вниманием к деталям, эстетике и индивидуальности.",
      "Мы стремимся объединять актуальные модные тенденции, элегантность и доступную роскошь.",
    ],
    valuesTitle: "Наши принципы",
    values: [
      { title: "Детали", text: "Фактура ткани, посадка, пуговица — мы проверяем каждую мелочь." },
      { title: "Эстетика", text: "Чистые линии и выразительные силуэты, которые не устаревают за сезон." },
      { title: "Индивидуальность", text: "Поможем собрать образ, который подчеркнёт именно вас." },
    ],
    deliveryTitle: "Доставка",
    delivery: [
      { title: "По Баку", text: "Курьерская доставка в день заказа или на следующий день." },
      { title: "По регионам Азербайджана", text: "Отправка в любой город страны — 2–4 рабочих дня." },
      { title: "Примерка в бутике", text: "Приходите в Nizami Mall, магазин №316 — подберём размер вместе." },
    ],
    deliveryNote: "Стоимость и сроки доставки уточняйте в WhatsApp.",
    contactsTitle: "Контакты",
    phone: "Телефон",
    writeWhatsapp: "Написать в WhatsApp",
    call: "Позвонить",
    instagram: "Перейти в Instagram",
    map: "Открыть на карте",
  },
  footer: {
    rights: "Все права защищены.",
    tagline: "Выбор стильных женщин",
    navTitle: "Навигация",
    contactTitle: "Контакты",
  },
  wa: {
    general: "Здравствуйте! Пишу с сайта LALLY BOUTIQUE. Хотела бы узнать подробнее о новой коллекции.",
  },
};

function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

export type Dictionary = typeof ru;

const az: Dictionary = {
  nav: { home: "Ana səhifə", catalog: "Kataloq", about: "Haqqımızda", menu: "Menyu", close: "Bağla" },
  address: "Nizami Mall, mağaza №316, Bakı",
  addressCity: "Bakı, Azərbaycan",
  addressStore: "Nizami Mall, mağaza №316",
  home: {
    eyebrow: "Yeni kolleksiya · Payız — Qış 2026",
    slogan: "Dəbli xanımların seçimi",
    cta: "Kataloqa bax",
    scroll: "Aşağı sürüşdürün",
    infoTitle: "Mövsüm detallarda",
    infoCta: "Kataloqda bax",
    info: [
      { title: "Yeni kolleksiya", text: "Mövsümün yeni siluetləri — kokteyl donlarından klassik kostyumlara qədər." },
      { title: "Xüsusi təkliflər", text: "Müştərilərimiz üçün seçilmiş modellər xüsusi qiymətlərlə." },
      { title: "Mövsümi endirimlər", text: "Mövsüm kapsullarına və ötən kolleksiyaların modellərinə endirimlər." },
      { title: "Məhdud təkliflər", text: "Hər ölçüdə tək nüsxələr — öz modelinizi seçməyə tələsin." },
    ],
    promoTitle: "ENDİRİMLƏR",
    promoLead: (n: number) => `Seçilmiş modellərə ${n}%-dək endirim`,
    promoText: "Qiymətlər artıq endirilib — ölçünüzü seçin və bir neçə dəqiqəyə WhatsApp ilə sifariş edin.",
    promoCta: "Bütün endirimlərə bax",
    aboutEyebrow: "Haqqımızda",
    aboutTitle: "Bakının mərkəzində müasir qadın dəbi",
    aboutText:
      "LALLY BOUTIQUE — hər bir geyimin detallara, estetikaya və fərdiliyə diqqətlə seçildiyi məkandır. Nizami Mall-a gəlin və ya onlayn seçin.",
    aboutCta: "Kataloqa keç",
    aboutMore: "Butik haqqında ətraflı",
  },
  catalog: {
    eyebrow: "Kolleksiya 2026",
    title: "Kataloq",
    intro: "Donlar, kostyumlar və axşam obrazları. Rəng seçin, fotoları vərəqləyin və ölçü seçmək üçün modelə toxunun.",
    count: (n: number) => `${n} model`,
    empty: "Bu kateqoriyada hələ model yoxdur. Bir az sonra yenidən baxın.",
    all: "Hamısı",
    categories: {
      dresses: "Donlar",
      suits: "Kostyumlar",
      casual: "Gündəlik geyim",
      evening: "Axşam geyimi",
      new: "Yeniliklər",
    },
    sku: "Artikül",
    size: "Ölçü",
    sizes: "Ölçülər",
    chooseSize: "Ölçü seçin",
    chooseSizeFirst: "Əvvəlcə ölçü seçin",
    oldPrice: "Köhnə qiymət",
    newPrice: "Endirimli qiymət",
    discount: "Endirim",
    isNew: "Yeni",
    details: "Ətraflı",
    order: "Sifariş et",
    orderWhatsapp: "WhatsApp ilə sifariş et",
    close: "Bağla",
    sizeUnavailable: "mövcud deyil",
    color: "Rəng",
    fabric: "Parça və qulluq",
    prevPhoto: "Əvvəlki foto",
    nextPhoto: "Növbəti foto",
    photoOf: (i: number, n: number) => `Foto ${i} / ${n}`,
    colorOf: (name: string) => `Rəng: ${name}`,
    note: "Mövcudluğu və ölçünü WhatsApp-da məsləhətçimiz dəqiqləşdirəcək. Ödəniş təhvil zamanı.",
    helpTitle: "Ölçünüzü tapmadınız?",
    helpText: "Bizə yazın — modeli birlikdə seçək və yeni gələnlər barədə məlumat verək.",
    helpCta: "WhatsApp-a yaz",
  },
  about: {
    eyebrow: "Haqqımızda",
    title: "Stil özünü sözsüz ifadə etməyin ən gözəl yoludur",
    mission: [
      "LALLY BOUTIQUE — müasir qadın dəbi məkanıdır; burada hər kolleksiya detallara, estetikaya və fərdiliyə diqqətlə yaradılır.",
      "Biz aktual dəb trendlərini, zərifliyi və əlçatan dəbdəbəni birləşdirməyə çalışırıq.",
    ],
    valuesTitle: "Prinsiplərimiz",
    values: [
      { title: "Detallar", text: "Parçanın fakturası, oturuşu, düyməsi — hər xırdalığı yoxlayırıq." },
      { title: "Estetika", text: "Bir mövsümdə köhnəlməyən təmiz xətlər və ifadəli siluetlər." },
      { title: "Fərdilik", text: "Məhz sizi vurğulayan obrazı birlikdə yaradaq." },
    ],
    deliveryTitle: "Çatdırılma",
    delivery: [
      { title: "Bakı daxilində", text: "Kuryer çatdırılması sifariş günü və ya növbəti gün." },
      { title: "Azərbaycanın regionlarına", text: "Ölkənin istənilən şəhərinə göndəriş — 2–4 iş günü." },
      { title: "Butikdə geyinib yoxlayın", text: "Nizami Mall, mağaza №316-ya gəlin — ölçünü birlikdə seçək." },
    ],
    deliveryNote: "Çatdırılmanın qiymətini və müddətini WhatsApp-da dəqiqləşdirin.",
    contactsTitle: "Əlaqə",
    phone: "Telefon",
    writeWhatsapp: "WhatsApp-a yaz",
    call: "Zəng et",
    instagram: "Instagram-a keç",
    map: "Xəritədə aç",
  },
  footer: {
    rights: "Bütün hüquqlar qorunur.",
    tagline: "Dəbli xanımların seçimi",
    navTitle: "Naviqasiya",
    contactTitle: "Əlaqə",
  },
  wa: {
    general: "Salam! LALLY BOUTIQUE saytından yazıram. Yeni kolleksiya haqqında ətraflı məlumat almaq istərdim.",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { ru, az };
