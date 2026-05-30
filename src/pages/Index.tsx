import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/95220a86-5ef3-4f3a-b595-17cb404449a0/files/458d8597-9528-40d1-9ea8-b6a9b016d3df.jpg";

// --- Countdown Timer ---
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function CountdownUnit({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-2xl font-bold" style={{ color: "#EAAD25" }}>
        {String(val).padStart(2, "0")}
      </span>
      <span className="text-[10px] tracking-widest uppercase" style={{ color: "#9A9390" }}>{label}</span>
    </div>
  );
}

// --- Nav ---
function Nav({ onRegister }: { onRegister: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { href: "#about", label: "О проекте" },
    { href: "#utp", label: "Уникальность" },
    { href: "#events", label: "События" },
    { href: "#faq", label: "FAQ" },
    { href: "#register", label: "Регистрация" },
  ];
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(14,14,14,0.97)" : "transparent", borderBottom: scrolled ? "1px solid rgba(132,153,79,0.15)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <img
            src="https://cdn.poehali.dev/projects/95220a86-5ef3-4f3a-b595-17cb404449a0/bucket/472727f6-20d0-42af-b38c-3db21d83cf5a.png"
            alt="DAY AFTER"
            className="h-10 w-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="https://discord.gg/" target="_blank" rel="noopener" className="transition-opacity hover:opacity-70" style={{ color: "#9A9390" }} title="Discord">
              <Icon name="MessageSquare" size={16} />
            </a>
            <a href="https://vk.com/" target="_blank" rel="noopener" className="transition-opacity hover:opacity-70" style={{ color: "#9A9390" }} title="VK">
              <Icon name="Users" size={16} />
            </a>
            <a href="https://t.me/" target="_blank" rel="noopener" className="transition-opacity hover:opacity-70" style={{ color: "#9A9390" }} title="Telegram">
              <Icon name="Send" size={16} />
            </a>
          </div>
          <button onClick={onRegister} className="btn-primary text-sm">Играть</button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2" style={{ background: "rgba(14,14,14,0.98)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block py-3 nav-link text-base border-b" style={{ borderColor: "rgba(154,147,144,0.1)" }} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <button onClick={() => { onRegister(); setMenuOpen(false); }} className="btn-primary w-full mt-4 justify-center">Играть</button>
        </div>
      )}
    </header>
  );
}

