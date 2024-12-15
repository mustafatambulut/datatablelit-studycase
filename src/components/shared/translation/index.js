class Translations {
  constructor() {
    this.translations = {};
    this.currentLanguage = 'en';

    this.loadTranslations(this.currentLanguage);
  }

  async loadTranslations(lang) {
    try {
      const response = await fetch(
        `/src/translations/locales/${lang}.json`
      );

      this.translations = await response.json();
      this.notifySubscribers();
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  setLanguage(language) {
    this.currentLanguage = language;
    this.loadTranslations(language);
  }

  getTranslation(key) {
    return (this && this.translations && this.translations[key]) || key;
  }

  subscribe(callback) {
    if (!this.subscribers) this.subscribers = [];
    this.subscribers.push(callback);
  }

  notifySubscribers() {
    if (this.subscribers) {
      this.subscribers.forEach((callback) => callback(this.currentLanguage));
    }
  }
}

export const translations = new Translations();
