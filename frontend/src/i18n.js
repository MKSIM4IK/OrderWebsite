import React, { createContext, useContext, useState } from 'react';

const translations = {
  pl: {
    langName: 'Polski',
    nav: {
      request_service: 'Zamów usługę',
      orders_board: 'Tablica zamówień',
      dashboard: 'Panel',
      provider_login: 'Logowanie',
      logout: 'Wyloguj'
    },
    clientForm: {
      title: 'Złóż zlecenie',
      subtitle: 'Opisz, czego potrzebujesz',
      success_message: 'Twoje zlecenie zostało wysłane! Sprawdź status na tablicy zamówień.',
      name_label: 'Twoje imię',
      phone_label: 'Telefon',
      description_label: 'Opis usługi',
      name_placeholder: 'Wpisz swoje imię',
      phone_placeholder: 'Wpisz numer telefonu',
      description_placeholder: 'Opisz potrzebę...',
      submit: 'Wyślij zlecenie',
      how_it_works: ['Wypełnij formularz', 'Zlecenie pojawi się w tablicy', 'Yurii zaakceptuje zlecenie', 'Skontaktujemy się z Tobą'],
      how_it_works_title: 'Jak to działa:',
      submitted_label: 'Złożono',
      accepted_label: 'Zaakceptowano'
    },
    orderList: {
      title: 'Tablica zleceń',
      subtitle: 'Wszystkie zgłoszenia',
      no_orders: 'Brak zleceń. Bądź pierwszy!',
      submit_request: 'Złóż zlecenie',
      badge_accepted: '✓ Zaakceptowane',
      badge_new: '📋 Nowe',
      client: 'Klient',
      phone: 'Telefon',
      description: 'Opis',
      submitted: 'Złożono',
      accepted: 'Zaakceptowano',
      status: 'Status'
    },
    login: {
      title: 'Logowanie dostawcy',
      subtitle: 'Wprowadź dane',
      username: 'Nazwa użytkownika',
      password: 'Hasło',
      login: 'Zaloguj',
      logging_in: 'Logowanie...',
      demo_credentials: 'Dane demo',
      demo_username: 'Nazwa: Yurii123',
      demo_password: 'Hasło: Yurii123',
      enter_both: 'Wprowadź nazwę i hasło',
      welcome: 'Witaj'
    },
    dashboard: {
      title: 'Panel',
      welcome: 'Witaj',
      new_orders: 'Nowe zlecenia',
      accepted_orders: 'Zaakceptowane',
      total_orders: 'Wszystkie zlecenia',
      no_new_orders: 'Brak nowych zleceń',
      accept: 'Zaakceptuj',
      accepting: 'Akceptowanie...',
      accepted_badge: '✓ Zaakceptowane',
      submitted_label: 'Złożono',
      accepted_label: 'Zaakceptowano',
      not_done: 'Nie zrobione',
      in_progress: 'W trakcie',
      done: 'Zrobione',
      confirm_delete: 'Czy chcesz usunąć to zlecenie?',
      delete: 'Usuń',
      cancel: 'Anuluj',
      delete_option: 'Usuń zlecenie',
      mark_done: 'Zaznacz jako gotowe'
    },
    common: {
      loading: 'Ładowanie...',
      please_fill_all: 'Proszę wypełnić wszystkie pola',
      order_submitted: 'Zlecenie wysłane pomyślnie',
      failed_submit: 'Błąd wysyłania zlecenia',
      failed_fetch: 'Błąd pobierania zleceń',
      failed_accept: 'Błąd akceptowania zlecenia',
      login_failed: 'Błąd logowania'
    }
  },
  en: {
    langName: 'English',
    nav: {
      request_service: 'Request Service',
      orders_board: 'Orders Board',
      dashboard: 'Dashboard',
      provider_login: 'Provider Login',
      logout: 'Logout'
    },
    clientForm: {
      title: 'Request a Service',
      subtitle: 'Tell us what you need help with',
      success_message: 'Your request was submitted! Check the orders board.',
      name_label: 'Your Name',
      phone_label: 'Phone Number',
      description_label: 'Service Description',
      name_placeholder: 'Enter your full name',
      phone_placeholder: 'Enter your phone number',
      description_placeholder: 'Describe the service you need...',
      submit: 'Submit Request',
      how_it_works: ['Fill the form', 'Your request appears on the board', 'Yurii accepts the request', 'We contact you'],
      how_it_works_title: 'How it works:',
      submitted_label: 'Submitted',
      accepted_label: 'Accepted'
    },
    orderList: {
      title: 'Service Requests Board',
      subtitle: 'All incoming service requests',
      no_orders: 'No orders yet. Be the first!',
      submit_request: 'Submit a Request',
      badge_accepted: '✓ Accepted',
      badge_new: '📋 New',
      client: 'Client',
      phone: 'Phone',
      description: 'Description',
      submitted: 'Submitted',
      accepted: 'Accepted',
      status: 'Status'
    },
    login: {
      title: 'Service Provider Login',
      subtitle: 'Enter your credentials',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      logging_in: 'Logging in...',
      demo_credentials: 'Demo Credentials',
      demo_username: 'Username: Yurii123',
      demo_password: 'Password: Yurii123',
      enter_both: 'Please enter both username and password',
      welcome: 'Welcome'
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome',
      new_orders: 'New Orders',
      accepted_orders: 'Accepted Orders',
      total_orders: 'Total Orders',
      no_new_orders: 'No new orders',
      accept: 'Accept',
      accepting: 'Accepting...',
      accepted_badge: '✓ Accepted',
      submitted_label: 'Submitted',
      accepted_label: 'Accepted',
      not_done: 'Not Done',
      in_progress: 'In Progress',
      done: 'Done',
      confirm_delete: 'Do you want to delete this order?',
      delete: 'Delete',
      cancel: 'Cancel',
      delete_option: 'Delete Order',
      mark_done: 'Mark as Done'
    },
    common: {
      loading: 'Loading...',
      please_fill_all: 'Please fill in all fields',
      order_submitted: 'Order submitted successfully',
      failed_submit: 'Failed to submit order',
      failed_fetch: 'Failed to fetch orders',
      failed_accept: 'Failed to accept order',
      login_failed: 'Login failed'
    }
  },
  es: {
    langName: 'Español',
    nav: {
      request_service: 'Solicitar Servicio',
      orders_board: 'Tablero de Pedidos',
      dashboard: 'Panel',
      provider_login: 'Iniciar Sesión',
      logout: 'Cerrar sesión'
    },
    clientForm: {
      title: 'Solicitar un Servicio',
      subtitle: 'Dinos qué necesitas',
      success_message: '¡Tu solicitud ha sido enviada! Revisa el tablero.',
      name_label: 'Tu nombre',
      phone_label: 'Teléfono',
      description_label: 'Descripción del servicio',
      name_placeholder: 'Introduce tu nombre',
      phone_placeholder: 'Introduce tu teléfono',
      description_placeholder: 'Describe el servicio...',
      submit: 'Enviar solicitud',
      how_it_works: ['Rellena el formulario', 'Tu solicitud aparece en el tablero', 'Yurii acepta la solicitud', 'Nos pondremos en contacto contigo'],
      how_it_works_title: '¿Cómo funciona?',
      submitted_label: 'Enviado',
      accepted_label: 'Aceptado'
    },
    orderList: {
      title: 'Tablero de Solicitudes',
      subtitle: 'Todas las solicitudes entrantes',
      no_orders: 'Aún no hay solicitudes. ¡Sé el primero!',
      submit_request: 'Enviar una solicitud',
      badge_accepted: '✓ Aceptado',
      badge_new: '📋 Nuevo',
      client: 'Cliente',
      phone: 'Teléfono',
      description: 'Descripción',
      submitted: 'Enviado',
      accepted: 'Aceptado',
      status: 'Estado'
    },
    login: {
      title: 'Inicio de Sesión',
      subtitle: 'Introduce tus credenciales',
      username: 'Usuario',
      password: 'Contraseña',
      login: 'Entrar',
      logging_in: 'Entrando...',
      demo_credentials: 'Credenciales demo',
      demo_username: 'Usuario: Yurii123',
      demo_password: 'Contraseña: Yurii123',
      enter_both: 'Por favor ingresa usuario y contraseña',
      welcome: 'Bienvenido'
    },
    dashboard: {
      title: 'Panel',
      welcome: 'Bienvenido',
      new_orders: 'Nuevas solicitudes',
      accepted_orders: 'Aceptadas',
      total_orders: 'Total',
      no_new_orders: 'No hay nuevas solicitudes',
      accept: 'Aceptar',
      accepting: 'Aceptando...',
      accepted_badge: '✓ Aceptado',
      submitted_label: 'Enviado',
      accepted_label: 'Aceptado',
      not_done: 'No Hecho',
      in_progress: 'En Progreso',
      done: 'Hecho',
      confirm_delete: '¿Deseas eliminar este pedido?',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      delete_option: 'Eliminar Pedido',
      mark_done: 'Marcar como Hecho'
    },
    common: {
      loading: 'Cargando...',
      please_fill_all: 'Por favor completa todos los campos',
      order_submitted: 'Solicitud enviada con éxito',
      failed_submit: 'Error al enviar la solicitud',
      failed_fetch: 'Error al obtener solicitudes',
      failed_accept: 'Error al aceptar la solicitud',
      login_failed: 'Error de inicio de sesión'
    }
  },
  uk: {
    langName: 'Українська',
    nav: {
      request_service: 'Замовити послугу',
      orders_board: 'Дошка замовлень',
      dashboard: 'Панель',
      provider_login: 'Вхід',
      logout: 'Вийти'
    },
    clientForm: {
      title: 'Замовити послугу',
      subtitle: 'Опишіть, що потрібно',
      success_message: 'Ваше замовлення відправлено! Перевірте дошку замовлень.',
      name_label: "Ваше ім'я",
      phone_label: 'Телефон',
      description_label: 'Опис послуги',
      name_placeholder: 'Введіть ваше ім’я',
      phone_placeholder: 'Введіть телефон',
      description_placeholder: 'Опишіть послугу...',
      submit: 'Відправити',
      how_it_works: ['Заповніть форму', 'Ваше замовлення з\'явиться на дошці', 'Yurii приймає замовлення', 'Ми зв\'яжемося з вами'],
      how_it_works_title: 'Як це працює:',
      submitted_label: 'Надіслано',
      accepted_label: 'Прийнято'
    },
    orderList: {
      title: 'Дошка замовлень',
      subtitle: 'Усі запити',
      no_orders: 'Поки немає замовлень. Станьте першим!',
      submit_request: 'Зробити запит',
      badge_accepted: '✓ Прийнято',
      badge_new: '📋 Нове',
      client: 'Клієнт',
      phone: 'Телефон',
      description: 'Опис',
      submitted: 'Надіслано',
      accepted: 'Прийнято',
      status: 'Статус'
    },
    login: {
      title: 'Вхід постачальника',
      subtitle: 'Введіть дані',
      username: 'Ім’я користувача',
      password: 'Пароль',
      login: 'Увійти',
      logging_in: 'Увійти...',
      demo_credentials: 'Демо-дані',
      demo_username: 'Ім’я: Yurii123',
      demo_password: 'Пароль: Yurii123',
      enter_both: 'Введіть ім’я та пароль',
      welcome: 'Вітаємо'
    },
    dashboard: {
      title: 'Панель',
      welcome: 'Вітаємо',
      new_orders: 'Нові замовлення',
      accepted_orders: 'Прийняті',
      total_orders: 'Всього',
      no_new_orders: 'Немає нових замовлень',
      accept: 'Прийняти',
      accepting: 'Прийняття...',
      accepted_badge: '✓ Прийнято',
      submitted_label: 'Подано',
      accepted_label: 'Прийнято',
      not_done: 'Не виконано',
      in_progress: 'В процесі',
      done: 'Виконано',
      confirm_delete: 'Ви впевнені, що хочете видалити це замовлення?',
      delete: 'Видалити',
      cancel: 'Скасувати',
      delete_option: 'Видалити замовлення',
      mark_done: 'Позначити як виконане'
    },
    common: {
      loading: 'Завантаження...',
      please_fill_all: 'Будь ласка, заповніть всі поля',
      order_submitted: 'Замовлення надіслано',
      failed_submit: 'Не вдалося надіслати замовлення',
      failed_fetch: 'Не вдалося отримати замовлення',
      failed_accept: 'Не вдалося прийняти замовлення',
      login_failed: 'Помилка входу'
    }
  },
  de: {
    langName: 'Deutsch',
    nav: {
      request_service: 'Dienst anfordern',
      orders_board: 'Auftragsübersicht',
      dashboard: 'Dashboard',
      provider_login: 'Anmelden',
      logout: 'Abmelden'
    },
    clientForm: {
      title: 'Dienst anfordern',
      subtitle: 'Beschreiben Sie, was Sie benötigen',
      success_message: 'Ihre Anfrage wurde gesendet! Prüfen Sie das Auftragsboard.',
      name_label: 'Ihr Name',
      phone_label: 'Telefon',
      description_label: 'Beschreibung',
      name_placeholder: 'Geben Sie Ihren Namen ein',
      phone_placeholder: 'Geben Sie Ihre Telefonnummer ein',
      description_placeholder: 'Beschreiben Sie den Dienst...',
      submit: 'Anfrage senden',
      how_it_works: ['Formular ausfüllen', 'Ihre Anfrage erscheint im Board', 'Yurii akzeptiert die Anfrage', 'Wir kontaktieren Sie'],
      how_it_works_title: 'So funktioniert es:',
      submitted_label: 'Gesendet',
      accepted_label: 'Akzeptiert'
    },
    orderList: {
      title: 'Auftragsübersicht',
      subtitle: 'Alle eingehenden Anfragen',
      no_orders: 'Noch keine Aufträge. Sei der Erste!',
      submit_request: 'Anfrage senden',
      badge_accepted: '✓ Akzeptiert',
      badge_new: '📋 Neu',
      client: 'Kunde',
      phone: 'Telefon',
      description: 'Beschreibung',
      submitted: 'Gesendet',
      accepted: 'Akzeptiert',
      status: 'Status'
    },
    login: {
      title: 'Anmeldung',
      subtitle: 'Geben Sie Ihre Daten ein',
      username: 'Benutzername',
      password: 'Passwort',
      login: 'Anmelden',
      logging_in: 'Anmeldung...',
      demo_credentials: 'Demo-Zugang',
      demo_username: 'Benutzer: Yurii123',
      demo_password: 'Passwort: Yurii123',
      enter_both: 'Bitte Benutzername und Passwort eingeben',
      welcome: 'Willkommen'
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Willkommen',
      new_orders: 'Neue Aufträge',
      accepted_orders: 'Akzeptiert',
      total_orders: 'Insgesamt',
      no_new_orders: 'Keine neuen Aufträge',
      accept: 'Akzeptieren',
      accepting: 'Akzeptiere...',
      accepted_badge: '✓ Akzeptiert',
      submitted_label: 'Gesendet',
      accepted_label: 'Akzeptiert',
      not_done: 'Nicht erledigt',
      in_progress: 'In Bearbeitung',
      done: 'Fertig',
      confirm_delete: 'Möchten Sie diesen Auftrag wirklich löschen?',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      delete_option: 'Auftrag löschen',
      mark_done: 'Als fertig markieren'
    },
    common: {
      loading: 'Wird geladen...',
      please_fill_all: 'Bitte füllen Sie alle Felder aus',
      order_submitted: 'Auftrag erfolgreich gesendet',
      failed_submit: 'Fehler beim Senden des Auftrags',
      failed_fetch: 'Fehler beim Abrufen der Aufträge',
      failed_accept: 'Fehler beim Akzeptieren des Auftrags',
      login_failed: 'Anmeldung fehlgeschlagen'
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const defaultLang = 'pl';
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || defaultLang;
  });

  const setLanguage = (l) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  const t = (path) => {
    const parts = path.split('.');
    let cur = translations[lang] || translations[defaultLang];
    for (let p of parts) {
      cur = cur?.[p];
      if (cur === undefined) return path;
    }
    return cur;
  };

  const available = [
    { code: 'pl', label: translations.pl.langName, flag: '🇵🇱' },
    { code: 'en', label: translations.en.langName, flag: '🇬🇧' },
    { code: 'es', label: translations.es.langName, flag: '🇪🇸' },
    { code: 'uk', label: translations.uk.langName, flag: '🇺🇦' },
    { code: 'de', label: translations.de.langName, flag: '🇩🇪' }
  ];

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, available }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

export default translations;
