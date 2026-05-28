import { useState } from "react";
import Icon from "@/components/ui/icon";

type Review = {
  id: number;
  freelancerId: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  project: string;
};

const INITIAL_REVIEWS: Review[] = [
  { id: 1, freelancerId: 1, author: "Сергей К.", avatar: "СК", rating: 5, text: "Алексей сделал потрясающий дизайн для нашего приложения. Всё точно в срок, никаких лишних правок.", date: "12 мая 2024", project: "Редизайн мобильного приложения" },
  { id: 2, freelancerId: 1, author: "Ольга М.", avatar: "ОМ", rating: 5, text: "Работали уже второй раз, снова доволен результатом. Профессионал своего дела.", date: "3 апреля 2024", project: "Брендинг стартапа" },
  { id: 3, freelancerId: 2, author: "Антон Р.", avatar: "АР", rating: 5, text: "Мария — лучший frontend-разработчик из тех, с кем я работал. Код чистый, производительность отличная.", date: "20 мая 2024", project: "Корпоративный сайт" },
  { id: 4, freelancerId: 3, author: "Виктор Н.", avatar: "ВН", rating: 4, text: "Дмитрий отлично справился с задачей, хотя пришлось немного подождать с финальной сдачей.", date: "8 мая 2024", project: "API для интернет-магазина" },
];

const FREELANCERS = [
  {
    id: 1,
    name: "Алексей Морозов",
    role: "UI/UX Дизайнер",
    avatar: "AM",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 3500,
    skills: ["Figma", "Branding", "Motion"],
    online: true,
    completed: 243,
    badge: "Топ-профи",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "Мария Соколова",
    role: "Frontend-разработчик",
    avatar: "МС",
    rating: 5.0,
    reviews: 89,
    hourlyRate: 4200,
    skills: ["React", "TypeScript", "Next.js"],
    online: true,
    completed: 156,
    badge: "Эксперт",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    name: "Дмитрий Волков",
    role: "Backend-разработчик",
    avatar: "ДВ",
    rating: 4.8,
    reviews: 214,
    hourlyRate: 5000,
    skills: ["Python", "PostgreSQL", "FastAPI"],
    online: false,
    completed: 312,
    badge: "Ветеран",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    name: "Анна Белова",
    role: "Копирайтер",
    avatar: "АБ",
    rating: 4.7,
    reviews: 63,
    hourlyRate: 1800,
    skills: ["SEO", "Контент", "SMM"],
    online: true,
    completed: 98,
    badge: "Восходящая",
    color: "from-green-500 to-teal-500",
  },
  {
    id: 5,
    name: "Игорь Петров",
    role: "Видеомонтажёр",
    avatar: "ИП",
    rating: 4.9,
    reviews: 177,
    hourlyRate: 2800,
    skills: ["Premiere", "After Effects", "DaVinci"],
    online: false,
    completed: 201,
    badge: "Топ-профи",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 6,
    name: "Светлана Ким",
    role: "3D-моделлер",
    avatar: "СК",
    rating: 4.6,
    reviews: 41,
    hourlyRate: 4800,
    skills: ["Blender", "Cinema 4D", "ZBrush"],
    online: true,
    completed: 74,
    badge: "Новый",
    color: "from-pink-500 to-rose-500",
  },
];

const PROJECTS = [
  { id: 1, title: "Разработка мобильного приложения", budget: "150 000 ₽", deadline: "30 дней", bids: 12, category: "Разработка", urgent: true },
  { id: 2, title: "Дизайн корпоративного сайта", budget: "80 000 ₽", deadline: "14 дней", bids: 7, category: "Дизайн", urgent: false },
  { id: 3, title: "SEO-оптимизация интернет-магазина", budget: "35 000 ₽", deadline: "21 день", bids: 19, category: "Маркетинг", urgent: false },
  { id: 4, title: "Написание бизнес-плана стартапа", budget: "45 000 ₽", deadline: "10 дней", bids: 5, category: "Аналитика", urgent: true },
];

