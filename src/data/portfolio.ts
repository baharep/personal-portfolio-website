const languages = ["Persian (Farsi)", "English"] as const;

export const portfolio = {
  birthYear: 1992,
  personalValue: "Growth",
  disciplines: ["Creativity", "Engineering", "Education", "Digital Work", "Art"],
  about:
    "Born in 1992, I am an engineering graduate of the University of Tehran. My strengths include continuous learning, creative thinking, communication skills, writing, and artistic activities. My experience spans teaching, research, website projects, connecting with people, content creation, and administration. Outside work, I enjoy sports, singing, travel, and exploring nature.",
  introduction:
    "A multidisciplinary professional with an academic background in Civil and Environmental Engineering and experience across teaching, website projects, research, and content creation.",
  projects: [
    {
      name: "baharemampour.vercel.app",
      category: "Personal portfolio built with AI",
      url: "https://baharemampour.vercel.app",
      logo: "/images/logos/bahar-signature.svg",
      logoAlt: "Bahar signature logo",
      logoWidth: 247,
      logoHeight: 75,
      description:
        "This portfolio: a personal web application designed and built with AI tools, covering visual identity, content structure, responsive layout, and an AI assistant that answers questions about my background.",
    },
    {
      name: "mosharanco.com",
      category: "Energy company website",
      url: "https://mosharanco.com",
      logo: "/images/logos/mosharanco.png",
      logoAlt: "Mosharanco logo",
      logoWidth: 250,
      logoHeight: 100,
      description:
        "Website work for an energy company: WordPress layout and content organization, site setup and administration, launch participation, and topic research.",
    },
    {
      name: "drzeinabemampour.com",
      category: "General practitioner website",
      url: "https://drzeinabemampour.com",
      logo: "/images/logos/drzeinabemampour.svg",
      logoAlt: "Dr. Zainab Emampour logo",
      logoWidth: 1000,
      logoHeight: 560,
      description:
        "Website work for a general practitioner: WordPress layout and content organization, site setup and administration, launch participation, and topic research.",
    },
    {
      name: "order-portfolio-website.vercel.app",
      category: "Portfolio ordering website",
      url: "https://order-portfolio-website.vercel.app",
      logo: "/images/logos/order-portfolio-website.svg",
      logoAlt: "Order portfolio website preview",
      logoWidth: 240,
      logoHeight: 100,
      description:
        "A website for ordering personal portfolio sites, designed and built with AI tools: a one-screen landing page and a bilingual English/Persian brief that collects content, colors, fonts and photos, then sends the summary on Telegram.",
    },
  ],
  experience: [
    {
      role: "Product Designer working with AI",
      organization: "Personal portfolio — baharemampour.vercel.app",
      summary:
        "Designed and built this personal website with AI tools, from visual identity and layout to content and an AI portfolio assistant.",
    },
    {
      role: "Manager",
      organization: "Solar power installation and energy company",
      period: "2020–2026",
      summary:
        "The resume lists work as a manager at a solar power plant installation and energy company.",
    },
    {
      role: "Mathematics Teacher",
      organization: "International school",
      period: "2025–2026",
      summary: "Taught mathematics in English.",
      highlights: [
        "Taught mathematics in English.",
        "Explained mathematical concepts in an international educational environment.",
        "Supported students in understanding topics and solving problems.",
      ],
    },
    {
      role: "Physics Instructor",
      organization: "University entrance examination preparation",
      period: "2015–2020",
      summary: "Approximately five years of physics teaching for university entrance exam preparation.",
      highlights: [
        "Taught physics to students preparing for the Iranian university entrance examination (Konkur).",
        "Explained scientific concepts and supported students’ problem-solving skills.",
        "Adapted teaching methods to different student needs and learning styles.",
      ],
    },
    {
      role: "Website Designer, Content Creator & Administrator",
      organization: "Two website projects",
      summary:
        "Designed and administered two websites, including layout, content, setup, launch participation, and topic research.",
      highlights: [
        "Designed layouts using ready-made WordPress themes and organized website content.",
        "Managed website setup, structure, and administrative tasks.",
        "Participated in launching both websites and researched relevant content.",
      ],
    },
    {
      role: "Administrative and Executive Assistant",
      organization: "Medical office",
      summary:
        "Assisted with administrative and executive management activities.",
    },
  ],
  skills: [
    {
      name: "Personal strengths",
      items: [
        "Creative thinking",
        "Flexibility and ability to adapt to new conditions",
        "Learning new things",
        "Ability to learn and keep learning",
        "Good vocal ability",
        "Communication and connecting with others, especially teenagers and young adults",
        "Writing",
        "Research and online information gathering",
        "Communication and administrative coordination",
        "Analytical problem solving",
        "Independent learning",
      ],
    },
    {
      name: "Web & content",
      items: [
        "Web applications built with AI",
        "WordPress website management",
        "WordPress themes and customization",
        "Website content creation and administration",
        "Social media content creation",
      ],
    },
    {
      name: "Engineering & creative tools",
      items: [
        "Working with AI tools",
        "Basic product design activities",
        "Adobe Photoshop (basic)",
        "Adobe Premiere (basic)",
      ],
    },
    {
      name: "Sports",
      items: ["Volleyball", "Swimming", "Running", "Padel"],
    },
    {
      name: "Languages",
      items: languages,
    },
  ],
  hobbies: [
    "Exercise and sports",
    "Singing",
    "Travel",
    "Nature and outdoor exploration",
  ],
  education: [
    {
      qualification: "Master’s Degree in Environmental Civil Engineering",
      institution: "University of Tehran",
      location: "Iran",
      period: "2018–2019",
      logo: "/images/logos/university-of-tehran.svg",
      logoAlt: "University of Tehran logo",
    },
    {
      qualification: "Bachelor’s Degree in Civil Engineering",
      institution: "Ferdowsi University of Mashhad",
      location: "Iran",
      period: "2015–2016",
      logo: "/images/logos/ferdowsi-university.png",
      logoAlt: "Ferdowsi University of Mashhad logo",
    },
    {
      qualification: "Mathematics education",
      institution:
        "Sampad Schools (Iranian National Organization for Development of Exceptional Talents)",
      location: "Iran",
      logo: "/images/logos/sampad.svg",
      logoAlt: "Sampad logo",
    },
  ],
  languages,
  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/bahar-emampour-780188220/",
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/bahar_explores/",
    },
    {
      label: "Website",
      url: "https://baharemampour.com",
    },
  ],
} as const;
