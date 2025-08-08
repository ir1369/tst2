const courseData = {
  1: {
    id: 1,
    title: "برنامه‌نویسی React.js از مبتدی تا پیشرفته",
    instructor: "دکتر احمد محمدی",
    description: "در این دوره جامع، شما با مفاهیم اساسی React.js آشنا می‌شوید و پروژه‌های عملی متعددی را پیاده‌سازی خواهید کرد. از Hooks گرفته تا Context API و Redux، همه چیز را یاد خواهید گرفت.",
    longDescription: "این دوره شامل بیش از ۲۰۰ ساعت محتوای آموزشی، ۵۰ پروژه عملی، و پشتیبانی مستقیم از مدرس است. شما از مفاهیم پایه شروع کرده و تا سطح پیشرفته پیش خواهید رفت.",
    price: "۲,۵۰۰,۰۰۰",
    originalPrice: "۴,۲۰۰,۰۰۰",
    duration: "۲۰۰ ساعت",
    students: "۱۲,۵۰۰",
    rating: 4.8,
    reviews: 1250,
    level: "متوسط تا پیشرفته",
    language: "فارسی",
    lastUpdate: "۲ هفته پیش",
    certificate: true,
    lifetimeAccess: true,
    mobileAccess: true,
    assignments: true,
    certificateType: "گواهی نامه معتبر",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    curriculum: [
      {
        title: "فصل ۱: مقدمه و آماده‌سازی محیط",
        lessons: [
          { title: "معرفی دوره و اهداف", duration: "۱۵ دقیقه", type: "video" },
          { title: "نصب و راه‌اندازی Node.js", duration: "۲۰ دقیقه", type: "video" },
          { title: "ایجاد پروژه React", duration: "۲۵ دقیقه", type: "video" },
          { title: "آشنایی با JSX", duration: "۳۰ دقیقه", type: "video" },
          { title: "تمرین عملی: ساخت کامپوننت ساده", duration: "۴۵ دقیقه", type: "assignment" }
        ]
      },
      {
        title: "فصل ۲: کامپوننت‌ها و Props",
        lessons: [
          { title: "مفهوم کامپوننت در React", duration: "۲۵ دقیقه", type: "video" },
          { title: "Props و انتقال داده", duration: "۳۰ دقیقه", type: "video" },
          { title: "کامپوننت‌های تابعی", duration: "۲۰ دقیقه", type: "video" },
          { title: "تمرین: ساخت کامپوننت Card", duration: "۴۰ دقیقه", type: "assignment" }
        ]
      },
      {
        title: "فصل ۳: State و Lifecycle",
        lessons: [
          { title: "مفهوم State", duration: "۳۵ دقیقه", type: "video" },
          { title: "useState Hook", duration: "۴۰ دقیقه", type: "video" },
          { title: "useEffect Hook", duration: "۴۵ دقیقه", type: "video" },
          { title: "تمرین: ساخت Todo App", duration: "۶۰ دقیقه", type: "assignment" }
        ]
      }
    ],
    features: [
      "دسترسی مادام‌العمر",
      "گواهی نامه معتبر",
      "پشتیبانی مستقیم از مدرس",
      "دسترسی موبایل",
      "تمرینات عملی",
      "کدهای نمونه"
    ],
    requirements: [
      "آشنایی با HTML و CSS",
      "دانش پایه JavaScript",
      "علاقه به یادگیری برنامه‌نویسی"
    ],
    whatYouWillLearn: [
      "ساخت کامپوننت‌های React",
      "مدیریت State و Props",
      "استفاده از Hooks",
      "راه‌اندازی پروژه‌های واقعی",
      "بهینه‌سازی عملکرد",
      "تست‌نویسی"
    ]
  },
  2: {
    id: 2,
    title: "طراحی رابط کاربری با Figma",
    instructor: "مهندس فاطمه احمدی",
    description: "یاد بگیرید چگونه رابط‌های کاربری زیبا و کاربردی طراحی کنید. از اصول طراحی تا پیاده‌سازی در Figma.",
    longDescription: "این دوره شامل اصول طراحی UI/UX، کار با Figma، و پیاده‌سازی پروژه‌های واقعی است.",
    price: "۱,۸۰۰,۰۰۰",
    originalPrice: "۳,۰۰۰,۰۰۰",
    duration: "۱۵۰ ساعت",
    students: "۸,۲۰۰",
    rating: 4.9,
    reviews: 890,
    level: "مبتدی تا متوسط",
    language: "فارسی",
    lastUpdate: "۱ هفته پیش",
    certificate: true,
    lifetimeAccess: true,
    mobileAccess: true,
    assignments: true,
    certificateType: "گواهی نامه معتبر",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    instructorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    curriculum: [
      {
        title: "فصل ۱: مقدمه بر طراحی UI/UX",
        lessons: [
          { title: "اصول طراحی رابط کاربری", duration: "۲۰ دقیقه", type: "video" },
          { title: "آشنایی با Figma", duration: "۲۵ دقیقه", type: "video" },
          { title: "راه‌اندازی پروژه", duration: "۱۵ دقیقه", type: "video" }
        ]
      }
    ],
    features: [
      "دسترسی مادام‌العمر",
      "گواهی نامه معتبر",
      "فایل‌های طراحی",
      "پشتیبانی مستقیم"
    ],
    requirements: [
      "علاقه به طراحی",
      "کامپیوتر شخصی"
    ],
    whatYouWillLearn: [
      "اصول طراحی UI/UX",
      "کار با Figma",
      "طراحی رابط‌های موبایل",
      "طراحی وب‌سایت"
    ]
  }
};

export default courseData;