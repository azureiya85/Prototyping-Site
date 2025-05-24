// Type definitions
export interface ColorPalette {
  id: string;
  name: string;
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  tertiary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  surface: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

export interface FontPair {
  id: string;
  name: string;
  heading: GoogleFont;
  body: GoogleFont;
  description: string;
}

export interface GoogleFont {
  family: string;
  variants: string[];
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
}

export interface CustomTheme {
  palette: ColorPalette;
  fonts: FontPair;
  customColors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    surface?: string;
  };
}

// Default color palettes with full shade ranges
export const defaultColorPalettes: ColorPalette[] = [
  {
    id: 'purple-teal',
    name: 'Purple & Teal',
    primary: {
      50: '#f3f1ff',
      100: '#ebe5ff',
      200: '#d9ceff',
      300: '#bea6ff',
      400: '#9f75ff',
      500: '#843dff',
      600: '#7916ff',
      700: '#6b04fd',
      800: '#5a03d4',
      900: '#4a03ad',
      950: '#2c0076'
    },
    secondary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eedd8',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e'
    },
    tertiary: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
      950: '#4c0519'
    },
    surface: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    }
  },
  {
    id: 'emerald-amber',
    name: 'Emerald & Amber',
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22'
    },
    secondary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    tertiary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e'
    },
    surface: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712'
    }
  },
  {
    id: 'rose-blue',
    name: 'Rose & Blue',
    primary: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
      950: '#4c0519'
    },
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    tertiary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    surface: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    primary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    secondary: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712'
    },
    tertiary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    surface: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b'
    }
  },
  {
    id: 'pastel',
    name: 'Pastel',
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },
    secondary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724'
    },
    tertiary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006'
    },
    surface: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09'
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    primary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
      950: '#083344'
    },
    secondary: {
      50: '#f7fee7',
      100: '#ecfccb',
      200: '#d9f99d',
      300: '#bef264',
      400: '#a3e635',
      500: '#84cc16',
      600: '#65a30d',
      700: '#4d7c0f',
      800: '#3f6212',
      900: '#365314',
      950: '#1a2e05'
    },
    tertiary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e'
    },
    surface: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712'
    }
  },
  {
    id: 'earth-tones',
    name: 'Earth Tones',
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22'
    },
    secondary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407'
    },
    tertiary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006'
    },
    surface: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09'
    }
  },
    {
    id: 'sage-terracotta',
    name: 'Sage & Terracotta',
    primary: {
      50: '#f6f7f6',
      100: '#e3e7e1',
      200: '#c7d0c4',
      300: '#a1b29b',
      400: '#7a9471',
      500: '#5c7a52',
      600: '#476140',
      700: '#3a4f34',
      800: '#31412c',
      900: '#2a3726',
      950: '#151c13'
    },
    secondary: {
      50: '#fdf6f3',
      100: '#fbeae1',
      200: '#f6d3c3',
      300: '#efb397',
      400: '#e68b64',
      500: '#dd6b3e',
      600: '#ce5329',
      700: '#ac4023',
      800: '#893623',
      900: '#6f2f20',
      950: '#3c1610'
    },
    tertiary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    surface: {
      50: '#faf9f7',
      100: '#f2f0ec',
      200: '#e6e2da',
      300: '#d6d0c4',
      400: '#c2b8a7',
      500: '#a89b87',
      600: '#97876f',
      700: '#7e705c',
      800: '#685d4e',
      900: '#554c42',
      950: '#2d2721'
    }
  },
  {
    id: 'midnight-coral',
    name: 'Midnight & Coral',
    primary: {
      50: '#f0f3ff',
      100: '#e4e9ff',
      200: '#cdd6ff',
      300: '#a6b5ff',
      400: '#758aff',
      500: '#4d5fff',
      600: '#3a3cf5',
      700: '#2e2cd8',
      800: '#2624af',
      900: '#252589',
      950: '#161650'
    },
    secondary: {
      50: '#fff4f2',
      100: '#ffe6e1',
      200: '#ffd1c7',
      300: '#ffb2a0',
      400: '#ff8468',
      500: '#ff5f3a',
      600: '#ed421c',
      700: '#c83213',
      800: '#a52d14',
      900: '#882b18',
      950: '#4a1208'
    },
    tertiary: {
      50: '#f0fdfa',
      100: '#cbfbf0',
      200: '#96f7e2',
      300: '#59edce',
      400: '#28d9b7',
      500: '#10c0a0',
      600: '#089b82',
      700: '#0b7c6a',
      800: '#0e6355',
      900: '#115347',
      950: '#04302a'
    },
    surface: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    }
  },
  {
    id: 'plum-mint',
    name: 'Plum & Mint',
    primary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e'
    },
    secondary: {
      50: '#f0fdf9',
      100: '#ddf9f0',
      200: '#bef2e1',
      300: '#8ae6ca',
      400: '#4fd1ae',
      500: '#28b896',
      600: '#1d9479',
      700: '#1a7762',
      800: '#195f50',
      900: '#194f43',
      950: '#0a2d26'
    },
    tertiary: {
      50: '#fff9ed',
      100: '#fef0d4',
      200: '#fcdea8',
      300: '#f9c571',
      400: '#f5a238',
      500: '#f28516',
      600: '#e36b0c',
      700: '#bc510c',
      800: '#964112',
      900: '#7a3712',
      950: '#431a07'
    },
    surface: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b'
    }
  },
  {
    id: 'forest-sunset',
    name: 'Forest & Sunset',
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    secondary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    tertiary: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
      950: '#4c0519'
    },
    surface: {
      50: '#f8f6f0',
      100: '#ede8d8',
      200: '#dcd0b3',
      300: '#c5b086',
      400: '#b19660',
      500: '#a18547',
      600: '#8a6d3b',
      700: '#715532',
      800: '#5e472e',
      900: '#523d2a',
      950: '#2e2016'
    }
  },
  {
    id: 'arctic-aurora',
    name: 'Arctic & Aurora',
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },
    secondary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724'
    },
    tertiary: {
      50: '#f7fee7',
      100: '#ecfccb',
      200: '#d9f99d',
      300: '#bef264',
      400: '#a3e635',
      500: '#84cc16',
      600: '#65a30d',
      700: '#4d7c0f',
      800: '#3f6212',
      900: '#365314',
      950: '#1a2e05'
    },
    surface: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    }
  },
  {
    id: 'copper-steel',
    name: 'Copper & Steel',
    primary: {
      50: '#fdf8f6',
      100: '#f2e8e5',
      200: '#ebd5cf',
      300: '#dfbab2',
      400: '#d19489',
      500: '#c1715f',
      600: '#ad5a47',
      700: '#92483a',
      800: '#783e33',
      900: '#63362e',
      950: '#341b16'
    },
    secondary: {
      50: '#f6f7f9',
      100: '#ebeef2',
      200: '#d3dae2',
      300: '#adbbc9',
      400: '#8196ab',
      500: '#627791',
      600: '#4f6078',
      700: '#424f62',
      800: '#394352',
      900: '#333946',
      950: '#22252d'
    },
    tertiary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006'
    },
    surface: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b'
    }
  }
];

