.
├── App.tsx
├── ENTWICKLUNGSSTAND.md
├── ORDNERSTRUKTUR.md
├── README.md
├── ROADMAP.md
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── erfolge
│   │   ├── erfolge.tsx
│   │   ├── index
│   │   ├── index.tsx
│   │   ├── suche
│   │   └── suche.tsx
│   ├── __tests__
│   │   ├── sammlung-detail.test.tsx
│   │   ├── sammlung-erstellen.test.tsx
│   │   └── sammlungen-screen.test.tsx
│   ├── _layout.tsx
│   ├── erinnerung-card-demo.tsx
│   ├── sammlung
│   │   ├── [id]
│   │   │   ├── erinnerung
│   │   │   │   └── erstellen.tsx
│   │   │   └── index.tsx
│   │   └── erstellen.tsx
│   ├── sammlung-card-demo.tsx
│   └── theme-demo.tsx
├── app.json
├── assets
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── fonts
│   ├── icon.png
│   ├── images
│   └── splash-icon.png
├── babel.config.js
├── index.ts
├── jest.config.js
├── jest.setup.additional.js
├── jest.setup.js
├── metro.config.js
├── package-lock.json
├── package.json
├── src
│   ├── components
│   │   ├── erinnerung
│   │   │   ├── ErinnerungCard.tsx
│   │   │   ├── ErinnerungCardDemo.tsx
│   │   │   ├── ErinnerungForm.tsx
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── sammlung
│   │   │   ├── SammlungCard.tsx
│   │   │   ├── SammlungCardDemo.tsx
│   │   │   ├── SammlungForm
│   │   │   │   └── __tests__
│   │   │   ├── SammlungForm.tsx
│   │   │   ├── __tests__
│   │   │   │   ├── SammlungCard.test.tsx
│   │   │   │   └── SammlungForm.test.tsx
│   │   │   └── index.ts
│   │   └── ui
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── FormDemo.tsx
│   │       ├── Input.tsx
│   │       ├── Layout.tsx
│   │       ├── README.md
│   │       ├── Tag.tsx
│   │       ├── ThemeDemo.tsx
│   │       ├── index.ts
│   │       └── inputs
│   │           ├── DateInput.tsx
│   │           ├── SelectInput.tsx
│   │           ├── TagInput.tsx
│   │           ├── TextField.tsx
│   │           └── index.ts
│   ├── constants
│   │   ├── theme.ts
│   │   └── typen.ts
│   ├── contexts
│   │   ├── AppProvider.tsx
│   │   └── ThemeProvider.tsx
│   ├── features
│   │   ├── erinnerung
│   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   └── useCreateErinnerung.ts
│   │   │   └── types.ts
│   │   ├── sammlung
│   │   │   ├── __tests__
│   │   │   ├── hooks
│   │   │   │   ├── __tests__
│   │   │   │   │   ├── useCreateSammlung.test.ts
│   │   │   │   │   └── useSammlungen.test.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── useCreateSammlung.ts
│   │   │   │   └── useSammlungen.ts
│   │   │   └── types.ts
│   │   └── suche
│   │       └── types.ts
│   ├── hooks
│   ├── services
│   │   ├── media
│   │   ├── notifications
│   │   │   └── index.ts
│   │   └── storage
│   │       ├── __mocks__
│   │       ├── __tests__
│   │       │   ├── database.test.ts
│   │       │   ├── erinnerungBilder.test.ts
│   │       │   ├── erinnerungExtendedStorage.test.ts
│   │       │   ├── erinnerungReminder.test.ts
│   │       │   ├── erinnerungStorage.test.ts
│   │       │   ├── erinnerungTags.test.ts
│   │       │   ├── sammlungExtendedStorage.test.ts
│   │       │   ├── sammlungStorage.additional.test.ts
│   │       │   ├── sammlungStorage.test.ts
│   │       │   └── tagStorage.test.ts
│   │       ├── database.ts
│   │       ├── erinnerungExtendedStorage.ts
│   │       ├── erinnerungStorage.ts
│   │       ├── sammlungExtendedStorage.ts
│   │       ├── sammlungStorage.ts
│   │       └── tagStorage.ts
│   └── utils
│       ├── colorUtils.ts
│       ├── layout.ts
│       ├── styles.ts
│       ├── typography.ts
│       └── validation
├── tsconfig.json
└── yarn.lock

41 directories, 94 files
