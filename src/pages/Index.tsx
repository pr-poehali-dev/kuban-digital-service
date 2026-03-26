import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PHONE_IMG = "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/files/f49ceab6-9f98-4b41-8c14-e7999b64a7ee.jpg";

const APP_STORE_URL = "https://apps.apple.com/ru/app/моя-кубань/id6756656561";
const RUSTORE_URL = "https://www.rustore.ru/catalog/app/ru.dk.mykuban";

const guideSlides = [
  {
    title: "Авторизация через ЕСИА",
    desc: "Авторизуйтесь через ЕСИА чтобы использовать все возможности приложения",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/33e29ca9-af75-4c98-9577-470a0f556bac.jpg",
    color: "#7C3AED",
    num: "01",
  },
  {
    title: "Пин-код для входа",
    desc: "Добавляет дополнительную защиту входа в приложение с помощью кода или биометрии",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/f240573b-b607-47cb-860e-0226e40117be.jpg",
    color: "#5B21B6",
    num: "02",
  },
  {
    title: "Поиск по приложению",
    desc: "Находит нужные услуги и укрытия в приложении по введённым словам",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/860a23cb-224a-4168-878f-802dbbfcd42d.jpg",
    color: "#1A56DB",
    num: "03",
  },
  {
    title: "Подача заявлений онлайн",
    desc: "Позволяет подать заявление онлайн без личного визита в ведомство",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/908c129b-411e-4b52-a74d-5c6004ebd210.jpg",
    color: "#0284C7",
    num: "04",
  },
  {
    title: "Статус заявления",
    desc: "Этапы обработки поданных заявлений можно посмотреть в личном кабинете",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/0197b750-2324-4d9d-b2d9-088c93d01613.jpg",
    color: "#0369A1",
    num: "05",
  },
  {
    title: "Запись в МФЦ или в ОИВ",
    desc: "Запись на личный приём в МФЦ или орган исполнительной власти",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/e5365b36-e817-4fec-89b4-195f1df46c0a.jpg",
    color: "#6D28D9",
    num: "06",
  },
  {
    title: "Уведомления",
    desc: "Сообщения о новых событиях, статусах заявок и важных обновлениях в приложении",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/bd229349-90bc-4687-89e3-b017f00d188d.jpg",
    color: "#EA580C",
    num: "07",
  },
  {
    title: "Платежи",
    desc: "Отслеживайте и оплачивайте задолженности прямо в приложении",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/3005b980-d6a8-4b81-9d2e-f65f355f0774.jpg",
    color: "#2563EB",
    num: "08",
  },
  {
    title: "Новости",
    desc: "Просматривайте актуальные новости Краснодарского края",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/6c84dd82-c299-40a0-844d-934814fe4e09.jpg",
    color: "#16A34A",
    num: "09",
  },
  {
    title: "Вопрос-ответ",
    desc: "Собрали ответы на вопросы по использованию мобильного приложения",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/fffaa2e9-48e9-43d8-bf10-42b4474efb41.jpg",
    color: "#D97706",
    num: "10",
  },
  {
    title: "Список укрытий",
    desc: "Найдите укрытия по нужным параметрам с возможностью офлайн-просмотра",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/860a23cb-224a-4168-878f-802dbbfcd42d.jpg",
    color: "#DC2626",
    num: "11",
  },
  {
    title: "Офлайн-карта",
    desc: "Интерактивная карта с возможностью отображения укрытий и офлайн-режимом",
    img: "https://cdn.poehali.dev/projects/712a0243-8863-497c-95a8-7b9d7df454f2/bucket/860a23cb-224a-4168-878f-802dbbfcd42d.jpg",
    color: "#0891B2",
    num: "12",
  },
];

const appFunctions = [
  {
    icon: "ShieldCheck",
    color: "#FF6B2B",
    title: "Рекомендации по безопасности, интерактивная карта со списком укрытий и вызов 112",
    points: [
      "Предоставляет рекомендации по личной безопасности.",
      "Показывает интерактивную карту с ближайшими убежищами и укрытиями.",
      "Позволяет быстро вызвать экстренные службы (112).",
    ],
    tag: "Безопасность",
    num: "01",
  },
  {
    icon: "Newspaper",
    color: "#1A56DB",
    title: "Актуальные новости и события региона",
    points: [
      "Предлагает свежие региональные новости и события.",
      "Помогает оставаться в курсе происходящего в регионе.",
      "Обеспечивает доступ к важной местной информации.",
    ],
    tag: "Новости",
    num: "02",
  },
  {
    icon: "Bell",
    color: "#0EA5E9",
    title: "Уведомления, штрафы, налоги и госпошлины",
    points: [
      "Отправляет уведомления о штрафах, налогах и госпошлины.",
      "Позволяет оплачивать задолженности онлайн.",
      "Упрощает отслеживание платежей и штрафов.",
    ],
    tag: "Уведомления",
    num: "03",
  },
  {
    icon: "Building2",
    color: "#7C3AED",
    title: "Муниципальные и региональные услуги",
    points: [
      "Предоставляет доступ к государственным услугам муниципалитета и региона.",
      "Упрощает подачу заявлений и получение справок.",
      "Повышает доступность административных процедур.",
    ],
    tag: "Услуги",
    num: "04",
  },
];

