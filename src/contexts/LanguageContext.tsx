import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pl' | 'cs';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.goals': 'Metas',
    'nav.fasting': 'Jejum',
    'nav.recipes': 'Receitas',
    'nav.evolution': 'Evolução',
    'nav.scan': 'Scan',
    'nav.settings': 'Configurações',
    
    // Common
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.close': 'Fechar',
    'common.back': 'Voltar',
  },
  en: {
    'nav.home': 'Home',
    'nav.goals': 'Goals',
    'nav.fasting': 'Fasting',
    'nav.recipes': 'Recipes',
    'nav.evolution': 'Evolution',
    'nav.scan': 'Scan',
    'nav.settings': 'Settings',
    
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.back': 'Back',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.goals': 'Metas',
    'nav.fasting': 'Ayuno',
    'nav.recipes': 'Recetas',
    'nav.evolution': 'Evolución',
    'nav.scan': 'Escanear',
    'nav.settings': 'Ajustes',
    
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.close': 'Cerrar',
    'common.back': 'Volver',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.goals': 'Objectifs',
    'nav.fasting': 'Jeûne',
    'nav.recipes': 'Recettes',
    'nav.evolution': 'Évolution',
    'nav.scan': 'Scanner',
    'nav.settings': 'Paramètres',
    
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.close': 'Fermer',
    'common.back': 'Retour',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.goals': 'Ziele',
    'nav.fasting': 'Fasten',
    'nav.recipes': 'Rezepte',
    'nav.evolution': 'Entwicklung',
    'nav.scan': 'Scannen',
    'nav.settings': 'Einstellungen',
    
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.close': 'Schließen',
    'common.back': 'Zurück',
  },
  it: {
    'nav.home': 'Home',
    'nav.goals': 'Obiettivi',
    'nav.fasting': 'Digiuno',
    'nav.recipes': 'Ricette',
    'nav.evolution': 'Evoluzione',
    'nav.scan': 'Scansione',
    'nav.settings': 'Impostazioni',
    
    'common.save': 'Salva',
    'common.cancel': 'Annulla',
    'common.delete': 'Elimina',
    'common.edit': 'Modifica',
    'common.close': 'Chiudi',
    'common.back': 'Indietro',
  },
  pl: {
    'nav.home': 'Strona główna',
    'nav.goals': 'Cele',
    'nav.fasting': 'Post',
    'nav.recipes': 'Przepisy',
    'nav.evolution': 'Ewolucja',
    'nav.scan': 'Skanuj',
    'nav.settings': 'Ustawienia',
    
    'common.save': 'Zapisz',
    'common.cancel': 'Anuluj',
    'common.delete': 'Usuń',
    'common.edit': 'Edytuj',
    'common.close': 'Zamknij',
    'common.back': 'Wstecz',
  },
  cs: {
    'nav.home': 'Domů',
    'nav.goals': 'Cíle',
    'nav.fasting': 'Půst',
    'nav.recipes': 'Recepty',
    'nav.evolution': 'Evoluce',
    'nav.scan': 'Skenovat',
    'nav.settings': 'Nastavení',
    
    'common.save': 'Uložit',
    'common.cancel': 'Zrušit',
    'common.delete': 'Smazat',
    'common.edit': 'Upravit',
    'common.close': 'Zavřít',
    'common.back': 'Zpět',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