// --- Hero ---
function Hero({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="hero">
      <div className="absolute inset-0">
        {/* Акварельный арт — постапокалиптический город с кордицепсом */}
        <img
          src="https://cdn.poehali.dev/projects/95220a86-5ef3-4f3a-b595-17cb404449a0/bucket/af85c668-b3f0-45c2-adf7-1b6cd0396775.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.55, objectPosition: "center 30%" }}
        />
        {/* Затемнение снизу — плавный переход в фон сайта */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(22,22,22,0.25) 0%, rgba(22,22,22,0.5) 45%, #161616 100%)" }} />
        {/* Красный ореол — угроза, опасность */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 20%, rgba(186,63,83,0.18) 0%, transparent 50%)" }} />
        {/* Зелёный ореол снизу — кордицепс, свечение воды */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 85%, rgba(132,153,79,0.15) 0%, transparent 45%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <p className="section-label animate-fade-up opacity-0 delay-100">Garry's Mod · Role-Play · The Last Of Us</p>
          <div className="animate-fade-up opacity-0 delay-200 mb-6">
            <img
              src="https://cdn.poehali.dev/projects/95220a86-5ef3-4f3a-b595-17cb404449a0/bucket/defde569-bc99-42f6-81e9-482e3a940414.png"
              alt="DAY AFTER"
              className="h-40 md:h-56 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 40px rgba(186,63,83,0.25))" }}
            />
          </div>
          <div className="green-line animate-fade-up opacity-0 delay-300" />
          <p className="font-heading text-base tracking-[0.25em] uppercase mb-5 animate-fade-up opacity-0 delay-350" style={{ color: "#BA3F53" }}>
            Выжить. Решить. Надеяться.
          </p>
          <p className="text-lg md:text-xl font-body font-light leading-relaxed mb-10 animate-fade-up opacity-0 delay-400" style={{ color: "#9A9390", maxWidth: "480px" }}>
            Единственный RP-проект по вселенной<br className="hidden sm:block" /> The Last Of Us в русскоязычном сегменте.<br />
            Мир захвачен кордицепсом. Каждый день — испытание.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up opacity-0 delay-500">
            <button onClick={onRegister} className="btn-primary gap-2 text-sm">
              <Icon name="UserPlus" size={16} />
              Зарегистрироваться
            </button>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-3 font-heading text-sm tracking-widest uppercase transition-all duration-300"
              style={{ border: "1px solid rgba(154,147,144,0.3)", color: "#9A9390" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#BA3F53"; (e.currentTarget as HTMLAnchorElement).style.color = "#BA3F53"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(154,147,144,0.3)"; (e.currentTarget as HTMLAnchorElement).style.color = "#9A9390"; }}
            >
              Узнать больше
            </a>
          </div>

          <div className="flex gap-8 mt-16 animate-fade-up opacity-0 delay-600">
            {[
              { val: "1", label: "Единственный TLOU RP" },
              { val: "24/7", label: "Онлайн" },
              { val: "100+", label: "Игровых событий" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-heading text-3xl font-bold text-white">{s.val}</div>
                <div className="text-xs tracking-wider mt-1" style={{ color: "#9A9390" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12 animate-pulse" style={{ background: "linear-gradient(to bottom, #BA3F53, transparent)" }} />
        <span className="text-[10px] tracking-widest uppercase font-heading" style={{ color: "#BA3F53" }}>Scroll</span>
      </div>
    </section>
  );
}

// --- About ---
function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(186,63,83,0.8) 0%, transparent 60%)" }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label">О проекте</p>
            <h2 className="section-title mb-6">Мир на грани<br /><span style={{ color: "#BA3F53" }}>выживания</span></h2>
            <div className="accent-line" />
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: "#9A9390" }}>
              DAY AFTER — это динамичный и атмосферный ролевой проект, который переносит тебя в постапокалиптическую вселенную The Last Of Us прямо в Garry's Mod.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: "#9A9390" }}>
              Опытная команда разработчиков воссоздала атмосферу игры до мельчайших деталей — уникальные карты, кастомные модели, написанные с нуля, и режим, которого ты не найдёшь больше нигде.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: "#9A9390" }}>
              Здесь ты не просто играешь — ты <span style={{ color: "#84994F" }}>проживаешь персонажа</span> в мире, где каждый день может стать последним.
            </p>
          </div>
          <div className="relative flex justify-center md:justify-end">
            {/* Фоновое свечение под артом */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(132,153,79,0.12) 0%, transparent 65%)" }} />
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/95220a86-5ef3-4f3a-b595-17cb404449a0/bucket/c54a2533-a861-4d84-a212-2d5a5263f62c.png"
                alt="Выживший в постапокалиптическом мире"
                className="w-full max-w-sm md:max-w-md object-contain relative z-10"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(132,153,79,0.25)) drop-shadow(0 0 80px rgba(186,63,83,0.12))",
                }}
              />
              {/* Статус сервера */}
              <div className="absolute bottom-6 left-0 z-20">
                <div className="flex items-center gap-2 px-3 py-1.5" style={{ background: "rgba(22,22,22,0.85)", border: "1px solid rgba(186,63,83,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#BA3F53" }} />
                  <span className="font-heading text-xs tracking-widest uppercase" style={{ color: "#BA3F53" }}>Сервер онлайн</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- UTP ---
const utpItems = [
  { icon: "Star", color: "#EAAD25", title: "Единственный в РУ-сегменте", desc: "Ни один другой проект в русскоязычном сообществе Garry's Mod не предлагает RP по вселенной The Last Of Us." },
  { icon: "Shield", color: "#84994F", title: "Опытная команда", desc: "Команда с многолетним опытом реализации RP-проектов. Мы знаем, как создать живой и работающий сервер." },
  { icon: "Zap", color: "#BA3F53", title: "Регулярные события", desc: "Еженедельные ивенты, сезонные мероприятия и уникальные игровые события, которые держат сообщество живым." },
  { icon: "Map", color: "#84994F", title: "Уникальная карта", desc: "Карта и режим созданы с нуля специально для DAY AFTER — ничего общего с типичными серверами." },
  { icon: "Layers", color: "#EAAD25", title: "Кастомные модели", desc: "Все игровые модели заказаны и созданы эксклюзивно для проекта — не взяты из мастерской Steam." },
  { icon: "Heart", color: "#BA3F53", title: "Уютное комьюнити", desc: "Люди, увлечённые тем же, что и ты. Не просто игроки — те, кто разделяет любовь к вселенной TLOU." },
];

