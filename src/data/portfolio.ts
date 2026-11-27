// Every visible text is { en, fa }: both are rendered and CSS shows the active language (see <T>).
const languages = [
  { en: "Persian (Farsi)", fa: "فارسی" },
  { en: "English", fa: "انگلیسی" },
] as const;

export const portfolio = {
  birthYear: 1992,
  personalValue: { en: "Growth", fa: "رشد" },
  disciplines: [
    { en: "Creativity", fa: "خلاقیت" },
    { en: "Engineering", fa: "مهندسی" },
    { en: "Education", fa: "آموزش" },
    { en: "Digital Work", fa: "کار دیجیتال" },
    { en: "Art", fa: "هنر" },
  ],
  about: {
    en: "Born in 1992, I am an engineering graduate of the University of Tehran. My strengths include continuous learning, creative thinking, communication skills, writing, and artistic activities. My experience spans teaching, research, website projects, connecting with people, content creation, and administration. Outside work, I enjoy sports, singing, travel, and exploring nature.",
    fa: "متولد ۱۹۹۲ (۱۳۷۱) و دانش‌آموخته‌ی مهندسی دانشگاه تهران هستم. یادگیری مداوم، تفکر خلاق، مهارت‌های ارتباطی، نویسندگی و فعالیت‌های هنری از نقاط قوت من است. تجربه‌ام شامل تدریس، پژوهش، پروژه‌های وب‌سایت، ارتباط با آدم‌ها، تولید محتوا و امور اداری است. بیرون از کار، به ورزش، آواز، سفر و گشت‌وگذار در طبیعت علاقه دارم.",
  },
  introduction: {
    en: "A multidisciplinary professional with an academic background in Civil and Environmental Engineering and experience across teaching, website projects, research, and content creation.",
    fa: "متخصصی چندرشته‌ای با پیشینه‌ی تحصیلی در مهندسی عمران و محیط زیست و تجربه در تدریس، پروژه‌های وب‌سایت، پژوهش و تولید محتوا.",
  },
  projects: [
    {
      name: "baharemampour.vercel.app",
      category: { en: "Personal portfolio built with AI", fa: "پورتفولیوی شخصی ساخته‌شده با هوش مصنوعی" },
      url: "https://baharemampour.vercel.app",
      logo: "/images/logos/bahar-signature.svg",
      logoAlt: "Bahar signature logo",
      logoWidth: 247,
      logoHeight: 75,
      description: {
        en: "This portfolio: a personal web application designed and built with AI tools, covering visual identity, content structure, responsive layout, and an AI assistant that answers questions about my background.",
        fa: "همین پورتفولیو: یک وب‌اپلیکیشن شخصی که با ابزارهای هوش مصنوعی طراحی و ساخته شده؛ شامل هویت بصری، ساختار محتوا، چیدمان واکنش‌گرا و دستیار هوش مصنوعی که به پرسش‌ها درباره‌ی سوابق من پاسخ می‌دهد.",
      },
    },
    {
      name: "mosharanco.com",
      category: { en: "Energy company website", fa: "وب‌سایت شرکت انرژی" },
      url: "https://mosharanco.com",
      logo: "/images/logos/mosharanco.png",
      logoAlt: "Mosharanco logo",
      logoWidth: 250,
      logoHeight: 100,
      description: {
        en: "Website work for an energy company: WordPress layout and content organization, site setup and administration, launch participation, and topic research.",
        fa: "وب‌سایت یک شرکت انرژی: چیدمان وردپرس و سازمان‌دهی محتوا، راه‌اندازی و مدیریت سایت، مشارکت در انتشار و پژوهش موضوعی.",
      },
    },
    {
      name: "drzeinabemampour.com",
      category: { en: "General practitioner website", fa: "وب‌سایت پزشک عمومی" },
      url: "https://drzeinabemampour.com",
      logo: "/images/logos/drzeinabemampour.svg",
      logoAlt: "Dr. Zainab Emampour logo",
      logoWidth: 1000,
      logoHeight: 560,
      description: {
        en: "Website work for a general practitioner: WordPress layout and content organization, site setup and administration, launch participation, and topic research.",
        fa: "وب‌سایت یک پزشک عمومی: چیدمان وردپرس و سازمان‌دهی محتوا، راه‌اندازی و مدیریت سایت، مشارکت در انتشار و پژوهش موضوعی.",
      },
    },
    {
      name: "order-portfolio-website.vercel.app",
      category: { en: "Portfolio ordering website", fa: "وب‌سایت سفارش پورتفولیو" },
      url: "https://order-portfolio-website.vercel.app",
      logo: "/images/logos/order-portfolio-website.svg",
      logoAlt: "Order portfolio website preview",
      logoWidth: 240,
      logoHeight: 100,
      description: {
        en: "A website for ordering personal portfolio sites, designed and built with AI tools: a one-screen landing page and a bilingual English/Persian brief that collects content, colors, fonts and photos, then sends the summary on Telegram.",
        fa: "وب‌سایتی برای سفارش پورتفولیوی شخصی که با ابزارهای هوش مصنوعی طراحی و ساخته شده: یک صفحه‌ی فرود تک‌صفحه‌ای و فرم دوزبانه‌ی انگلیسی/فارسی که محتوا، رنگ‌ها، فونت‌ها و عکس‌ها را جمع می‌کند و خلاصه را در تلگرام می‌فرستد.",
      },
    },
  ],
  experience: [
    {
      role: { en: "Product Designer working with AI", fa: "طراح محصول با هوش مصنوعی" },
      organization: { en: "Personal portfolio — baharemampour.vercel.app", fa: "پورتفولیوی شخصی — baharemampour.vercel.app" },
      summary: {
        en: "Designed and built this personal website with AI tools, from visual identity and layout to content and an AI portfolio assistant.",
        fa: "طراحی و ساخت همین وب‌سایت شخصی با ابزارهای هوش مصنوعی، از هویت بصری و چیدمان تا محتوا و دستیار هوش مصنوعی پورتفولیو.",
      },
    },
    {
      role: { en: "Manager", fa: "مدیر" },
      organization: { en: "Solar power installation and energy company", fa: "شرکت نصب نیروگاه خورشیدی و انرژی" },
      period: { en: "2020–2026", fa: "۲۰۲۰–۲۰۲۶" },
      summary: {
        en: "The resume lists work as a manager at a solar power plant installation and energy company.",
        fa: "فعالیت به‌عنوان مدیر در یک شرکت نصب نیروگاه خورشیدی و انرژی.",
      },
    },
    {
      role: { en: "Mathematics Teacher", fa: "معلم ریاضی" },
      organization: { en: "International school", fa: "مدرسه‌ی بین‌المللی" },
      period: { en: "2025–2026", fa: "۲۰۲۵–۲۰۲۶" },
      summary: { en: "Taught mathematics in English.", fa: "تدریس ریاضی به زبان انگلیسی." },
      highlights: [
        "Taught mathematics in English.",
        "Explained mathematical concepts in an international educational environment.",
        "Supported students in understanding topics and solving problems.",
      ],
    },
    {
      role: { en: "Physics Instructor", fa: "مدرس فیزیک" },
      organization: { en: "University entrance examination preparation", fa: "آمادگی کنکور سراسری" },
      period: { en: "2015–2020", fa: "۲۰۱۵–۲۰۲۰" },
      summary: {
        en: "Approximately five years of physics teaching for university entrance exam preparation.",
        fa: "حدود پنج سال تدریس فیزیک برای آمادگی کنکور سراسری.",
      },
      highlights: [
        "Taught physics to students preparing for the Iranian university entrance examination (Konkur).",
        "Explained scientific concepts and supported students’ problem-solving skills.",
        "Adapted teaching methods to different student needs and learning styles.",
      ],
    },
    {
      role: { en: "Website Designer, Content Creator & Administrator", fa: "طراح وب‌سایت، تولیدکننده‌ی محتوا و مدیر سایت" },
      organization: { en: "Two website projects", fa: "دو پروژه‌ی وب‌سایت" },
      summary: {
        en: "Designed and administered two websites, including layout, content, setup, launch participation, and topic research.",
        fa: "طراحی و مدیریت دو وب‌سایت، شامل چیدمان، محتوا، راه‌اندازی، مشارکت در انتشار و پژوهش موضوعی.",
      },
      highlights: [
        "Designed layouts using ready-made WordPress themes and organized website content.",
        "Managed website setup, structure, and administrative tasks.",
        "Participated in launching both websites and researched relevant content.",
      ],
    },
    {
      role: { en: "Administrative and Executive Assistant", fa: "دستیار اداری و اجرایی" },
      organization: { en: "Medical office", fa: "مطب پزشکی" },
      summary: {
        en: "Assisted with administrative and executive management activities.",
        fa: "همکاری در امور اداری و مدیریت اجرایی.",
      },
    },
  ],
  skills: [
    {
      name: { en: "Personal strengths", fa: "توانمندی‌های فردی" },
      items: [
        { en: "Creative thinking", fa: "تفکر خلاق" },
        { en: "Flexibility and ability to adapt to new conditions", fa: "انعطاف‌پذیری و سازگاری با شرایط جدید" },
        { en: "Learning new things", fa: "یادگیری چیزهای تازه" },
        { en: "Ability to learn and keep learning", fa: "توانایی یادگیری و ادامه‌ی یادگیری" },
        { en: "Good vocal ability", fa: "توانایی آوازی خوب" },
        {
          en: "Communication and connecting with others, especially teenagers and young adults",
          fa: "ارتباط مؤثر با دیگران، به‌ویژه نوجوانان و جوانان",
        },
        { en: "Writing", fa: "نویسندگی" },
        { en: "Research and online information gathering", fa: "پژوهش و جمع‌آوری اطلاعات آنلاین" },
        { en: "Communication and administrative coordination", fa: "ارتباطات و هماهنگی اداری" },
        { en: "Analytical problem solving", fa: "حل مسئله‌ی تحلیلی" },
        { en: "Independent learning", fa: "یادگیری مستقل" },
      ],
    },
    {
      name: { en: "Web & content", fa: "وب و محتوا" },
      items: [
        { en: "Web applications built with AI", fa: "ساخت وب‌اپلیکیشن با هوش مصنوعی" },
        { en: "WordPress website management", fa: "مدیریت وب‌سایت وردپرسی" },
        { en: "WordPress themes and customization", fa: "قالب‌های وردپرس و شخصی‌سازی" },
        { en: "Website content creation and administration", fa: "تولید محتوا و مدیریت وب‌سایت" },
        { en: "Social media content creation", fa: "تولید محتوا برای شبکه‌های اجتماعی" },
      ],
    },
    {
      name: { en: "Engineering & creative tools", fa: "ابزارهای مهندسی و خلاقانه" },
      items: [
        { en: "Working with AI tools", fa: "کار با ابزارهای هوش مصنوعی" },
        { en: "Basic product design activities", fa: "فعالیت‌های پایه‌ی طراحی محصول" },
        { en: "Adobe Photoshop (basic)", fa: "فتوشاپ (مقدماتی)" },
        { en: "Adobe Premiere (basic)", fa: "پریمیر (مقدماتی)" },
      ],
    },
    {
      name: { en: "Sports", fa: "ورزش" },
      items: [
        { en: "Volleyball", fa: "والیبال" },
        { en: "Swimming", fa: "شنا" },
        { en: "Running", fa: "دویدن" },
        { en: "Padel", fa: "پدل" },
      ],
    },
    {
      name: { en: "Languages", fa: "زبان‌ها" },
      items: languages,
    },
  ],
  hobbies: [
    { en: "Exercise and sports", fa: "ورزش و تحرک" },
    { en: "Singing", fa: "آواز" },
    { en: "Travel", fa: "سفر" },
    { en: "Nature and outdoor exploration", fa: "طبیعت و گشت‌وگذار در فضای باز" },
  ],
  education: [
    {
      qualification: {
        en: "Master’s Degree in Environmental Civil Engineering",
        fa: "کارشناسی ارشد مهندسی عمران محیط زیست",
      },
      institution: { en: "University of Tehran", fa: "دانشگاه تهران" },
      location: { en: "Iran", fa: "ایران" },
      period: { en: "2018–2019", fa: "۲۰۱۸–۲۰۱۹" },
      logo: "/images/logos/university-of-tehran.svg",
      logoAlt: "University of Tehran logo",
    },
    {
      qualification: { en: "Bachelor’s Degree in Civil Engineering", fa: "کارشناسی مهندسی عمران" },
      institution: { en: "Ferdowsi University of Mashhad", fa: "دانشگاه فردوسی مشهد" },
      location: { en: "Iran", fa: "ایران" },
      period: { en: "2015–2016", fa: "۲۰۱۵–۲۰۱۶" },
      logo: "/images/logos/ferdowsi-university.png",
      logoAlt: "Ferdowsi University of Mashhad logo",
    },
    {
      qualification: { en: "Mathematics education", fa: "تحصیل در رشته‌ی ریاضی" },
      institution: {
        en: "Sampad Schools (Iranian National Organization for Development of Exceptional Talents)",
        fa: "مدارس سمپاد (سازمان ملی پرورش استعدادهای درخشان)",
      },
      location: { en: "Iran", fa: "ایران" },
      logo: "/images/logos/sampad.svg",
      logoAlt: "Sampad logo",
    },
  ],
  languages,
  socialLinks: [
    {
      label: "LinkedIn",
      name: { en: "LinkedIn", fa: "لینکدین" },
      url: "https://www.linkedin.com/in/bahar-emampour-780188220/",
    },
    {
      label: "Instagram",
      name: { en: "Instagram", fa: "اینستاگرام" },
      url: "https://www.instagram.com/bahar_explores/",
    },
    {
      label: "Website",
      name: { en: "Website", fa: "وب‌سایت" },
      url: "https://baharemampour.com",
    },
  ],
} as const;