const CATEGORIES = ["Все", "Разработка", "Дизайн", "Маркетинг", "Контент", "Видео", "3D"];

const MESSAGES = [
  { id: 1, name: "Алексей М.", text: "Привет! Видел ваш проект, готов обсудить детали", time: "сейчас", unread: 2, avatar: "AM", color: "from-purple-500 to-pink-500" },
  { id: 2, name: "Мария С.", text: "Выслала правки по макету, посмотрите когда удобно", time: "5 мин", unread: 0, avatar: "МС", color: "from-cyan-500 to-blue-500" },
  { id: 3, name: "Команда Hub", text: "Ваш платёж успешно обработан", time: "1 ч", unread: 1, avatar: "HB", color: "from-violet-500 to-purple-500" },
];

const STATS = [
  { label: "Фрилансеров", value: "12 400+", icon: "Users" },
  { label: "Проектов выполнено", value: "89 200+", icon: "CheckCircle" },
  { label: "Выплачено", value: "₽ 2.3 млрд", icon: "TrendingUp" },
  { label: "Средний рейтинг", value: "4.87", icon: "Star" },
];

type Section = "home" | "catalog" | "projects" | "chat" | "contact";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 star-rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ opacity: s <= Math.round(rating) ? 1 : 0.3 }}>★</span>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-all duration-100"
          style={{ color: s <= (hovered || value) ? "#fbbf24" : "rgba(255,255,255,0.15)", filter: s <= (hovered || value) ? "drop-shadow(0 0 6px rgba(251,191,36,0.7))" : "none" }}
        >★</button>
      ))}
    </div>
  );
}