function UTP() {
  return (
    <section id="utp" className="py-28" style={{ background: "#1a1a1a" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label">Почему мы</p>
          <h2 className="section-title">Уникальность <span style={{ color: "#BA3F53" }}>проекта</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {utpItems.map((item, i) => (
            <div key={i} className="card-dark p-8 relative group transition-all duration-300 hover:-translate-y-1" style={{ borderLeft: `3px solid ${item.color}` }}>
              <div className="mb-4 w-10 h-10 flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                <Icon name={item.icon} fallback="Star" size={18} style={{ color: item.color }} />
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-wider uppercase text-white mb-3">{item.title}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#9A9390" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Factions ---
const factions = [
  { name: "Выжившие", color: "#84994F", desc: "Обычные люди, сражающиеся за место под солнцем в жестоком мире. Ресурсы, безопасность и надежда — всё, что им нужно.", tag: "Нейтральные" },
  { name: "Военная зона", color: "#EAAD25", desc: "Остатки государственных структур. Жёсткая дисциплина, ресурсы и оружие. Порядок любой ценой.", tag: "Порядок" },
  { name: "Заражённые", color: "#BA3F53", desc: "Жертвы кордицепса. Не все потеряны — некоторые сохраняют частичное сознание в первые часы после заражения.", tag: "Опасность" },
];

function Factions() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label">Выбери сторону</p>
          <h2 className="section-title">Фракции</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {factions.map((f, i) => (
            <div key={i} className="relative overflow-hidden group cursor-pointer" style={{ background: "#1e1e1e", border: `1px solid ${f.color}20` }}>
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: f.color }} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-2">
                  <h3 className="font-heading text-2xl font-bold text-white tracking-wider uppercase">{f.name}</h3>
                  <span className="fraction-badge" style={{ color: f.color, borderColor: `${f.color}40`, background: `${f.color}10` }}>{f.tag}</span>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#9A9390" }}>{f.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 group-hover:opacity-100 opacity-0" style={{ background: `linear-gradient(to right, ${f.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Events ---
const events = [
  {
    title: "Рейд на склад федерации",
    desc: "Крупномасштабный штурм укреплённого склада. Две группы выживших против военного блокпоста. Победитель получает ресурсы и репутацию.",
    date: "2026-06-15T20:00:00",
    tag: "Боевой ивент",
    color: "#BA3F53",
  },
  {
    title: "Ночь заражённых",
    desc: "Специальный режим с повышенной активностью зомби. Выжить до рассвета — главная задача. Особые награды для выживших.",
    date: "2026-06-22T22:00:00",
    tag: "Хоррор-ночь",
    color: "#EAAD25",
  },
  {
    title: "Ярмарка выживших",
    desc: "Торговый ивент: обменивайся ресурсами, заключай союзы и укрепляй связи внутри комьюнити. Безопасная зона на весь день.",
    date: "2026-07-05T18:00:00",
    tag: "Социальный",
    color: "#84994F",
  },
];

function EventCard({ ev }: { ev: typeof events[0] }) {
  const t = useCountdown(ev.date);
  const dateStr = new Date(ev.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="event-card p-6 group">
      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <span className="text-[10px] font-heading tracking-widest uppercase px-3 py-1" style={{ background: `${ev.color}15`, border: `1px solid ${ev.color}30`, color: ev.color }}>{ev.tag}</span>
        <span className="text-xs font-body" style={{ color: "#5a5654" }}>{dateStr}</span>
      </div>
      <h3 className="font-heading text-xl font-bold text-white tracking-wider uppercase mb-3">{ev.title}</h3>
      <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#9A9390" }}>{ev.desc}</p>
      <div className="flex items-center gap-1 flex-wrap">
        <span className="text-[10px] font-heading tracking-widest uppercase mr-3" style={{ color: "#5a5654" }}>До старта:</span>
        <div className="flex items-center gap-3">
          <CountdownUnit val={t.d} label="дн" />
          <span className="font-heading text-xl" style={{ color: "#EAAD25" }}>:</span>
          <CountdownUnit val={t.h} label="ч" />
          <span className="font-heading text-xl" style={{ color: "#EAAD25" }}>:</span>
          <CountdownUnit val={t.m} label="мин" />
          <span className="font-heading text-xl" style={{ color: "#EAAD25" }}>:</span>
          <CountdownUnit val={t.s} label="сек" />
        </div>
      </div>
    </div>
  );
}

function Events() {
  return (
    <section id="events" className="py-28" style={{ background: "#1a1a1a" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label">Расписание</p>
          <h2 className="section-title">Предстоящие <span style={{ color: "#BA3F53" }}>события</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((ev, i) => <EventCard key={i} ev={ev} />)}
        </div>
        <p className="text-center mt-10 text-sm font-body" style={{ color: "#5a5654" }}>
          События проводятся регулярно — следи за анонсами в{" "}
          <a href="https://discord.gg/" target="_blank" rel="noopener" className="transition-colors hover:text-white" style={{ color: "#BA3F53" }}>Discord</a>
        </p>
      </div>
    </section>
  );
}

// --- FAQ ---
const faqs = [
  { q: "Что такое DAY AFTER?", a: "DAY AFTER — это ролевой сервер в Garry's Mod по вселенной The Last Of Us. Вы создаёте персонажа, проживаете его историю в постапокалиптическом мире, выстраиваете отношения с другими игроками." },
  { q: "Нужно ли покупать The Last Of Us?", a: "Нет. Для игры на нашем сервере нужен только Garry's Mod в Steam. Все необходимые ресурсы загружаются автоматически при подключении к серверу." },
  { q: "Как зарегистрироваться и попасть на сервер?", a: "Зарегистрируйтесь на сайте, привяжите Steam-аккаунт в личном кабинете — и вы получите доступ к серверу. IP-адрес будет указан в вашем профиле." },
  { q: "Это бесплатно?", a: "Да, базовый доступ к серверу абсолютно бесплатен. Игровые привилегии можно получить за участие в ивентах или через донат." },
  { q: "Есть ли место новичкам среди опытных игроков?", a: "Конечно. У нас есть стартовый квест и система наставничества. Опытные игроки помогут разобраться в механиках и погрузиться в атмосферу." },
  { q: "Как связаться с командой?", a: "Через Discord-сервер проекта — это основной канал связи. Там же публикуются все анонсы и обновления." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label">Вопросы и ответы</p>
          <h2 className="section-title">Частые <span style={{ color: "#BA3F53" }}>вопросы</span></h2>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-heading text-base md:text-lg font-medium tracking-wider uppercase text-white">{faq.q}</span>
                <Icon name={open === i ? "Minus" : "Plus"} size={16} style={{ color: "#BA3F53", flexShrink: 0 }} />
              </button>
              {open === i && (
                <div className="pb-5 font-body text-sm leading-relaxed animate-fade-up" style={{ color: "#9A9390" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Register Section ---
function Register() {
  const [form, setForm] = useState({ login: "", email: "", password: "", password2: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <section id="register" className="py-28 relative overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(132,153,79,0.6) 0%, transparent 60%)" }} />
      <div className="relative max-w-lg mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label">Вступить в ряды</p>
          <h2 className="section-title">Регистрация</h2>
          <p className="font-body text-sm mt-4" style={{ color: "#9A9390" }}>Создай аккаунт и получи доступ к серверу</p>
        </div>

        {submitted ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(186,63,83,0.1)", border: "1px solid rgba(186,63,83,0.3)" }}>
              <Icon name="CheckCircle" size={32} style={{ color: "#BA3F53" }} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white tracking-wider uppercase mb-3">Добро пожаловать</h3>
            <p className="font-body text-sm" style={{ color: "#9A9390" }}>Аккаунт создан. Теперь привяжи Steam в личном кабинете.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-heading tracking-widest uppercase mb-2" style={{ color: "#9A9390" }}>Логин</label>
              <input className="input-dark" type="text" placeholder="Твой никнейм" value={form.login} onChange={e => setForm({ ...form, login: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-heading tracking-widest uppercase mb-2" style={{ color: "#9A9390" }}>Email</label>
              <input className="input-dark" type="email" placeholder="survivor@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-heading tracking-widest uppercase mb-2" style={{ color: "#9A9390" }}>Пароль</label>
              <input className="input-dark" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-heading tracking-widest uppercase mb-2" style={{ color: "#9A9390" }}>Повторите пароль</label>
              <input className="input-dark" type="password" placeholder="••••••••" value={form.password2} onChange={e => setForm({ ...form, password2: e.target.value })} required />
            </div>
            <div className="pt-2">
              <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                <Icon name="UserPlus" size={18} />
                Создать аккаунт
              </button>
            </div>
            <p className="text-center text-xs font-body" style={{ color: "#5a5654" }}>
              Регистрируясь, вы соглашаетесь с{" "}
              <a href="#footer" className="hover:underline" style={{ color: "#BA3F53" }}>условиями использования</a>
            </p>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: "1px solid rgba(154,147,144,0.15)" }} />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs font-heading tracking-widest uppercase" style={{ background: "#1a1a1a", color: "#5a5654" }}>или войти через</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-3 font-heading text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80" style={{ border: "1px solid rgba(154,147,144,0.2)", color: "#9A9390" }}>
                <Icon name="Gamepad2" size={16} />
                Steam
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3 font-heading text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80" style={{ border: "1px solid rgba(154,147,144,0.2)", color: "#9A9390" }}>
                <Icon name="MessageSquare" size={16} />
                Discord
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  const socials = [
    { icon: "MessageSquare", label: "Discord", href: "https://discord.gg/" },
    { icon: "Send", label: "Telegram", href: "https://t.me/" },
    { icon: "Users", label: "ВКонтакте", href: "https://vk.com/" },
    { icon: "Youtube", label: "YouTube", href: "https://youtube.com/" },
  ];
  return (
    <footer id="footer" style={{ background: "#0e0e0e", borderTop: "1px solid rgba(132,153,79,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src="https://cdn.poehali.dev/projects/95220a86-5ef3-4f3a-b595-17cb404449a0/bucket/defde569-bc99-42f6-81e9-482e3a940414.png"
                alt="DAY AFTER"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#5a5654", maxWidth: "300px" }}>
              Единственный ролевой проект по The Last Of Us в русскоязычном Garry's Mod.
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" title={s.label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid rgba(154,147,144,0.15)", color: "#9A9390" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#BA3F53"; (e.currentTarget as HTMLAnchorElement).style.color = "#BA3F53"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(154,147,144,0.15)"; (e.currentTarget as HTMLAnchorElement).style.color = "#9A9390"; }}>
                  <Icon name={s.icon} fallback="Link" size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest uppercase mb-4 text-white">Навигация</h4>
            <ul className="space-y-3">
              {[
                { label: "О проекте", href: "#about" },
                { label: "Уникальность", href: "#utp" },
                { label: "События", href: "#events" },
                { label: "FAQ", href: "#faq" },
                { label: "Регистрация", href: "#register" },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="font-body text-sm transition-colors hover:text-white" style={{ color: "#5a5654" }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest uppercase mb-4 text-white">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://discord.gg/" target="_blank" rel="noopener" className="font-body text-sm transition-colors hover:text-white" style={{ color: "#5a5654" }}>Discord-сервер</a>
              </li>
              <li>
                <a href="mailto:admin@dayafter.gg" className="font-body text-sm transition-colors hover:text-white" style={{ color: "#5a5654" }}>admin@dayafter.gg</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(154,147,144,0.1)" }}>
          <p className="font-body text-xs" style={{ color: "#3a3836" }}>© 2025 DAY AFTER. Все права защищены.</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="font-body text-xs transition-colors hover:text-white" style={{ color: "#3a3836" }}>Политика конфиденциальности</a>
            <a href="#" className="font-body text-xs transition-colors hover:text-white" style={{ color: "#3a3836" }}>Условия использования</a>
            <a href="#" className="font-body text-xs transition-colors hover:text-white" style={{ color: "#3a3836" }}>Правила сервера</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Register Modal ---
function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ login: "", email: "", password: "", password2: "" });
  const [done, setDone] = useState(false);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.85)" }} />
      <div className="relative w-full max-w-md animate-fade-up" style={{ background: "#1e1e1e", border: "1px solid rgba(186,63,83,0.25)" }} onClick={e => e.stopPropagation()}>
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(to right, #BA3F53, #84994F)" }} />
        <button onClick={onClose} className="absolute top-4 right-4" style={{ color: "#9A9390" }}>
          <Icon name="X" size={18} />
        </button>
        <div className="p-8">
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(186,63,83,0.1)", border: "1px solid rgba(186,63,83,0.3)" }}>
                <Icon name="CheckCircle" size={32} style={{ color: "#BA3F53" }} />
              </div>
              <h3 className="font-heading text-2xl text-white tracking-wider uppercase mb-2">Добро пожаловать!</h3>
              <p className="font-body text-sm" style={{ color: "#9A9390" }}>Привяжи Steam в личном кабинете.</p>
              <button onClick={onClose} className="btn-primary mt-6 justify-center">Закрыть</button>
            </div>
          ) : (
            <>
              <h2 className="font-heading text-2xl font-bold text-white tracking-wider uppercase mb-6">Регистрация</h2>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setDone(true); }}>
                <input className="input-dark" type="text" placeholder="Логин" value={form.login} onChange={e => setForm({ ...form, login: e.target.value })} required />
                <input className="input-dark" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                <input className="input-dark" type="password" placeholder="Пароль" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <input className="input-dark" type="password" placeholder="Повторите пароль" value={form.password2} onChange={e => setForm({ ...form, password2: e.target.value })} required />
                <button type="submit" className="btn-primary w-full justify-center py-4">
                  <Icon name="UserPlus" size={16} />
                  Создать аккаунт
                </button>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button type="button" className="flex items-center justify-center gap-2 py-3 font-heading text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80" style={{ border: "1px solid rgba(154,147,144,0.2)", color: "#9A9390" }}>
                    <Icon name="Gamepad2" size={14} /> Steam
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 py-3 font-heading text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80" style={{ border: "1px solid rgba(154,147,144,0.2)", color: "#9A9390" }}>
                    <Icon name="MessageSquare" size={14} /> Discord
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Intro Screen ---
function IntroScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // fade-in: 0→800ms, hold: 800→2200ms, fade-out: 2200→3000ms
    const t1 = setTimeout(() => setPhase("hold"), 800);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(() => onDone(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "#0e0e0e",
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "in" ? "opacity 0.8s ease-out" : phase === "out" ? "opacity 0.9s ease-in" : "none",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      {/* Фоновый арт */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/95220a86-5ef3-4f3a-b595-17cb404449a0/bucket/af85c668-b3f0-45c2-adf7-1b6cd0396775.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.12, objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(186,63,83,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* Контент */}
      <div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "translateY(16px)" : "translateY(0)",
          transition: "opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s",
        }}
      >
        {/* Логотип */}
        <img
          src="https://cdn.poehali.dev/projects/95220a86-5ef3-4f3a-b595-17cb404449a0/bucket/defde569-bc99-42f6-81e9-482e3a940414.png"
          alt="DAY AFTER"
          className="h-32 md:h-44 w-auto object-contain"
          style={{ filter: "drop-shadow(0 0 60px rgba(186,63,83,0.3))" }}
        />

        {/* Слоган */}
        <p
          className="font-heading text-sm tracking-[0.4em] uppercase"
          style={{ color: "#BA3F53", opacity: phase === "hold" || phase === "out" ? 1 : 0, transition: "opacity 0.5s ease-out 0.6s" }}
        >
          Выжить. Решить. Надеяться.
        </p>

        {/* Прогресс-линия */}
        <div className="w-32 h-px overflow-hidden" style={{ background: "rgba(154,147,144,0.15)" }}>
          <div
            className="h-full"
            style={{
              background: "linear-gradient(to right, #BA3F53, #84994F)",
              width: phase === "hold" || phase === "out" ? "100%" : "0%",
              transition: "width 1.3s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// --- Main ---
export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  return (
    <div className="min-h-screen" style={{ background: "#161616" }}>
      {!introDone && <IntroScreen onDone={() => setIntroDone(true)} />}
      <Nav onRegister={() => setModalOpen(true)} />
      <Hero onRegister={() => setModalOpen(true)} />
      <About />
      <UTP />
      <Factions />
      <Events />
      <FAQ />
      <Register />
      <Footer />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}