// Popular Google Fonts with variants
export const popularGoogleFonts: GoogleFont[] = [
  {
    family: 'Inter',
    variants: ['300', '400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Poppins',
    variants: ['300', '400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Roboto',
    variants: ['300', '400', '500', '700', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Open Sans',
    variants: ['300', '400', '500', '600', '700', '800'],
    category: 'sans-serif'
  },
  {
    family: 'Montserrat',
    variants: ['300', '400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Lato',
    variants: ['300', '400', '700', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Source Sans Pro',
    variants: ['300', '400', '600', '700', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Nunito',
    variants: ['300', '400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Playfair Display',
    variants: ['400', '500', '600', '700', '800', '900'],
    category: 'serif'
  },
  {
    family: 'Merriweather',
    variants: ['300', '400', '700', '900'],
    category: 'serif'
  },
  {
    family: 'Lora',
    variants: ['400', '500', '600', '700'],
    category: 'serif'
  },
  {
    family: 'PT Serif',
    variants: ['400', '700'],
    category: 'serif'
  },
  {
    family: 'Crimson Text',
    variants: ['400', '600', '700'],
    category: 'serif'
  },
  {
    family: 'Oswald',
    variants: ['300', '400', '500', '600', '700'],
    category: 'sans-serif'
  },
  {
    family: 'Raleway',
    variants: ['300', '400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Ubuntu',
    variants: ['300', '400', '500', '700'],
    category: 'sans-serif'
  },
  {
    family: 'Fira Sans',
    variants: ['300', '400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Dancing Script',
    variants: ['400', '500', '600', '700'],
    category: 'handwriting'
  },
  {
    family: 'Pacifico',
    variants: ['400'],
    category: 'handwriting'
  },
  {
    family: 'Abril Fatface',
    variants: ['400'],
    category: 'display'
  },
  {
    family: 'Fredoka One',
    variants: ['400'],
    category: 'display'
  },
  {
    family: 'Roboto Mono',
    variants: ['400', '500', '700'],
    category: 'monospace'
  },
    {
    family: 'Figtree',
    variants: ['300', '400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Hanken Grotesk',
    variants: ['300', '400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'Familjen Grotesk',
    variants: ['400', '500', '600', '700'],
    category: 'sans-serif'
  },
  {
    family: 'Schibsted Grotesk',
    variants: ['400', '500', '600', '700', '800', '900'],
    category: 'sans-serif'
  },
  {
    family: 'DM Sans',
    variants: ['400', '500', '700'],
    category: 'sans-serif'
  },
  {
    family: 'Space Grotesk',
    variants: ['300', '400', '500', '600', '700'],
    category: 'sans-serif'
  },
  {
    family: 'Plus Jakarta Sans',
    variants: ['300', '400', '500', '600', '700', '800'],
    category: 'sans-serif'
  },
  {
    family: 'Manrope',
    variants: ['300', '400', '500', '600', '700', '800'],
    category: 'sans-serif'
  },
  {
    family: 'Newsreader',
    variants: ['400', '500', '600', '700'],
    category: 'serif'
  },
  {
    family: 'Fraunces',
    variants: ['400', '500', '600', '700', '800', '900'],
    category: 'serif'
  },
  {
    family: 'Source Serif Pro',
    variants: ['400', '600', '700'],
    category: 'serif'
  },
  {
    family: 'Literata',
    variants: ['400', '500', '600', '700', '800', '900'],
    category: 'serif'
  },
  {
    family: 'Clash Display',
    variants: ['400', '500', '600', '700'],
    category: 'display'
  },
  {
    family: 'Cabinet Grotesk',
    variants: ['400', '500', '700', '800'],
    category: 'display'
  },
  {
    family: 'Satoshi',
    variants: ['400', '500', '700', '900'],
    category: 'sans-serif'
  },
  {
    family: 'General Sans',
    variants: ['400', '500', '600', '700'],
    category: 'sans-serif'
  },
  {
    family: 'JetBrains Mono',
    variants: ['400', '500', '700'],
    category: 'monospace'
  },
  {
    family: 'IBM Plex Mono',
    variants: ['400', '500', '600', '700'],
    category: 'monospace'
  }
];

// Default font pairings
export const defaultFontPairings: FontPair[] = [
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    heading: popularGoogleFonts.find(f => f.family === 'Inter')!,
    body: popularGoogleFonts.find(f => f.family === 'Inter')!,
    description: 'Clean and modern pairing perfect for professional applications'
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    heading: popularGoogleFonts.find(f => f.family === 'Playfair Display')!,
    body: popularGoogleFonts.find(f => f.family === 'Source Sans Pro')!,
    description: 'Sophisticated serif-sans combination for premium feel'
  },
  {
    id: 'bold-statement',
    name: 'Bold Statement',
    heading: popularGoogleFonts.find(f => f.family === 'Oswald')!,
    body: popularGoogleFonts.find(f => f.family === 'Open Sans')!,
    description: 'Strong headings with readable body text for impact'
  },
  {
    id: 'friendly-rounded',
    name: 'Friendly Rounded',
    heading: popularGoogleFonts.find(f => f.family === 'Poppins')!,
    body: popularGoogleFonts.find(f => f.family === 'Nunito')!,
    description: 'Approachable and friendly fonts for community-focused apps'
  },
  {
    id: 'classic-readable',
    name: 'Classic Readable',
    heading: popularGoogleFonts.find(f => f.family === 'Merriweather')!,
    body: popularGoogleFonts.find(f => f.family === 'Lato')!,
    description: 'Time-tested combination focusing on readability'
  },
  {
    id: 'retro',
    name: 'Retro',
    heading: popularGoogleFonts.find(f => f.family === 'Abril Fatface')!,
    body: popularGoogleFonts.find(f => f.family === 'Open Sans')!,
    description: 'Bold retro headings with clean modern body text'
  },
  {
    id: 'classic-serif',
    name: 'Classic Serif',
    heading: popularGoogleFonts.find(f => f.family === 'PT Serif')!,
    body: popularGoogleFonts.find(f => f.family === 'PT Serif')!,
    description: 'Timeless serif combination for traditional elegance'
  },
  {
    id: 'handwritten',
    name: 'Handwritten',
    heading: popularGoogleFonts.find(f => f.family === 'Dancing Script')!,
    body: popularGoogleFonts.find(f => f.family === 'Lato')!,
    description: 'Personal touch with handwritten headings and clean body text'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    heading: popularGoogleFonts.find(f => f.family === 'Inter')!,
    body: popularGoogleFonts.find(f => f.family === 'Inter')!,
    description: 'Clean and simple with a single font family'
  },
  {
    id: 'playful',
    name: 'Playful',
    heading: popularGoogleFonts.find(f => f.family === 'Fredoka One')!,
    body: popularGoogleFonts.find(f => f.family === 'Nunito')!,
    description: 'Fun and friendly with playful headings'
  },
  {
    id: 'code',
    name: 'Code',
    heading: popularGoogleFonts.find(f => f.family === 'Roboto Mono')!,
    body: popularGoogleFonts.find(f => f.family === 'Roboto Mono')!,
    description: 'Monospace fonts for technical or code-related content'
  },
   {
    id: 'editorial-modern',
    name: 'Editorial Modern',
    heading: { family: 'Fraunces', variants: ['400', '600', '700'], category: 'serif' },
    body: { family: 'Figtree', variants: ['400', '500'], category: 'sans-serif' },
    description: 'Sophisticated editorial serif with clean modern sans-serif'
  },
  {
    id: 'tech-forward',
    name: 'Tech Forward',
    heading: { family: 'Space Grotesk', variants: ['400', '600', '700'], category: 'sans-serif' },
    body: { family: 'DM Sans', variants: ['400', '500'], category: 'sans-serif' },
    description: 'Contemporary tech aesthetic with geometric precision'
  },
  {
    id: 'warm-humanist',
    name: 'Warm Humanist',
    heading: { family: 'Plus Jakarta Sans', variants: ['500', '700'], category: 'sans-serif' },
    body: { family: 'Hanken Grotesk', variants: ['400', '500'], category: 'sans-serif' },
    description: 'Friendly and approachable with humanist characteristics'
  },
  {
    id: 'refined-editorial',
    name: 'Refined Editorial',
    heading: { family: 'Newsreader', variants: ['400', '600'], category: 'serif' },
    body: { family: 'Manrope', variants: ['400', '500'], category: 'sans-serif' },
    description: 'Publishing-grade serif with refined sans-serif body'
  },
  {
    id: 'bold-contemporary',
    name: 'Bold Contemporary',
    heading: { family: 'Clash Display', variants: ['500', '700'], category: 'display' },
    body: { family: 'Familjen Grotesk', variants: ['400', '500'], category: 'sans-serif' },
    description: 'Strong display font with clean Scandinavian-inspired body'
  },
  {
    id: 'literary-classic',
    name: 'Literary Classic',
    heading: { family: 'Literata', variants: ['500', '700'], category: 'serif' },
    body: { family: 'Source Serif Pro', variants: ['400'], category: 'serif' },
    description: 'All-serif pairing perfect for literary and publishing contexts'
  },
  {
    id: 'startup-sleek',
    name: 'Startup Sleek',
    heading: { family: 'Satoshi', variants: ['500', '700'], category: 'sans-serif' },
    body: { family: 'General Sans', variants: ['400', '500'], category: 'sans-serif' },
    description: 'Modern startup aesthetic with personality and clarity'
  },
  {
    id: 'code-clean',
    name: 'Code Clean',
    heading: { family: 'JetBrains Mono', variants: ['500', '700'], category: 'monospace' },
    body: { family: 'IBM Plex Mono', variants: ['400'], category: 'monospace' },
    description: 'Developer-focused monospace pairing for technical content'
  },
  {
    id: 'nordic-minimal',
    name: 'Nordic Minimal',
    heading: { family: 'Schibsted Grotesk', variants: ['500', '700'], category: 'sans-serif' },
    body: { family: 'Figtree', variants: ['400'], category: 'sans-serif' },
    description: 'Scandinavian-inspired minimalism with excellent legibility'
  },
  {
    id: 'architectural-bold',
    name: 'Architectural Bold',
    heading: { family: 'Cabinet Grotesk', variants: ['700', '800'], category: 'display' },
    body: { family: 'Space Grotesk', variants: ['400', '500'], category: 'sans-serif' },
    description: 'Strong architectural presence with geometric consistency'
  }
];
// Utility functions
export function generateCSSVariables(theme: CustomTheme): string {
  const { palette, customColors } = theme;
  
  const vars: string[] = [];
  
  // Primary colors
  const primaryColors = customColors?.primary ? 
    generateColorShades(customColors.primary) : palette.primary;
  Object.entries(primaryColors).forEach(([shade, color]) => {
    vars.push(`--color-primary-${shade}: ${color};`);
  });
  
  // Secondary colors
  const secondaryColors = customColors?.secondary ? 
    generateColorShades(customColors.secondary) : palette.secondary;
  Object.entries(secondaryColors).forEach(([shade, color]) => {
    vars.push(`--color-secondary-${shade}: ${color};`);
  });
  
  // tertiary colors
  const tertiaryColors = customColors?.tertiary ? 
    generateColorShades(customColors.tertiary) : palette.tertiary;
  Object.entries(tertiaryColors).forEach(([shade, color]) => {
    vars.push(`--color-tertiary-${shade}: ${color};`);
  });
  
  // Surface colors
  const surfaceColors = customColors?.surface ? 
    generateColorShades(customColors.surface) : palette.surface;
  Object.entries(surfaceColors).forEach(([shade, color]) => {
    vars.push(`--color-surface-${shade}: ${color};`);
  });
  
  return `:root {\n  ${vars.join('\n  ')}\n}`;
}

export function generateColorShades(baseColor: string): ColorPalette['primary'] {
  // This is a simplified version - in production, you'd use a proper color manipulation library
  // For now, returning a basic scale
  return {
    50: lighten(baseColor, 0.95),
    100: lighten(baseColor, 0.85),
    200: lighten(baseColor, 0.75),
    300: lighten(baseColor, 0.65),
    400: lighten(baseColor, 0.35),
    500: baseColor,
    600: darken(baseColor, 0.15),
    700: darken(baseColor, 0.25),
    800: darken(baseColor, 0.35),
    900: darken(baseColor, 0.45),
    950: darken(baseColor, 0.55)
  };
}

function lighten(color: string, amount: number): string {
  // Simplified lightening - in production use a proper color library
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + Math.round(255 * amount));
  const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + Math.round(255 * amount));
  const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function darken(color: string, amount: number): string {
  // Simplified darkening - in production use a proper color library
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function loadGoogleFont(font: GoogleFont, variants: string[] = ['400']): void {
  const fontName = font.family.replace(/ /g, '+');
  const variantString = variants.join(',');
  const url = `https://fonts.googleapis.com/css2?family=${fontName}:wght@${variantString}&display=swap`;
  
  // Check if font is already loaded
  const existingLink = document.querySelector(`link[href*="${fontName}"]`);
  if (existingLink) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}