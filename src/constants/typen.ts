/**
 * Konstanten für Sammlungs- und Erinnerungstypen
 */
import { SammlungsTyp } from '@/features/sammlung/types';

// Definition der Pflichfelder und optionalen Felder für jeden Sammlungstyp
export const SAMMLUNGS_TYP_FELDER: Record<SammlungsTyp, {
  pflichtFelder: string[];
  optionaleFelder: string[];
  typName: string;
  icon: string;
  beschreibung: string;
}> = {
  [SammlungsTyp.FILM]: {
    pflichtFelder: ['name'],
    optionaleFelder: ['bildURL', 'beschreibung', 'plattform'],
    typName: 'Film',
    icon: 'movie',
    beschreibung: 'Filme, die du sehen möchtest oder gesehen hast'
  },
  [SammlungsTyp.SERIE]: {
    pflichtFelder: ['name'],
    optionaleFelder: ['bildURL', 'beschreibung', 'plattform'],
    typName: 'Serie',
    icon: 'television',
    beschreibung: 'Serien, die du sehen möchtest oder gesehen hast'
  },
  [SammlungsTyp.BUCH]: {
    pflichtFelder: ['name'],
    optionaleFelder: ['bildURL', 'beschreibung', 'genre'],
    typName: 'Buch',
    icon: 'book',
    beschreibung: 'Bücher, die du lesen möchtest oder gelesen hast'
  },
  [SammlungsTyp.LOKAL]: {
    pflichtFelder: ['name'],
    optionaleFelder: ['bildURL', 'beschreibung', 'kategorie'],
    typName: 'Lokalität',
    icon: 'silverware-fork-knife',
    beschreibung: 'Restaurants, Cafés oder andere Orte, die du besuchen möchtest'
  },
  [SammlungsTyp.REZEPT]: {
    pflichtFelder: ['name'],
    optionaleFelder: ['bildURL', 'beschreibung', 'kategorie'],
    typName: 'Rezept',
    icon: 'food',
    beschreibung: 'Rezepte, die du ausprobieren möchtest'
  },
  [SammlungsTyp.NOTIZ]: {
    pflichtFelder: ['name'],
    optionaleFelder: ['bildURL', 'beschreibung', 'kategorie'],
    typName: 'Notiz',
    icon: 'note-text',
    beschreibung: 'Notizen und Gedanken'
  },
  [SammlungsTyp.LINK]: {
    pflichtFelder: ['name'],
    optionaleFelder: ['bildURL', 'beschreibung', 'kategorie'],
    typName: 'Link',
    icon: 'link',
    beschreibung: 'Links zu Webseiten, die du besuchen möchtest'
  },
  [SammlungsTyp.ANDERE]: {
    pflichtFelder: ['name'],
    optionaleFelder: ['bildURL', 'beschreibung', 'benutzerdefinierteFelder'],
    typName: 'Andere',
    icon: 'apps',
    beschreibung: 'Benutzerdefinierte Sammlung für alles andere'
  }
};

// Definition der Pflichtfelder und optionalen Felder für jeden Erinnerungstyp
export const ERINNERUNGS_TYP_FELDER: Record<SammlungsTyp, {
  pflichtFelder: string[];
  optionaleFelder: string[];
}> = {
  [SammlungsTyp.FILM]: {
    pflichtFelder: ['titel'],
    optionaleFelder: [
      'regisseur', 
      'erscheinungsJahr', 
      'genre', 
      'dauer', 
      'gesehen', 
      'bewertung', 
      'tags', 
      'bildURLs', 
      'notizen'
    ]
  },
  [SammlungsTyp.SERIE]: {
    pflichtFelder: ['titel'],
    optionaleFelder: [
      'staffel', 
      'folge', 
      'genre', 
      'laufzeit', 
      'gesehen', 
      'bewertung', 
      'tags', 
      'bildURLs', 
      'notizen'
    ]
  },
  [SammlungsTyp.BUCH]: {
    pflichtFelder: ['titel'],
    optionaleFelder: [
      'autor', 
      'erscheinungsJahr', 
      'genre', 
      'seitenanzahl', 
      'gelesen', 
      'bewertung', 
      'tags', 
      'bildURLs', 
      'notizen'
    ]
  },
  [SammlungsTyp.LOKAL]: {
    pflichtFelder: ['titel'],
    optionaleFelder: [
      'adresse', 
      'kategorie', 
      'oeffnungszeiten', 
      'webseite', 
      'telefon', 
      'besucht', 
      'bewertung', 
      'tags', 
      'bildURLs', 
      'notizen'
    ]
  },
  [SammlungsTyp.REZEPT]: {
    pflichtFelder: ['titel'],
    optionaleFelder: [
      'zutaten', 
      'zubereitungszeit', 
      'portionen', 
      'quelle', 
      'ausprobiert', 
      'bewertung', 
      'tags', 
      'bildURLs', 
      'notizen'
    ]
  },
  [SammlungsTyp.NOTIZ]: {
    pflichtFelder: ['titel', 'inhalt'],
    optionaleFelder: [
      'kategorie', 
      'prioritaet', 
      'tags', 
      'bildURLs'
    ]
  },
  [SammlungsTyp.LINK]: {
    pflichtFelder: ['titel', 'url'],
    optionaleFelder: [
      'kategorie', 
      'besucht', 
      'tags', 
      'bildURLs', 
      'notizen'
    ]
  },
  [SammlungsTyp.ANDERE]: {
    pflichtFelder: ['titel'],
    optionaleFelder: [
      'benutzerdefinierteFelder', 
      'tags', 
      'bildURLs', 
      'notizen'
    ]
  }
};

// Liste aller verfügbaren Sammlungstypen für die UI
export const VERFUEGBARE_SAMMLUNGSTYPEN = Object.values(SammlungsTyp).map(typ => ({
  wert: typ,
  label: SAMMLUNGS_TYP_FELDER[typ].typName,
  icon: SAMMLUNGS_TYP_FELDER[typ].icon,
  beschreibung: SAMMLUNGS_TYP_FELDER[typ].beschreibung
}));
