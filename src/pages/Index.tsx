import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PHONE_IMG = "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/files/f49ceab6-9f98-4b41-8c14-e7999b64a7ee.jpg";

const features = [
  {
    icon: "ShieldCheck",
    color: "#FF6B2B",
    title: "Рекомендации по безопасности",
    desc: "Предоставляет рекомендации по личной безопасности. Показывает интерактивную карту с ближайшими убежищами и укрытиями.",
    tag: "Безопасность",
  },
  {
    icon: "Newspaper",
    color: "#1A56DB",
    title: "Актуальные новости и события региона",
    desc: "Лента актуальных новостей Краснодарского края. Мероприятия, анонсы, важные объявления прямо в приложении.",
    tag: "Новости",
  },
  {
    icon: "Bell",
    color: "#0EA5E9",
    title: "Уведомления, штрафы, налоги и госпошлины",
    desc: "Получайте уведомления о задолженностях и платежах. Оплачивайте штрафы и налоги в два касания.",
    tag: "Уведомления",
  },
  {
    icon: "Building2",
    color: "#7C3AED",
    title: "Муниципальные и региональные услуги",
    desc: "Полный каталог государственных и муниципальных услуг. Подавайте заявления и отслеживайте статус онлайн.",
    tag: "Услуги",
  },
  {
    icon: "MapPin",
    color: "#059669",
    title: "Интерактивная карта региона",
    desc: "Карта с объектами инфраструктуры, учреждениями, транспортом. Навигация и ближайшие сервисы рядом с вами.",
    tag: "Карта",
  },
  {
    icon: "Users",
    color: "#D97706",
    title: "Личный кабинет жителя",
    desc: "Ваши документы, история обращений и персональные данные в одном месте. Безопасно и удобно.",
    tag: "Профиль",
  },
];

const carouselSlides = [
  {
    icon: "Bell",
    color: "#1A56DB",
    title: "Уведомления",
    screen: "Штрафы и налоги",
    desc: "Все важные уведомления в одном месте — штрафы ГИБДД, налоги, коммунальные платежи",
    items: ["Штраф ГИБДД: 500 ₽", "Налог на имущество: 3 420 ₽", "Налог на транспорт: 1 200 ₽"],
  },
  {
    icon: "ShieldCheck",
    color: "#FF6B2B",
    title: "Безопасность",
    screen: "Карта укрытий",
    desc: "Интерактивная карта ближайших убежищ, аптек, больниц и экстренных служб",
    items: ["Укрытие: 0.3 км", "Больница: 1.2 км", "Полиция: 0.8 км"],
  },
  {
    icon: "Building2",
    color: "#7C3AED",
    title: "Услуги",
    screen: "Каталог услуг",
    desc: "Более 200 государственных и муниципальных услуг без очередей и поездок в офис",
    items: ["МФЦ онлайн", "Загранпаспорт", "Справка о доходах"],
  },
  {
    icon: "Newspaper",
    color: "#059669",
    title: "Новости",
    screen: "Лента событий",
    desc: "Новости Кубани, события вашего города и района в режиме реального времени",
    items: ["Городские события", "Официальные новости", "Афиша мероприятий"],
  },
];

const navItems = [
  { label: "Услуги", target: "features" },
  { label: "Уведомления", target: "carousel" },
  { label: "Безопасность", target: "carousel" },
  { label: "Новости и события", target: "carousel" },
];