function ReviewModal({
  freelancer,
  reviews,
  onClose,
  onSubmit,
}: {
  freelancer: typeof FREELANCERS[0];
  reviews: Review[];
  onClose: () => void;
  onSubmit: (r: Omit<Review, "id">) => void;
}) {
  const [tab, setTab] = useState<"list" | "form">("list");
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [project, setProject] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const myReviews = reviews.filter(r => r.freelancerId === freelancer.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    onSubmit({
      freelancerId: freelancer.id,
      author: author.trim(),
      avatar: author.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      project: project.trim() || "Без названия",
    });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTab("list"); setAuthor(""); setText(""); setProject(""); setRating(5); }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg glass rounded-3xl overflow-hidden animate-fade-in"
        style={{ border: "1px solid rgba(168,85,247,0.2)" }}>
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${freelancer.color} flex items-center justify-center font-bold text-white text-sm`}>
              {freelancer.avatar}
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-white">{freelancer.name}</h3>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{freelancer.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl transition-all hover:bg-white/10">
            <Icon name="X" size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5">
          {[
            { key: "list", label: `Отзывы (${myReviews.length})` },
            { key: "form", label: "Написать отзыв" },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as "list" | "form")}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${tab === t.key ? "text-purple-400 border-b-2 border-purple-500" : "text-gray-500 hover:text-gray-300"}`}
              style={{ marginBottom: "-1px" }}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {tab === "list" && (
            <div className="flex flex-col gap-4">
              {myReviews.length === 0 ? (
                <div className="text-center py-10">
                  <Icon name="MessageSquare" size={36} className="mx-auto mb-3 text-gray-700" />
                  <p className="text-gray-500">Отзывов пока нет</p>
                  <button onClick={() => setTab("form")} className="mt-3 text-purple-400 text-sm hover:text-purple-300 transition-colors">
                    Стать первым →
                  </button>
                </div>
              ) : myReviews.map(review => (
                <div key={review.id} className="glass rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                        {review.avatar}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{review.author}</p>
                        <p className="text-[11px]" style={{ color: "hsl(var(--muted-foreground))" }}>{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 star-rating text-sm">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} style={{ opacity: s <= review.rating ? 1 : 0.2 }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/80 mb-2">{review.text}</p>
                  <p className="text-xs px-2.5 py-1 rounded-full inline-block"
                    style={{ background: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}>
                    {review.project}
                  </p>
                </div>
              ))}
            </div>
          )}

          {tab === "form" && (
            submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "rgba(34,197,94,0.15)" }}>
                  <Icon name="CheckCircle" size={32} className="text-green-400" />
                </div>
                <h4 className="font-montserrat font-bold text-white text-lg mb-1">Отзыв опубликован!</h4>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Спасибо за обратную связь</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "hsl(var(--muted-foreground))" }}>ОЦЕНКА</label>
                  <StarPicker value={rating} onChange={setRating} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "hsl(var(--muted-foreground))" }}>ВАШЕ ИМЯ</label>
                  <input value={author} onChange={e => setAuthor(e.target.value)} required
                    placeholder="Иван Петров"
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm transition-all focus:border-purple-500/50"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "hsl(var(--muted-foreground))" }}>НАЗВАНИЕ ПРОЕКТА <span className="opacity-50">(необязательно)</span></label>
                  <input value={project} onChange={e => setProject(e.target.value)}
                    placeholder="Разработка лендинга"
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm transition-all focus:border-purple-500/50"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "hsl(var(--muted-foreground))" }}>ОТЗЫВ</label>
                  <textarea value={text} onChange={e => setText(e.target.value)} required rows={4}
                    placeholder="Расскажите о своём опыте работы..."
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm resize-none transition-all focus:border-purple-500/50"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                </div>
                <button type="submit" className="btn-gradient py-3 rounded-xl font-semibold text-sm relative z-10 w-full">
                  Опубликовать отзыв
                </button>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function FreelancerCard({ f, reviews, onReviewClick }: { f: typeof FREELANCERS[0]; reviews: Review[]; onReviewClick: () => void }) {
  const myReviews = reviews.filter(r => r.freelancerId === f.id);
  const totalReviews = f.reviews + myReviews.length;
  const totalRating = myReviews.length > 0
    ? ((f.rating * f.reviews + myReviews.reduce((s, r) => s + r.rating, 0)) / totalReviews).toFixed(1)
    : f.rating.toFixed(1);

  return (
    <div className="glass-hover rounded-2xl p-5 cursor-pointer animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center font-montserrat font-bold text-white text-sm`}>
              {f.avatar}
            </div>
            {f.online && <div className="neon-dot absolute -bottom-0.5 -right-0.5" />}
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">{f.name}</h3>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{f.role}</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.25)" }}>
          {f.badge}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={parseFloat(totalRating)} />
        <span className="text-white font-semibold text-sm">{totalRating}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onReviewClick(); }}
          className="text-xs transition-colors hover:text-purple-300"
          style={{ color: "hsl(var(--muted-foreground))" }}>
          ({totalReviews} отзывов)
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {f.skills.map((s) => <span key={s} className="tag">{s}</span>)}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>от</p>
          <p className="font-montserrat font-bold text-white">{f.hourlyRate.toLocaleString()} ₽<span className="text-xs font-normal" style={{ color: "hsl(var(--muted-foreground))" }}>/час</span></p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onReviewClick(); }}
            className="btn-outline-glow text-xs px-3 py-2 rounded-xl font-semibold flex items-center gap-1">
            <Icon name="Star" size={12} fallback="Circle" />
            Отзыв
          </button>
          <button className="btn-gradient text-xs px-4 py-2 rounded-xl font-semibold relative z-10">
            Связаться
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [filterCategory, setFilterCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [reviewModal, setReviewModal] = useState<typeof FREELANCERS[0] | null>(null);

  const handleAddReview = (r: Omit<Review, "id">) => {
    setReviews(prev => [...prev, { ...r, id: Date.now() }]);
  };

  const filteredFreelancers = FREELANCERS.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "Все" || f.skills.some(s =>
      filterCategory === "Разработка" ? ["React", "TypeScript", "Next.js", "Python", "PostgreSQL", "FastAPI"].includes(s) :
      filterCategory === "Дизайн" ? ["Figma", "Branding"].includes(s) :
      filterCategory === "Видео" ? ["Premiere", "After Effects", "DaVinci"].includes(s) :
      filterCategory === "3D" ? ["Blender", "Cinema 4D", "ZBrush"].includes(s) :
      filterCategory === "Маркетинг" ? ["SEO", "SMM"].includes(s) :
      filterCategory === "Контент" ? ["Контент", "SEO"].includes(s) : true
    );
    return matchesSearch && matchesCategory;
  });

  const navItems: { key: Section; label: string; icon: string }[] = [
    { key: "home", label: "Главная", icon: "Home" },
    { key: "catalog", label: "Каталог", icon: "Users" },
    { key: "projects", label: "Проекты", icon: "Briefcase" },
    { key: "chat", label: "Чат", icon: "MessageCircle" },
    { key: "contact", label: "Поддержка", icon: "Headphones" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <span className="text-white font-montserrat font-black text-sm relative z-10">F</span>
            </div>
            <span className="font-montserrat font-bold text-white text-lg">Freelance<span className="gradient-text">Hub</span></span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`nav-link px-4 py-2 rounded-lg transition-all ${activeSection === item.key ? "active bg-purple-500/10" : "hover:bg-white/5"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:block btn-outline-glow text-sm px-4 py-2 rounded-xl font-semibold">
              Войти
            </button>
            <button className="btn-gradient text-sm px-4 py-2 rounded-xl font-semibold relative z-10">
              Регистрация
            </button>
            <button className="md:hidden p-2 rounded-lg glass" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} className="text-white" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeSection === item.key ? "bg-purple-500/15 text-purple-400" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon name={item.icon} size={18} fallback="Circle" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="pt-16">
        {/* HOME */}
        {activeSection === "home" && (
          <div>
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl"
                  style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
                  style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
                  style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm"
                    style={{ color: "hsl(var(--accent))" }}>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    12 400+ профессионалов онлайн
                  </div>

                  <h1 className="font-montserrat font-black text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-white">
                    Найди лучших<br />
                    <span className="gradient-text">фрилансеров</span><br />
                    для проекта
                  </h1>

                  <p className="text-lg mb-10" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Разработчики, дизайнеры, маркетологи — все специалисты на одной платформе
                    с гарантией качества и безопасными сделками
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-gradient px-8 py-4 rounded-2xl font-montserrat font-bold text-lg relative z-10"
                      onClick={() => setActiveSection("catalog")}>
                      Найти специалиста
                    </button>
                    <button className="btn-outline-glow px-8 py-4 rounded-2xl font-montserrat font-bold text-lg"
                      onClick={() => setActiveSection("projects")}>
                      Разместить проект
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {STATS.map((stat, i) => (
                    <div key={i} className="glass rounded-2xl p-6 text-center">
                      <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                        style={{ background: "rgba(168,85,247,0.15)" }}>
                        <Icon name={stat.icon} size={20} fallback="Circle" className="text-purple-400" />
                      </div>
                      <p className="font-montserrat font-black text-2xl text-white mb-1">{stat.value}</p>
                      <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="section-title text-white mb-2">Топ специалисты</h2>
                    <p style={{ color: "hsl(var(--muted-foreground))" }}>Лучшие по отзывам этой недели</p>
                  </div>
                  <button className="btn-outline-glow px-5 py-2.5 rounded-xl text-sm font-semibold hidden sm:block"
                    onClick={() => setActiveSection("catalog")}>
                    Смотреть всех →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {FREELANCERS.slice(0, 3).map((f) => <FreelancerCard key={f.id} f={f} reviews={reviews} onReviewClick={() => setReviewModal(f)} />)}
                </div>
              </div>
            </section>

            <section className="py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 className="section-title text-white text-center mb-3">Как это работает</h2>
                <p className="text-center mb-14" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Три шага до успешного проекта
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { step: "01", title: "Разместите задачу", desc: "Опишите проект, укажите бюджет и дедлайн. Это займёт 5 минут.", icon: "PenLine" },
                    { step: "02", title: "Выберите специалиста", desc: "Получайте заявки от проверенных фрилансеров и выбирайте лучшего.", icon: "UserCheck" },
                    { step: "03", title: "Получите результат", desc: "Оплата переходит фрилансеру только после вашего одобрения.", icon: "ShieldCheck" },
                  ].map((item, i) => (
                    <div key={i} className="glass rounded-2xl p-8 relative overflow-hidden">
                      <div className="absolute top-4 right-4 font-montserrat font-black text-5xl opacity-5 text-white">{item.step}</div>
                      <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center btn-gradient relative">
                        <Icon name={item.icon} size={22} fallback="Circle" className="text-white relative z-10" />
                      </div>
                      <h3 className="font-montserrat font-bold text-white text-xl mb-3">{item.title}</h3>
                      <p style={{ color: "hsl(var(--muted-foreground))" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="glass rounded-3xl p-10 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30"
                    style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.2) 100%)" }} />
                  <div className="relative z-10">
                    <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-4">
                      Безопасные платежи<br />
                      <span className="gradient-text">через эскроу-систему</span>
                    </h2>
                    <p className="mb-8 text-lg" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Интеграция с Stripe, ЮKassa, T-Pay и другими платёжными системами.<br />
                      Ваши деньги под защитой до сдачи проекта.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {["Stripe", "ЮKassa", "T-Pay", "СБП"].map((p) => (
                        <span key={p} className="glass px-5 py-2.5 rounded-xl text-white font-semibold text-sm">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CATALOG */}
        {activeSection === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-10">
              <h1 className="font-montserrat font-black text-4xl text-white mb-2">Каталог специалистов</h1>
              <p style={{ color: "hsl(var(--muted-foreground))" }}>Найдите идеального исполнителя для вашей задачи</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Найти по имени или специализации..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full glass rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
              <div className="relative">
                <Icon name="SlidersHorizontal" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <select className="glass rounded-xl pl-11 pr-8 py-3 text-white outline-none appearance-none cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                  <option style={{ background: "#0f0f1a" }}>По рейтингу</option>
                  <option style={{ background: "#0f0f1a" }}>По цене (возр.)</option>
                  <option style={{ background: "#0f0f1a" }}>По цене (убыв.)</option>
                  <option style={{ background: "#0f0f1a" }}>Только онлайн</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterCategory === cat
                      ? "btn-gradient text-white"
                      : "glass text-gray-400 hover:text-white"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFreelancers.length > 0
                ? filteredFreelancers.map((f) => <FreelancerCard key={f.id} f={f} reviews={reviews} onReviewClick={() => setReviewModal(f)} />)
                : (
                  <div className="col-span-3 text-center py-20">
                    <Icon name="SearchX" size={48} className="mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-500 text-lg">Специалисты не найдены</p>
                    <button className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
                      onClick={() => { setSearchQuery(""); setFilterCategory("Все"); }}>
                      Сбросить фильтры
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeSection === "projects" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
              <div>
                <h1 className="font-montserrat font-black text-4xl text-white mb-2">Активные проекты</h1>
                <p style={{ color: "hsl(var(--muted-foreground))" }}>Найдите задачу по своей специализации</p>
              </div>
              <button className="btn-gradient px-6 py-3 rounded-xl font-semibold relative z-10">
                + Разместить проект
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {PROJECTS.map((project) => (
                <div key={project.id} className="glass-hover rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-montserrat font-bold text-white text-lg">{project.title}</h3>
                        {project.urgent && (
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" }}>
                            Срочно
                          </span>
                        )}
                        <span className="tag">{project.category}</span>
                      </div>
                      <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                          <Icon name="Wallet" size={14} fallback="Circle" />
                          <span className="text-white font-semibold">{project.budget}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                          <Icon name="Clock" size={14} fallback="Circle" />
                          {project.deadline}
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                          <Icon name="Users" size={14} fallback="Circle" />
                          {project.bids} откликов
                        </div>
                      </div>
                    </div>
                    <button className="btn-gradient px-5 py-2.5 rounded-xl text-sm font-semibold relative z-10 whitespace-nowrap">
                      Откликнуться
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 glass rounded-2xl p-10 text-center">
              <Icon name="Briefcase" size={40} className="mx-auto mb-4 text-purple-500/50" />
              <h3 className="font-montserrat font-bold text-white text-xl mb-2">Разместите свой проект</h3>
              <p className="mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
                Получайте отклики от проверенных специалистов уже через несколько минут
              </p>
              <button className="btn-gradient px-8 py-3 rounded-xl font-semibold relative z-10">
                Создать проект бесплатно
              </button>
            </div>
          </div>
        )}

        {/* CHAT */}
        {activeSection === "chat" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="font-montserrat font-black text-4xl text-white mb-8">Сообщения</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-[600px]">
              <div className="glass rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/5">
                  <div className="relative">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input placeholder="Поиск чатов..." className="w-full glass rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }} />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {MESSAGES.map((msg) => (
                    <div key={msg.id}
                      onClick={() => setActiveChat(msg.id)}
                      className={`flex items-center gap-3 p-4 cursor-pointer transition-all border-b border-white/5 ${
                        activeChat === msg.id ? "bg-purple-500/10" : "hover:bg-white/5"
                      }`}>
                      <div className="relative flex-shrink-0">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${msg.color} flex items-center justify-center font-bold text-white text-xs`}>
                          {msg.avatar}
                        </div>
                        {msg.unread > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                            style={{ background: "#7c3aed" }}>
                            {msg.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-white text-sm font-semibold truncate">{msg.name}</p>
                          <p className="text-xs flex-shrink-0" style={{ color: "hsl(var(--muted-foreground))" }}>{msg.time}</p>
                        </div>
                        <p className="text-xs truncate mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 glass rounded-2xl flex flex-col overflow-hidden">
                {activeChat ? (() => {
                  const msg = MESSAGES.find(m => m.id === activeChat)!;
                  return (
                    <>
                      <div className="p-4 border-b border-white/5 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${msg.color} flex items-center justify-center font-bold text-white text-xs`}>
                          {msg.avatar}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{msg.name}</p>
                          <p className="text-xs text-green-400">онлайн</p>
                        </div>
                      </div>

                      <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
                        <div className="flex justify-start">
                          <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 max-w-[75%]">
                            <p className="text-white text-sm">Привет! Видел ваш проект, готов обсудить детали. Когда удобно созвониться?</p>
                            <p className="text-[10px] mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>14:32</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]"
                            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.3))", border: "1px solid rgba(168,85,247,0.3)" }}>
                            <p className="text-white text-sm">Привет! Сегодня после 18:00 буду свободен</p>
                            <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>14:35</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 max-w-[75%]">
                            <p className="text-white text-sm">Отлично, договорились! Пришлю ссылку на звонок</p>
                            <p className="text-[10px] mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>14:36</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-white/5 flex gap-3">
                        <input placeholder="Написать сообщение..."
                          className="flex-1 glass rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none text-sm"
                          style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                        <button className="btn-gradient w-11 h-11 rounded-xl flex items-center justify-center relative z-10">
                          <Icon name="Send" size={18} className="text-white relative z-10" />
                        </button>
                      </div>
                    </>
                  );
                })() : (
                  <div className="flex-1 flex items-center justify-center flex-col gap-3">
                    <Icon name="MessageCircle" size={48} className="text-gray-600" />
                    <p className="text-gray-500">Выберите чат для общения</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-montserrat font-bold text-white text-xl mb-4">Уведомления</h2>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "Star", color: "text-yellow-400", bg: "rgba(251,191,36,0.1)", text: "Алексей М. оставил отзыв на ваш проект", time: "5 мин назад" },
                  { icon: "CheckCircle", color: "text-green-400", bg: "rgba(34,197,94,0.1)", text: "Платёж 45 000 ₽ успешно зачислен", time: "1 час назад" },
                  { icon: "Briefcase", color: "text-purple-400", bg: "rgba(168,85,247,0.1)", text: "Новый отклик на проект «Дизайн сайта»", time: "2 часа назад" },
                ].map((notif, i) => (
                  <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: notif.bg }}>
                      <Icon name={notif.icon} size={18} fallback="Bell" className={notif.color} />
                    </div>
                    <p className="flex-1 text-sm text-white">{notif.text}</p>
                    <p className="text-xs flex-shrink-0" style={{ color: "hsl(var(--muted-foreground))" }}>{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeSection === "contact" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-12">
              <h1 className="font-montserrat font-black text-4xl text-white mb-3">Поддержка</h1>
              <p style={{ color: "hsl(var(--muted-foreground))" }}>Мы всегда готовы помочь — среднее время ответа 5 минут</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {[
                { icon: "MessageSquare", title: "Живой чат", desc: "Отвечаем за 5 минут", action: "Открыть чат", color: "from-purple-500 to-pink-500" },
                { icon: "Mail", title: "Email", desc: "support@freelancehub.ru", action: "Написать", color: "from-cyan-500 to-blue-500" },
                { icon: "Phone", title: "Телефон", desc: "+7 (800) 555-0100", action: "Позвонить", color: "from-green-500 to-teal-500" },
              ].map((contact, i) => (
                <div key={i} className="glass-hover rounded-2xl p-6 text-center cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon name={contact.icon} size={24} fallback="Circle" className="text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-white mb-1">{contact.title}</h3>
                  <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>{contact.desc}</p>
                  <button className="btn-outline-glow px-5 py-2 rounded-xl text-sm font-semibold w-full">{contact.action}</button>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-8 mb-5">
              <h2 className="font-montserrat font-bold text-white text-2xl mb-6">Частые вопросы</h2>
              <div className="flex flex-col gap-4">
                {[
                  { q: "Как работает защита платежей?", a: "Деньги хранятся на эскроу-счёте и переходят фрилансеру только после вашего подтверждения выполненной работы." },
                  { q: "Как проверяются фрилансеры?", a: "Каждый специалист проходит верификацию документов и тестовое задание. Рейтинг формируется из реальных отзывов заказчиков." },
                  { q: "Какая комиссия платформы?", a: "Для заказчиков — 0%. Для фрилансеров — 8% от суммы успешно завершённых проектов." },
                  { q: "Можно ли получить возврат?", a: "Да, если фрилансер не выполнил работу, средства возвращаются на ваш счёт в течение 1-3 рабочих дней." },
                ].map((item, i) => (
                  <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Icon name="ChevronRight" size={16} className="text-purple-400" />
                      {item.q}
                    </h4>
                    <p className="text-sm pl-6" style={{ color: "hsl(var(--muted-foreground))" }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-montserrat font-bold text-white text-2xl mb-6">Написать нам</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: "hsl(var(--muted-foreground))" }}>Имя</label>
                  <input placeholder="Иван Иванов" className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: "hsl(var(--muted-foreground))" }}>Email</label>
                  <input placeholder="ivan@email.ru" className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block" style={{ color: "hsl(var(--muted-foreground))" }}>Сообщение</label>
                <textarea rows={4} placeholder="Опишите ваш вопрос..." className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-sm resize-none"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
              <button className="btn-gradient px-8 py-3 rounded-xl font-semibold relative z-10">
                Отправить сообщение
              </button>
            </div>
          </div>
        )}
      </div>

      {reviewModal && (
        <ReviewModal
          freelancer={reviewModal}
          reviews={reviews}
          onClose={() => setReviewModal(null)}
          onSubmit={handleAddReview}
        />
      )}

      <footer className="border-t border-white/5 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg btn-gradient flex items-center justify-center">
                <span className="text-white font-montserrat font-black text-xs relative z-10">F</span>
              </div>
              <span className="font-montserrat font-bold text-white">Freelance<span className="gradient-text">Hub</span></span>
            </div>
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              © 2024 FreelanceHub. Все права защищены.
            </p>
            <div className="flex gap-6">
              {["Условия", "Конфиденциальность", "Помощь"].map((link) => (
                <button key={link} className="text-sm nav-link">{link}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}