export const languageOptions = [
  { code: 'ru', name: 'Русский', flag: 'https://flagcdn.com/ru.svg' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/us.svg' },
  { code: 'kz', name: 'Қазақша', flag: 'https://flagcdn.com/kz.svg' },
  { code: 'uz', name: 'Oʻzbek', flag: 'https://flagcdn.com/uz.svg' },
] as const;

export type Language = typeof languageOptions[number]['code'];

export const translations = {
  ru: {
    nav: { about: 'Обо мне', projects: 'Проекты', contact: 'Контакты' },
    auth: { login: 'Войти', register: 'Регистрация', logout: 'Выйти' },
    hero: {
      title: 'Привет, я',
      subtitle: 'разработчик мобильных приложений \nи инди-игр.',
      p1: 'Занимаюсь созданием кроссплатформенных мобильных приложений и разработкой игровых механик.',
      p2: 'Мне нравится полный цикл работы: от идеи, интерфейса и логики до готового продукта, в который интересно играть или которым удобно пользоваться каждый день.',
      p3: 'Открыт к интересным проектам, коллаборациям и новым вызовам в разработке.',
      stack: 'Стек и технологии',
      tools: 'Инструменты',
    },
    projects: {
      title: 'Мои проекты',
      view: 'Смотреть проект',
    },
    admin: {
      panel: 'Админ Панель',
      addProject: 'Добавить проект',
      addNew: 'Создать новый проект',
      title: 'Название',
      category: 'Категория (напр. Web / React)',
      description: 'Описание',
      tech: 'Технологии (через запятую, напр. React Native, Java, C++)',
      uploadCover: 'Загрузить обложку',
      clear: 'Очистить',
      save: 'Сохранить проект',
      errorAdd: 'Ошибка при добавлении проекта',
      tab: 'Админ',
      emptyProjects: 'Проектов пока нет',
      deleteTitle: 'Удалить проект?',
      deleteDesc: 'Это действие нельзя отменить. Проект будет удален навсегда.',
      cancel: 'Отмена',
      delete: 'Удалить',
      errorDelete: 'Ошибка при удалении'
    },
    comments: {
      loginRequired: 'Пожалуйста, войдите в аккаунт, чтобы оставить комментарий.',
      write: 'Написать комментарий...',
      title: 'Комментарии',
      empty: 'Нет комментариев. Будьте первым!',
      errorAdd: 'Ошибка при добавлении комментария',
      placeholder: 'Здесь будет фото или видео вашего проекта'
    },
    contact: {
      title: 'Связаться со мной',
      desc: 'Открыт к новым проектам, обсуждению идей и сотрудничеству. Пишите мне на любую удобную платформу.',
      addFriend: 'Добавить в друзья'
    },
    modal: {
      welcome: 'С возвращением',
      create: 'Создать аккаунт',
      loginDesc: 'Войдите, чтобы продолжить просмотр.',
      regDesc: 'Зарегистрируйтесь, чтобы получить доступ к закрытым проектам.',
      name: 'Имя',
      password: 'Пароль',
      noAccount: 'Нет аккаунта?',
      hasAccount: 'Уже есть аккаунт?',
      fillFields: 'Заполните все поля',
      serverError: 'Ошибка сервера',
      namePlaceholder: 'Логин (имя)'
    },
    projectModal: {
      techStack: 'Технологии',
      description: 'Описание проекта',
      monetization: 'Монетизация и Прибыль',
      close: 'Закрыть',
      revenue: 'Прогнозируемая выручка',
      months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн']
    }
  },
  en: {
    nav: { about: 'About', projects: 'Projects', contact: 'Contact' },
    auth: { login: 'Login', register: 'Sign Up', logout: 'Logout' },
    hero: {
      title: 'Hi, I am',
      subtitle: 'a mobile app \nand indie game developer.',
      p1: 'I specialize in cross-platform mobile app development and game mechanics.',
      p2: 'I enjoy the full cycle of work: from idea, UI and logic to a finished product that is fun to play or convenient to use every day.',
      p3: 'Open to interesting projects, collaborations, and new challenges in development.',
      stack: 'Stack & Technologies',
      tools: 'Tools',
    },
    projects: {
      title: 'My Projects',
      view: 'View Project',
    },
    admin: {
      panel: 'Admin Panel',
      addProject: 'Add Project',
      addNew: 'Create New Project',
      title: 'Title',
      category: 'Category (e.g. Web / React)',
      description: 'Description',
      tech: 'Technologies (comma separated)',
      uploadCover: 'Upload Cover Image',
      clear: 'Clear',
      save: 'Save Project',
      errorAdd: 'Error adding project',
      tab: 'Admin',
      emptyProjects: 'No projects yet',
      deleteTitle: 'Delete project?',
      deleteDesc: 'This action cannot be undone. The project will be permanently deleted.',
      cancel: 'Cancel',
      delete: 'Delete',
      errorDelete: 'Error deleting project'
    },
    comments: {
      loginRequired: 'Please log in to leave a comment.',
      write: 'Write a comment...',
      title: 'Comments',
      empty: 'No comments yet. Be the first!',
      errorAdd: 'Error adding comment',
      placeholder: 'Your project photo or video will be here'
    },
    contact: {
      title: 'Contact Me',
      desc: 'Open to new projects, ideas discussion, and collaboration. Write to me on your preferred platform.',
      addFriend: 'Add Friend'
    },
    modal: {
      welcome: 'Welcome back',
      create: 'Create Account',
      loginDesc: 'Login to continue browsing.',
      regDesc: 'Register to access closed projects.',
      name: 'Name',
      password: 'Password',
      noAccount: 'No account?',
      hasAccount: 'Already have an account?',
      fillFields: 'Please fill all fields',
      serverError: 'Server error',
      namePlaceholder: 'Username'
    },
    projectModal: {
      techStack: 'Tech Stack',
      description: 'Project Description',
      monetization: 'Monetization & Profit',
      close: 'Close',
      revenue: 'Projected Revenue',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  },
  kz: {
    nav: { about: 'Мен туралы', projects: 'Жобалар', contact: 'Байланыс' },
    auth: { login: 'Кіру', register: 'Тіркелу', logout: 'Шығу' },
    hero: {
      title: 'Сәлем, мен',
      subtitle: 'мобильді қосымшалар \nмен инди-ойындар әзірлеушісімін.',
      p1: 'Мен кроссплатформалық мобильді қосымшалар жасаумен және ойын механикасын әзірлеумен айналысамын.',
      p2: 'Маған толық цикл ұнайды: идеядан, интерфейстен және логикадан бастап, ойнауға қызықты немесе күнделікті қолдануға ыңғайлы дайын өнімге дейін.',
      p3: 'Қызықты жобаларға, ынтымақтастыққа және жаңа сын-қатерлерге ашықпын.',
      stack: 'Стек және технологиялар',
      tools: 'Құралдар',
    },
    projects: {
      title: 'Менің жобаларым',
      view: 'Жобаны көру',
    },
    admin: {
      panel: 'Админ Панелі',
      addProject: 'Жоба қосу',
      addNew: 'Жаңа жоба жасау',
      title: 'Атауы',
      category: 'Санаты (мысалы, Web / React)',
      description: 'Сипаттамасы',
      tech: 'Технологиялар (үтір арқылы)',
      uploadCover: 'Мұқабаны жүктеу',
      clear: 'Тазарту',
      save: 'Жобаны сақтау',
      errorAdd: 'Жобаны қосу кезінде қате кетті',
      tab: 'Админ',
      emptyProjects: 'Әзірге жобалар жоқ',
      deleteTitle: 'Жобаны өшіру керек пе?',
      deleteDesc: 'Бұл әрекетті қайтару мүмкін емес. Жоба біржолата жойылады.',
      cancel: 'Болдырмау',
      delete: 'Өшіру',
      errorDelete: 'Өшіру кезінде қате кетті'
    },
    comments: {
      loginRequired: 'Пікір қалдыру үшін аккаунтқа кіріңіз.',
      write: 'Пікір жазу...',
      title: 'Пікірлер',
      empty: 'Пікірлер жоқ. Бірінші болыңыз!',
      errorAdd: 'Пікір қосу кезінде қате кетті',
      placeholder: 'Бұл жерде сіздің жобаңыздың суреті немесе бейнесі болады'
    },
    contact: {
      title: 'Менімен байланысу',
      desc: 'Жаңа жобаларға, идеяларды талқылауға және ынтымақтастыққа ашықпын. Маған өзіңізге ыңғайлы платформада жазыңыз.',
      addFriend: 'Дос қосу'
    },
    modal: {
      welcome: 'Қайта оралуыңызбен',
      create: 'Аккаунт құру',
      loginDesc: 'Жалғастыру үшін кіріңіз.',
      regDesc: 'Жабық жобаларға қол жеткізу үшін тіркеліңіз.',
      name: 'Аты',
      password: 'Құпия сөз',
      noAccount: 'Аккаунтыңыз жоқ па?',
      hasAccount: 'Аккаунтыңыз бар ма?',
      fillFields: 'Барлық өрістерді толтырыңыз',
      serverError: 'Сервер қатесі',
      namePlaceholder: 'Логин (аты)'
    },
    projectModal: {
      techStack: 'Технологиялар',
      description: 'Жоба сипаттамасы',
      monetization: 'Монетизация және табыс',
      close: 'Жабу',
      revenue: 'Күтілетін табыс',
      months: ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау']
    }
  },
  uz: {
    nav: { about: 'Men haqimda', projects: 'Loyihalar', contact: 'Aloqa' },
    auth: { login: 'Kirish', register: 'Roʻyxatdan oʻtish', logout: 'Chiqish' },
    hero: {
      title: 'Salom, men',
      subtitle: 'mobil ilovalar va \nindi-oʻyinlar dasturchisiman.',
      p1: 'Men krossplatforma mobil ilovalar va oʻyin mexanikalarini ishlab chiqish bilan shugʻullanaman.',
      p2: 'Menga toʻliq tsikl yoqadi: gʻoya, interfeys va mantiqdan tortib, oʻynash qiziqarli yoki har kuni foydalanish qulay boʻlgan tayyor mahsulotgacha.',
      p3: 'Qiziqarli loyihalar, hamkorlik va yangi chaqiriqlar uchun ochiqman.',
      stack: 'Stek va texnologiyalar',
      tools: 'Asboblar',
    },
    projects: {
      title: 'Mening loyihalarim',
      view: 'Loyihani koʻrish',
    },
    admin: {
      panel: 'Admin Panel',
      addProject: 'Loyiha qoʻshish',
      addNew: 'Yangi loyiha yaratish',
      title: 'Sarlavha',
      category: 'Toifa (masalan, Web / React)',
      description: 'Tavsif',
      tech: 'Texnologiyalar (vergul bilan ajratilgan)',
      uploadCover: 'Muqova yuklash',
      clear: 'Tozalash',
      save: 'Loyihani saqlash',
      errorAdd: 'Loyihani qoʻshishda xatolik',
      tab: 'Admin',
      emptyProjects: 'Hozircha loyihalar yoʻq',
      deleteTitle: 'Loyiha oʻchirilsinmi?',
      deleteDesc: 'Bu harakatni ortga qaytarib boʻlmaydi. Loyiha butunlay oʻchiriladi.',
      cancel: 'Bekor qilish',
      delete: 'Oʻchirish',
      errorDelete: 'Oʻchirishda xatolik'
    },
    comments: {
      loginRequired: 'Fikr qoldirish uchun tizimga kiring.',
      write: 'Fikr yozish...',
      title: 'Fikrlar',
      empty: 'Fikrlar yoʻq. Birinchi boʻling!',
      errorAdd: 'Fikr qoʻshishda xatolik',
      placeholder: 'Bu yerda sizning loyihangiz surati yoki videosi boʻladi'
    },
    contact: {
      title: 'Men bilan bogʻlanish',
      desc: 'Yangi loyihalar, gʻoyalarni muhokama qilish va hamkorlik uchun ochiqman. Menga oʻzingizga qulay platformada yozing.',
      addFriend: 'Doʻst qoʻshish'
    },
    modal: {
      welcome: 'Qaytganingiz bilan',
      create: 'Hisob yaratish',
      loginDesc: 'Davom etish uchun kiring.',
      regDesc: 'Yopiq loyihalarga kirish uchun roʻyxatdan oʻting.',
      name: 'Ism',
      password: 'Parol',
      noAccount: 'Hisobingiz yoʻqmi?',
      hasAccount: 'Hisobingiz bormi?',
      fillFields: 'Barcha maydonlarni to`ldiring',
      serverError: 'Server xatosi',
      namePlaceholder: 'Foydalanuvchi nomi'
    },
    projectModal: {
      techStack: 'Texnologiyalar',
      description: 'Loyiha tavsifi',
      monetization: 'Monetizatsiya va foyda',
      close: 'Yopish',
      revenue: 'Kutilayotgan daromad',
      months: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun']
    }
  }
};