const navItems = [
  { label: "Функции", target: "app-functions" },
  { label: "Руководство", target: "guide" },
  { label: "Контакты", target: "contact" },
];

export default function Index() {
  const [hoveredGuide, setHoveredGuide] = useState<number | null>(null);
  const [activeGuide, setActiveGuide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", surname: "", phone: "", email: "", topic: "", comment: "",
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
  };

  const activeSlide = hoveredGuide !== null ? hoveredGuide : activeGuide;

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

            <div className="hidden sm:flex items-center gap-2">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
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
                href={RUSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 ${
                  isScrolled
                    ? "bg-blue-600 text-white"
                    : "bg-white/15 text-white backdrop-blur-sm border border-white/20"
                }`}
              >
                <Icon name="Smartphone" size={16} />
                RuStore
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
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-semibold">
                  <Icon name="Apple" size={16} /> App Store
                </a>
                <a href={RUSTORE_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold">
                  <Icon name="Smartphone" size={16} /> RuStore
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1E5B 0%, #1A56DB 45%, #0EA5E9 100%)" }}>
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(79,131,232,0.2)" }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,107,43,0.15)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 text-sm mb-6" style={{ background: "rgba(255,255,255,0.1)" }}>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Официальное приложение Краснодарского края
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Моя<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #FF6B2B, #FFB347)" }}>
                  Кубань
                </span>
              </h1>
              <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
                Единый цифровой сервис для жителей Кубани. Госуслуги, безопасность, новости и уведомления — всё в одном приложении.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white text-gray-900 font-bold px-6 py-4 rounded-2xl hover:scale-105 transition-transform shadow-xl">
                  <Icon name="Apple" size={22} />
                  <div className="text-left">
                    <div className="text-xs text-gray-500 leading-none">Загрузить в</div>
                    <div className="text-sm font-bold leading-tight">App Store</div>
                  </div>
                </a>
                <a href={RUSTORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 border-2 border-white/30 text-white font-bold px-6 py-4 rounded-2xl hover:scale-105 transition-all" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Icon name="Smartphone" size={22} />
                  <div className="text-left">
                    <div className="text-xs text-blue-200 leading-none">Загрузить в</div>
                    <div className="text-sm font-bold leading-tight">RuStore</div>
                  </div>
                </a>
              </div>


            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-[2.5rem] blur-2xl scale-110 animate-pulse" style={{ background: "rgba(79,131,232,0.3)" }} />
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

      {/* APP FUNCTIONS */}
      <section id="app-functions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Что умеет приложение
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Функции приложения
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Приложение «Моя Кубань» объединяет ключевые городские сервисы для комфортной жизни жителей региона
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {appFunctions.map((f, i) => (
              <div
                key={f.title}
                className="reveal group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ background: f.color, transform: "translate(30%, -30%)" }} />
                <div className="absolute top-5 right-6 text-5xl font-black opacity-5 select-none" style={{ color: f.color }}>{f.num}</div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md" style={{ backgroundColor: f.color + "18" }}>
                  <Icon name={f.icon} size={24} style={{ color: f.color }} />
                </div>
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3" style={{ backgroundColor: f.color + "18", color: f.color }}>
                  {f.tag}
                </span>
                <h3 className="text-gray-900 font-bold text-base mb-4 leading-snug">{f.title}</h3>
                <ul className="space-y-2">
                  {f.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-gray-500 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE CAROUSEL */}
      <section id="guide" className="py-20" style={{ background: "linear-gradient(180deg, #F0F6FF 0%, #FFFFFF 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <span className="inline-block bg-purple-50 text-purple-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Пошаговое руководство
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Как пользоваться приложением</h2>
            <p className="text-gray-500 text-lg">Наведите на шаг, чтобы увидеть подробности</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Steps list — scrollable */}
            <div>
              <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#E2E8F0 transparent" }}>
              {guideSlides.map((slide, i) => {
                const isActive = activeSlide === i;
                return (
                  <div
                    key={slide.title}
                    onMouseEnter={() => setHoveredGuide(i)}
                    onMouseLeave={() => setHoveredGuide(null)}
                    onClick={() => setActiveGuide(i)}
                    className="cursor-pointer group relative rounded-2xl px-4 py-3.5 transition-all duration-300 border"
                    style={{
                      background: isActive ? slide.color : "white",
                      borderColor: isActive ? slide.color : "#F3F4F6",
                      boxShadow: isActive ? `0 8px 30px ${slide.color}40` : "0 1px 3px rgba(0,0,0,0.05)",
                      transform: isActive ? "scale(1.01)" : "scale(1)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-xs transition-all duration-300"
                        style={{
                          background: isActive ? "rgba(255,255,255,0.2)" : slide.color + "18",
                          color: isActive ? "white" : slide.color,
                        }}
                      >
                        {slide.num}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-bold text-sm leading-snug transition-colors duration-300 ${isActive ? "text-white" : "text-gray-900"}`}>
                          {slide.title}
                        </div>
                        <div
                          className="text-xs mt-1 leading-relaxed overflow-hidden transition-all duration-300"
                          style={{
                            color: isActive ? "rgba(255,255,255,0.85)" : "#6B7280",
                            maxHeight: isActive ? "60px" : "0px",
                            opacity: isActive ? 1 : 0,
                          }}
                        >
                          {slide.desc}
                        </div>
                      </div>
                      <Icon
                        name="ChevronRight"
                        size={16}
                        style={{ color: isActive ? "rgba(255,255,255,0.7)" : "#D1D5DB" }}
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                );
              })}
              </div>

              <div className="flex gap-1.5 pt-4 justify-center flex-wrap">
                {guideSlides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGuide(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: activeSlide === i ? 20 : 7,
                      height: 7,
                      backgroundColor: activeSlide === i ? slide.color : "#E2E8F0",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Phone image */}
            <div className="flex justify-center reveal">
              <div className="relative w-64 h-[500px] select-none">
                <div
                  className="absolute inset-0 rounded-[2.5rem] blur-2xl scale-105 transition-all duration-500 opacity-40"
                  style={{ backgroundColor: guideSlides[activeSlide].color }}
                />
                <div className="relative w-full h-full bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl overflow-hidden">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                    <img
                      key={activeSlide}
                      src={guideSlides[activeSlide].img}
                      alt={guideSlides[activeSlide].title}
                      className="w-full h-full object-cover"
                      style={{ animation: "fadeInScale 0.35s ease" }}
                    />
                    {/* Overlay on hover */}
                    {hoveredGuide !== null && (
                      <div
                        className="absolute inset-0 flex flex-col justify-end p-5"
                        style={{
                          background: `linear-gradient(to top, ${guideSlides[activeSlide].color}EE 0%, ${guideSlides[activeSlide].color}88 50%, transparent 100%)`,
                          animation: "fadeInScale 0.25s ease",
                        }}
                      >
                        <div className="text-white font-black text-base leading-snug mb-2">
                          {guideSlides[activeSlide].title}
                        </div>
                        <div className="text-white/85 text-xs leading-relaxed">
                          {guideSlides[activeSlide].desc}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full z-10" />
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
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white text-gray-900 font-bold px-7 py-4 rounded-2xl hover:scale-105 transition-transform shadow-xl">
                  <Icon name="Apple" size={22} />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Загрузить в</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </a>
                <a href={RUSTORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-white/30 text-white font-bold px-7 py-4 rounded-2xl hover:scale-105 transition-all" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Icon name="Smartphone" size={22} />
                  <div className="text-left">
                    <div className="text-xs text-blue-200">Загрузить в</div>
                    <div className="font-bold">RuStore</div>
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
                  <label className="text-gray-400 text-sm block mb-1.5">Тема</label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="Тема обращения"
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

              <div className="flex gap-3 flex-wrap">
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-3 rounded-xl">
                  <Icon name="Apple" size={18} className="text-white" />
                  <div>
                    <div className="text-gray-400 text-xs">Доступно в</div>
                    <div className="text-white text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a href={RUSTORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-3 rounded-xl">
                  <Icon name="Smartphone" size={18} className="text-blue-400" />
                  <div>
                    <div className="text-gray-400 text-xs">Доступно в</div>
                    <div className="text-white text-sm font-semibold">RuStore</div>
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

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: none; }
      `}</style>
    </div>
  );
}