export default function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", surname: "", phone: "", email: "", comment: "",
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((p) => (p + 1) % carouselSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
  };

  return (
    <div className="min-h-screen font-[Golos_Text,sans-serif] overflow-x-hidden">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #FF6B2B, #FF8C55)" }}>
                <Icon name="MapPin" size={20} className="text-white" />
              </div>
              <div>
                <div className={`font-bold text-lg leading-tight ${isScrolled ? "text-gray-900" : "text-white"}`}>
                  Моя Кубань
                </div>
                <div className={`text-xs leading-tight hidden sm:block ${isScrolled ? "text-gray-500" : "text-blue-100"}`}>
                  Единый цифровой сервис
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isScrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* App Store buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="#"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 ${
                  isScrolled
                    ? "bg-gray-900 text-white"
                    : "bg-white/15 text-white backdrop-blur-sm border border-white/20"
                }`}
              >
                <Icon name="Apple" size={16} />
                App Store
              </a>
              <a
                href="#"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 ${
                  isScrolled
                    ? "bg-green-600 text-white"
                    : "bg-white/15 text-white backdrop-blur-sm border border-white/20"
                }`}
              >
                <Icon name="Smartphone" size={16} />
                Google Play
              </a>
            </div>

            <button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} className={isScrolled ? "text-gray-700" : "text-white"} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white rounded-2xl shadow-xl mb-4 p-4 animate-fade-in-up">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  className="block w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-blue-50 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                <a href="#" className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-semibold">
                  <Icon name="Apple" size={16} /> App Store
                </a>
                <a href="#" className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold">
                  <Icon name="Smartphone" size={16} /> Google Play
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden noise-overlay" style={{ background: "linear-gradient(135deg, #0B1E5B 0%, #1A56DB 45%, #0EA5E9 100%)" }}>
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(79,131,232,0.2)" }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,107,43,0.15)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 text-sm mb-6 animate-fade-in-up" style={{ background: "rgba(255,255,255,0.1)" }}>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Официальное приложение Краснодарского края
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 animate-fade-in-up delay-100">
                Моя<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #FF6B2B, #FFB347)" }}>
                  Кубань
                </span>
              </h1>
              <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg animate-fade-in-up delay-200">
                Единый цифровой сервис для жителей Кубани. Госуслуги, безопасность, новости и уведомления — всё в одном приложении.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                <a href="#" className="flex items-center justify-center gap-3 bg-white text-gray-900 font-bold px-6 py-4 rounded-2xl hover:scale-105 transition-transform shadow-xl">
                  <Icon name="Apple" size={22} />
                  <div className="text-left">
                    <div className="text-xs text-gray-500 leading-none">Загрузить в</div>
                    <div className="text-sm font-bold leading-tight">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-center gap-3 border-2 border-white/30 text-white font-bold px-6 py-4 rounded-2xl hover:scale-105 transition-all" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Icon name="Smartphone" size={22} />
                  <div className="text-left">
                    <div className="text-xs text-blue-200 leading-none">Загрузить в</div>
                    <div className="text-sm font-bold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>

              <div className="flex gap-8 mt-12 animate-fade-in-up delay-400">
                {[{ num: "200+", label: "Услуг" }, { num: "5,7M", label: "Жителей Кубани" }, { num: "24/7", label: "Работает" }].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-white">{stat.num}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center animate-float">
              <div className="relative">
                <div className="absolute inset-0 rounded-[2.5rem] blur-2xl scale-110 animate-pulse-glow" style={{ background: "rgba(79,131,232,0.3)" }} />
                <div className="relative w-72 h-[520px] bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl border border-white/20">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
                    <img src={PHONE_IMG} alt="Моя Кубань приложение" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80H1440V40C1440 40 1200 0 720 0C240 0 0 40 0 40V80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Возможности приложения
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Всё что нужно — в одном месте
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Приложение «Моя Кубань» объединяет ключевые городские сервисы для комфортной жизни жителей региона
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="reveal group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ background: f.color, transform: "translate(30%, -30%)" }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md" style={{ backgroundColor: f.color + "18" }}>
                  <Icon name={f.icon} size={24} style={{ color: f.color }} />
                </div>
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3" style={{ backgroundColor: f.color + "18", color: f.color }}>
                  {f.tag}
                </span>
                <h3 className="text-gray-900 font-bold text-base mb-2 leading-snug">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      <section id="carousel" className="py-20" style={{ background: "linear-gradient(180deg, #F0F6FF 0%, #FFFFFF 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <span className="inline-block bg-orange-50 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Функции приложения
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Как это работает</h2>
            <p className="text-gray-500 text-lg">Удобный интерфейс для каждого раздела</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {carouselSlides.map((slide, i) => (
                <button
                  key={slide.title}
                  onClick={() => setActiveSlide(i)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                    activeSlide === i ? "shadow-xl scale-[1.02]" : "bg-white hover:bg-gray-50 border border-gray-100"
                  }`}
                  style={activeSlide === i ? { background: slide.color, color: "white" } : {}}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: activeSlide === i ? "rgba(255,255,255,0.2)" : slide.color + "18" }}
                    >
                      <Icon name={slide.icon} size={20} style={{ color: activeSlide === i ? "white" : slide.color }} />
                    </div>
                    <div>
                      <div className={`font-bold text-base ${activeSlide === i ? "text-white" : "text-gray-900"}`}>{slide.title}</div>
                      <div className={`text-sm mt-0.5 ${activeSlide === i ? "text-white/80" : "text-gray-500"}`}>{slide.desc}</div>
                    </div>
                  </div>
                  {activeSlide === i && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {slide.items.map((item) => (
                        <span key={item} className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg font-medium">{item}</span>
                      ))}
                    </div>
                  )}
                </button>
              ))}

              <div className="flex gap-2 pt-2 justify-center">
                {carouselSlides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className="rounded-full transition-all duration-300"
                    style={{ width: activeSlide === i ? 24 : 8, height: 8, backgroundColor: activeSlide === i ? slide.color : "#E2E8F0" }}
                  />
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center reveal">
              <div className="relative w-64 h-[460px]">
                <div
                  className="absolute inset-0 rounded-[2.5rem] blur-2xl scale-105 transition-all duration-500 opacity-40"
                  style={{ backgroundColor: carouselSlides[activeSlide].color }}
                />
                <div className="relative w-full h-full bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                  <div
                    className="w-full h-full rounded-[2rem] overflow-hidden flex flex-col"
                    style={{ background: `linear-gradient(145deg, ${carouselSlides[activeSlide].color}22, ${carouselSlides[activeSlide].color}08)` }}
                  >
                    <div className="flex items-center justify-between px-4 pt-3 pb-2">
                      <span className="text-gray-400 text-xs">9:41</span>
                      <div className="flex gap-1">
                        <Icon name="Wifi" size={12} className="text-gray-400" />
                        <Icon name="Battery" size={12} className="text-gray-400" />
                      </div>
                    </div>
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: carouselSlides[activeSlide].color }}>
                        <Icon name={carouselSlides[activeSlide].icon} size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="text-gray-900 font-bold text-sm">{carouselSlides[activeSlide].title}</div>
                        <div className="text-gray-400 text-xs">{carouselSlides[activeSlide].screen}</div>
                      </div>
                    </div>
                    <div className="px-4 flex-1 space-y-2 mt-2">
                      {carouselSlides[activeSlide].items.map((item, idx) => (
                        <div key={item} className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${idx * 100}ms` }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: carouselSlides[activeSlide].color + "20" }}>
                            <Icon name={carouselSlides[activeSlide].icon} size={14} style={{ color: carouselSlides[activeSlide].color }} />
                          </div>
                          <span className="text-gray-700 text-xs font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-around px-4 py-3 mt-4 border-t border-gray-100" style={{ background: "rgba(255,255,255,0.8)" }}>
                      {["Home", "Bell", "Map", "User"].map((ic) => (
                        <Icon key={ic} name={ic} size={18} className="text-gray-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="reveal rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1E5B 0%, #1A56DB 50%, #0EA5E9 100%)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl" style={{ background: "rgba(255,107,43,0.1)" }} />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🌟</div>
              <h2 className="text-white text-3xl sm:text-4xl font-black mb-4">Скачайте «Моя Кубань» сегодня</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Присоединяйтесь к жителям Краснодарского края, которые уже оценили удобство цифровых госуслуг
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href="#" className="flex items-center gap-3 bg-white text-gray-900 font-bold px-7 py-4 rounded-2xl hover:scale-105 transition-transform shadow-xl">
                  <Icon name="Apple" size={22} />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Загрузить в</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 border border-white/30 text-white font-bold px-7 py-4 rounded-2xl hover:scale-105 transition-all" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Icon name="Smartphone" size={22} />
                  <div className="text-left">
                    <div className="text-xs text-blue-200">Загрузить в</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full mb-4" style={{ background: "rgba(255,107,43,0.2)", color: "#FB923C" }}>
                Обратная связь
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">Ответы на ваши вопросы</h2>
              <p className="text-gray-400 mb-8">Оставьте заявку и мы свяжемся с вами в рабочее время</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1.5">Имя</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1.5">Фамилия</label>
                    <input
                      type="text"
                      value={formData.surname}
                      onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      placeholder="Иванов"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.ru"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Комментарий</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Ваш вопрос или предложение..."
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg, #1A56DB, #0EA5E9)" }}
                >
                  Отправить
                </button>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Нажимая кнопку «Отправить», я даю своё согласие на обработку персональных данных в соответствии с{" "}
                  <a href="#" className="text-blue-400 hover:underline">Федеральным законом № 152-ФЗ</a>
                  {" "}«О персональных данных».
                </p>
              </form>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF6B2B, #FF8C55)" }}>
                    <Icon name="MapPin" size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Моя Кубань</div>
                    <div className="text-gray-400 text-sm">Единый цифровой сервис для жителей Кубани</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  Официальное мобильное приложение Краснодарского края. Всё необходимое для комфортной жизни в регионе.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-gray-300 font-semibold text-sm uppercase tracking-wider">Контакты</h3>
                <a href="mailto:my.kuban@message.krasnodar.ru" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Icon name="Mail" size={16} />
                  </div>
                  <span className="text-sm">my.kuban@message.krasnodar.ru</span>
                </a>
                <a href="tel:+78002226942" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Icon name="Phone" size={16} />
                  </div>
                  <div>
                    <span className="text-sm block">+7 (800) 222-69-42</span>
                    <span className="text-xs text-green-400">Бесплатно по России</span>
                  </div>
                </a>
              </div>

              <div>
                <h3 className="text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4">Мы в соцсетях</h3>
                <div className="flex gap-3">
                  {[
                    { icon: "MessageCircle", label: "VK", color: "#4C75A3" },
                    { icon: "Send", label: "TG", color: "#0088CC" },
                    { icon: "Youtube", label: "YT", color: "#FF0000" },
                    { icon: "Globe", label: "Web", color: "#1A56DB" },
                  ].map((s) => (
                    <a key={s.label} href="#" className="w-11 h-11 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform" style={{ backgroundColor: s.color }}>
                      <Icon name={s.icon} size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-3 rounded-xl">
                  <Icon name="Apple" size={18} className="text-white" />
                  <div>
                    <div className="text-gray-400 text-xs">Доступно в</div>
                    <div className="text-white text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-3 rounded-xl">
                  <Icon name="Smartphone" size={18} className="text-green-400" />
                  <div>
                    <div className="text-gray-400 text-xs">Доступно в</div>
                    <div className="text-white text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 Моя Кубань. Правительство Краснодарского края.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
