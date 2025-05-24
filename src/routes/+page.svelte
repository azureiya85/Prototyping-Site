<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import ColorPicker from '$lib/components/atoms/ColorPicker.svelte';
import FontSelector from '$lib/components/atoms/FontSelector.svelte'; 
import ThemePreview from '$lib/components/atoms/ThemePreview.svelte';
 import { type CustomTheme, type ColorPalette, type FontPair, defaultColorPalettes, defaultFontPairings, generateCSSVariables, loadGoogleFont } from '$lib/components/data/CustomStyle.ts';
 import { Pagination } from '@skeletonlabs/skeleton-svelte'; 
 
 // Theme state
   // Define the specific keys and an array of these keys
  type ColorThemeKey = 'primary' | 'secondary' | 'tertiary' | 'surface';
  const colorThemeKeys: readonly ColorThemeKey[] = ['primary', 'secondary', 'tertiary', 'surface'] as const;

  // Theme state
  let currentTheme = $state<CustomTheme>({
    palette: defaultColorPalettes[0],
    fonts: defaultFontPairings[0],
    customColors: {}
  });

  // Color picker states
   let activeTab = $state<'colors' | 'fonts' | 'preview'>('colors');
  let darkMode = $state(false);

  // Color picker states
  let showColorPickers = $state({
    primary: false,
    secondary: false,
    tertiary: false,
    surface: false
  });

  // CSS variables for live preview
  let themeCSS = $derived(generateCSSVariables(currentTheme));

  // Load fonts when font pairing changes
  $effect(() => {
    if (browser) {
      loadGoogleFont(currentTheme.fonts.heading, ['400', '600', '700']);
      loadGoogleFont(currentTheme.fonts.body, ['400', '500', '600']);
    }
  });
 // Load fonts when font pairing changes
  $effect(() => {
    if (browser) {
      loadGoogleFont(currentTheme.fonts.heading, ['400', '600', '700']);
      loadGoogleFont(currentTheme.fonts.body, ['400', '500', '600']);
    }
  });

    function updateColorPalette(paletteId: string) {
    const palette = defaultColorPalettes.find(p => p.id === paletteId);
    if (palette) {
      currentTheme = {
        ...currentTheme,
        palette,
        customColors: {} // Reset custom colors when switching palettes
      };
    }
  }

  function updateFontPairing(pairingId: string) {
    const fontPair = defaultFontPairings.find(f => f.id === pairingId);
    if (fontPair) {
      currentTheme = {
        ...currentTheme,
        fonts: fontPair
      };
    }
  }

  // Ensure this function's parameter matches ColorThemeKey
  function updateCustomColor(colorType: ColorThemeKey, color: string) {
    currentTheme = {
      ...currentTheme,
      customColors: {
        ...currentTheme.customColors,
        [colorType]: color // This is now type-safe
      }
    };
  }

  function resetCustomColors() {
    currentTheme = {
      ...currentTheme,
      customColors: {}
    };
  }

  function exportTheme() {
    const themeData = {
      ...currentTheme,
      css: themeCSS,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${currentTheme.palette.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyCSS() {
    if (browser) { // Ensure navigator is available
        navigator.clipboard.writeText(themeCSS);
        // You could add a toast notification here
    }
  }

  onMount(() => {
    // Apply initial theme
    if (browser) {
      const style = document.createElement('style');
      style.id = 'theme-variables';
      document.head.appendChild(style);
    }
  });

  // Update CSS variables when theme changes
  $effect(() => {
    if (browser) {
      const styleElement = document.getElementById('theme-variables');
      if (styleElement) {
        styleElement.textContent = themeCSS;
      }
    }
  });

 // Font pagination state
let fontPage = $state(1);
const fontPageSize = 6;

// Paginated font pairings - use $derived.by for proper typing
const paginatedFontPairings = $derived.by(() => {
  const startIndex = (fontPage - 1) * fontPageSize;
  return defaultFontPairings.slice(startIndex, startIndex + fontPageSize);
});

</script>

<div class="min-h-screen bg-surface-50 dark:bg-surface-900" class:dark={darkMode}>
  <!-- Header -->
  <header class="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-tertiary-500 rounded-lg"></div>
            <h1 class="text-xl font-bold text-surface-900 dark:text-surface-100" 
                style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
              Prototype Designer
            </h1>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Dark mode toggle -->
          <button
            class="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            onclick={() => darkMode = !darkMode}
          >
            {#if darkMode}
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
              </svg>
            {:else}
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            {/if}
          </button>
          
          <!-- Export buttons -->
          <button
            class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
            onclick={exportTheme}
          >
            Export Theme
          </button>
          
          <button
            class="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-medium transition-colors"
            onclick={copyCSS}
          >
            Copy CSS
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Tab Navigation -->
    <div class="flex space-x-1 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg mb-8">
      <button
        class="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all"
        class:bg-white={activeTab === 'colors'}
        class:dark:bg-surface-700={activeTab === 'colors'}
        class:text-primary-600={activeTab === 'colors'}
        class:shadow-sm={activeTab === 'colors'}
        class:text-surface-600={activeTab !== 'colors'}
        class:dark:text-surface-400={activeTab !== 'colors'}
        onclick={() => activeTab = 'colors'}
      >
        Colors
      </button>
      <button
        class="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all"
        class:bg-white={activeTab === 'fonts'}
        class:dark:bg-surface-700={activeTab === 'fonts'}
        class:text-primary-600={activeTab === 'fonts'}
        class:shadow-sm={activeTab === 'fonts'}
        class:text-surface-600={activeTab !== 'fonts'}
        class:dark:text-surface-400={activeTab !== 'fonts'}
        onclick={() => activeTab = 'fonts'}
      >
        Typography
      </button>
      <button
        class="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all"
        class:bg-white={activeTab === 'preview'}
        class:dark:bg-surface-700={activeTab === 'preview'}
        class:text-primary-600={activeTab === 'preview'}
        class:shadow-sm={activeTab === 'preview'}
        class:text-surface-600={activeTab !== 'preview'}
        class:dark:text-surface-400={activeTab !== 'preview'}
        onclick={() => activeTab = 'preview'}
      >
        Preview
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Controls Panel -->
      <div class="lg:col-span-1 space-y-6">
        {#if activeTab === 'colors'}
          <!-- Color Palette Selection -->
          <div class="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm border border-surface-200 dark:border-surface-700">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Base Palettes</h3>
            <div class="grid grid-cols-1 gap-3">
              {#each defaultColorPalettes as palette}
                <button
                  class="p-4 rounded-lg border-2 transition-all text-left"
                  class:border-primary-500={currentTheme.palette.id === palette.id}
                  class:bg-primary-50={currentTheme.palette.id === palette.id}
                  class:dark:bg-primary-900={currentTheme.palette.id === palette.id}
                  class:border-surface-200={currentTheme.palette.id !== palette.id}
                  class:dark:bg-opacity-20={currentTheme.palette.id === palette.id}                  
                  onclick={() => updateColorPalette(palette.id)}
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-surface-900 dark:text-surface-100">{palette.name}</span>
                    <div class="flex space-x-1">
                      <div class="w-4 h-4 rounded-full" style="background-color: {palette.primary[500]};"></div>
                      <div class="w-4 h-4 rounded-full" style="background-color: {palette.secondary[500]};"></div>
                      <div class="w-4 h-4 rounded-full" style="background-color: {palette.tertiary[500]};"></div>
                    </div>
                  </div>
                </button>
              {/each}
            </div>
          </div>

          <!-- Custom Color Pickers -->
        <div class="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm border border-surface-200 dark:border-surface-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100">Custom Colors</h3>
              <button
                class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                onclick={resetCustomColors}
              >
                Reset
              </button>
            </div>
            
            <div class="space-y-4">
              {#each colorThemeKeys as colorType} 
                <ColorPicker
                  label={colorType.charAt(0).toUpperCase() + colorType.slice(1)}
                  value={currentTheme.customColors?.[colorType] ?? currentTheme.palette[colorType][500]} 
                  onchange={(color) => updateCustomColor(colorType, color)} 
                />
              {/each}
            </div>
          </div>
        {/if}

        {#if activeTab === 'fonts'}
<!-- Font Pairing Selection -->
<div class="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm border border-surface-200 dark:border-surface-700">
  <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Font Pairings</h3>
  
  <!-- Paginated Font Pairings -->
  <div class="space-y-3 mb-4">
    {#each paginatedFontPairings as fontPair}
      <button
        class="w-full p-4 rounded-lg border-2 transition-all text-left"
        class:border-primary-500={currentTheme.fonts.id === fontPair.id}
        class:bg-primary-50={currentTheme.fonts.id === fontPair.id}
        class:dark:bg-primary-900={currentTheme.fonts.id === fontPair.id}
        class:dark:bg-opacity-20={currentTheme.fonts.id === fontPair.id}
        class:border-surface-200={currentTheme.fonts.id !== fontPair.id}
        class:dark:border-surface-600={currentTheme.fonts.id !== fontPair.id}
        onclick={() => updateFontPairing(fontPair.id)}
      >
        <div class="mb-2">
          <div class="font-semibold text-surface-900 dark:text-surface-100" 
               style="font-family: '{fontPair.heading.family}', sans-serif;">
            {fontPair.name}
          </div>
          <div class="text-sm text-surface-600 dark:text-surface-400" 
               style="font-family: '{fontPair.body.family}', sans-serif;">
            {fontPair.description}
          </div>
        </div>
        <div class="text-xs text-surface-500 dark:text-surface-500">
          Heading: {fontPair.heading.family} • Body: {fontPair.body.family}
        </div>
      </button>
    {/each}
  </div>

  <!-- Pagination -->
  <Pagination
    data={defaultFontPairings}
    page={fontPage}
    onPageChange={(e) => (fontPage = e.page)}
    pageSize={6}
    siblingCount={2}
    classes="justify-center"
  >
    {#snippet labelPrevious()}<span class="text-xs">‹</span>{/snippet}
    {#snippet labelNext()}<span class="text-xs">›</span>{/snippet}
    {#snippet labelEllipsis()}<span class="text-xs">…</span>{/snippet}
  </Pagination>
</div>
          <!-- Custom Font Selectors -->
          <div class="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm border border-surface-200 dark:border-surface-700">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Custom Fonts</h3>
            <div class="space-y-4">
              <FontSelector
                label="Heading Font"
                selectedFont={currentTheme.fonts.heading}
                onchange={(font) => {
                  currentTheme = {
                    ...currentTheme,
                    fonts: { ...currentTheme.fonts, heading: font, id: 'custom', name: 'Custom' }
                  };
                }}
              />
              <FontSelector
                label="Body Font"
                selectedFont={currentTheme.fonts.body}
                onchange={(font) => {
                  currentTheme = {
                    ...currentTheme,
                    fonts: { ...currentTheme.fonts, body: font, id: 'custom', name: 'Custom' }
                  };
                }}
              />
            </div>
          </div>
        {/if}

        {#if activeTab === 'preview'}
          <!-- Export Options -->
          <div class="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm border border-surface-200 dark:border-surface-700">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Export Options</h3>
            <div class="space-y-3">
              <button
                class="w-full px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors text-left"
                onclick={exportTheme}
              >
                <div class="font-medium">Export Theme JSON</div>
                <div class="text-sm text-primary-100">Complete theme configuration</div>
              </button>
              
              <button
                class="w-full px-4 py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-medium transition-colors text-left"
                onclick={copyCSS}
              >
                <div class="font-medium">Copy CSS Variables</div>
                <div class="text-sm text-secondary-100">CSS custom properties</div>
              </button>
            </div>
          </div>

          <!-- Theme Info -->
          <div class="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm border border-surface-200 dark:border-surface-700">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Theme Details</h3>
            <div class="space-y-3 text-sm">
              <div>
                <span class="text-surface-600 dark:text-surface-400">Base Palette:</span>
                <span class="text-surface-900 dark:text-surface-100 ml-1">{currentTheme.palette.name}</span>
              </div>
              <div>
                <span class="text-surface-600 dark:text-surface-400">Font Pairing:</span>
                <span class="text-surface-900 dark:text-surface-100 ml-1">{currentTheme.fonts.name}</span>
              </div>
              <div>
                <span class="text-surface-600 dark:text-surface-400">Custom Colors:</span>
                <span class="text-surface-900 dark:text-surface-100 ml-1">
                  {Object.keys(currentTheme.customColors || {}).length} override{Object.keys(currentTheme.customColors || {}).length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Preview Panel -->
      <div class="lg:col-span-2">
        <ThemePreview {currentTheme} {darkMode} />
      </div>
    </div>
  </div>
</div>

<style>
  /* :global(:root) {
    /* Default theme variables will be injected here */
  /* } */ 
  
  :global(.dark) {
    color-scheme: dark;
  }
</style>