<script lang="ts">
    import { browser } from '$app/environment'; // Import browser check if needed for font loading outside SSR
  
    // Type definitions (unchanged)
    interface ColorPalette {
      id: string;
      name: string;
      primary: string;
      secondary: string;
      accent: string;
      lightPrimary?: string; // Optional for backward compatibility
      darkBackground?: string;
      lightBackground?: string;
      lightText?: string;
      darkText?: string;
      dark?: string;
      light?: string;
      grayDark?: string;
      grayLight?: string;
    }
  
    interface FontPair {
      id: string;
      heading: string;
      body: string;
      description: string;
    }
  
    interface AccentColor {
      name: string;
      hex: string;
    }
  
    // --- Data Definitions (unchanged) ---
  
    // Define multiple color palettes
    const colorPalettes: ColorPalette[] = [
      {
        id: 'default',
        name: 'Default Palette',
        primary: '#5D3FD3', // Deep Purple
        secondary: '#2A9D8F', // Teal
        accent: '#FF5E5B', // Vibrant Coral
        lightPrimary: '#8B73E6', // Lighter Purple for hover states
        darkBackground: '#121212', // Dark background option
        lightBackground: '#F5F5F5', // Light background option
        lightText: '#FFFFFF',
        darkText: '#333333',
      },
      {
        id: 'punk',
        name: 'Punk Palette',
        primary: '#E71D36', // Vibrant red
        secondary: '#2EC4B6', // Teal with attitude
        accent: '#FF9F1C', // Energetic orange
        dark: '#121212', // Near black
        light: '#F7F7F2', // Off-white
        grayDark: '#252627', // Dark gray
        grayLight: '#fce9eb', // Light gray
      },
      {
        id: 'retro',
        name: 'Retro Palette',
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        dark: '#1A1A1A',
        light: '#F9F9F9',
        grayDark: '#333333',
        grayLight: '#fce9eb',
      }
    ];
  
    // Font pairings
    const fontPairings: FontPair[] = [
      {
        id: 'modern',
        heading: 'Montserrat',
        body: 'Open Sans',
        description: 'Modern and clean pairing for a contemporary look',
      },
      {
        id: 'elegant',
        heading: 'Playfair Display',
        body: 'Source Sans Pro',
        description: 'Elegant serif-sans pairing with classical appeal',
      },
      {
        id: 'bold',
        heading: 'Poppins',
        body: 'Roboto',
        description: 'Bold and straightforward for maximum readability',
      },
      {
        id: 'creative',
        heading: 'Abril Fatface',
        body: 'Nunito',
        description: 'Creative pairing with character for artistic events',
      },
      {
        id: 'artistic',
        heading: 'Fredoka',
        body: 'Figtree',
        description: 'Playful and bold for artistic expression',
      }
    ];
  
    // Accent color options
    const accentColors: AccentColor[] = [
      { name: 'Vibrant Coral', hex: '#FF5E5B' },
      { name: 'Electric Blue', hex: '#00A3FF' },
      { name: 'Lime Green', hex: '#AAFF00' },
      { name: 'Sunshine Yellow', hex: '#FFD000' },
      { name: 'Hot Pink', hex: '#FF3D8C' },
    ];
  
  
    // --- Svelte 5 State Management ---
  
    // Use $state for variables whose *assignment* should trigger reactivity
    let activePalette = $state<ColorPalette>(colorPalettes[0]);
    let activeFontPair = $state<FontPair>(fontPairings[0]);
  
    // Use $state for the accent color override, initialized from the active palette
    let selectedAccentColorHex = $state<string>(activePalette.accent);
  
    // Use $derived for values that *automatically* recalculate when their dependencies ($state) change
    // Here, `colors` depends on `activePalette` and the overridden `selectedAccentColorHex`
    let colors = $derived({
      ...activePalette, // Spread all properties from the current palette
      accent: selectedAccentColorHex // Override the accent color with the selected one
    });
  
    // --- Functions to Update State ---
  
    // Function to update the selected accent color state
    function updateAccentColor(newColor: string): void {
      selectedAccentColorHex = newColor; // Assigning to $state triggers updates
    }
  
    // Function to update the font pairing state
    function updateFontPairing(pairingId: string): void {
      const newPair = fontPairings.find((pair) => pair.id === pairingId);
      if (newPair) {
        activeFontPair = newPair; // Assigning to $state triggers updates
      }
    }
  
    // Function to update the color palette state
    function updateColorPalette(paletteId: string): void {
      const newPalette = colorPalettes.find((palette) => palette.id === paletteId);
      if (newPalette) {
        activePalette = newPalette; // Assigning to $state triggers updates
        // Also reset the selected accent color to the new palette's default accent
        selectedAccentColorHex = newPalette.accent;
      }
    }
  
  </script>
  
  <!-- Template (Markup) remains largely the same -->
  <!-- It will automatically react to changes in `activePalette`, `activeFontPair`, and `colors` -->
  
  <div class="flex flex-col items-center w-full bg-gray-50 p-6 space-y-8">
    <!-- Color Palette Switcher -->
    <div class="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-3">Color Palettes</h2>
      <p class="mb-4 text-gray-600">Select a color palette to see how it transforms the interface.</p>
      <div class="flex flex-wrap gap-3">
        {#each colorPalettes as palette}
          <button
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            style="background-color: {activePalette.id === palette.id ? colors.primary : '#EDE9FC'};
                   color: {activePalette.id === palette.id ? colors.lightText ?? '#FFFFFF' : colors.primary};"
            onclick={() => updateColorPalette(palette.id)}
          >
            {palette.name}
          </button>
        {/each}
      </div>
    </div>
  
    <!-- Header with color palette -->
    <div class="w-full">
      <h1 class="text-2xl font-bold mb-4">Concert Organizer Color Palette</h1>
      <div class="flex flex-wrap gap-4 mb-8">
       
        <div class="flex flex-col items-center">
          <div class="w-24 h-24 rounded-lg shadow-md" style="background-color: {colors.primary};"></div>
          <p class="mt-2 text-sm font-medium">Primary</p>
          <p class="text-xs text-gray-500">{colors.primary}</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-24 h-24 rounded-lg shadow-md" style="background-color: {colors.secondary};"></div>
          <p class="mt-2 text-sm font-medium">Secondary</p>
          <p class="text-xs text-gray-500">{colors.secondary}</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-24 h-24 rounded-lg shadow-md" style="background-color: {colors.accent};"></div>
          <p class="mt-2 text-sm font-medium">Accent</p>
          <p class="text-xs text-gray-500">{colors.accent}</p>
        </div>
        {#if colors.lightPrimary}
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-lg shadow-md" style="background-color: {colors.lightPrimary};"></div>
            <p class="mt-2 text-sm font-medium">Light Primary</p>
            <p class="text-xs text-gray-500">{colors.lightPrimary}</p>
          </div>
        {/if}
        {#if colors.darkBackground || colors.dark}
          <div class="flex flex-col items-center">
            <div
              class="w-24 h-24 rounded-lg shadow-md"
              style="background-color: {colors.darkBackground ?? colors.dark};"
            ></div>
            <p class="mt-2 text-sm font-medium">Dark Background</p>
            <p class="text-xs text-gray-500">{colors.darkBackground ?? colors.dark}</p>
          </div>
        {/if}
        {#if colors.lightBackground || colors.light}
          <div class="flex flex-col items-center">
            <div
              class="w-24 h-24 rounded-lg shadow-md"
              style="background-color: {colors.lightBackground ?? colors.light};"
            ></div>
            <p class="mt-2 text-sm font-medium">Light Background</p>
            <p class="text-xs text-gray-500">{colors.lightBackground ?? colors.light}</p>
          </div>
        {/if}
        {#if colors.lightText}
          <div class="flex flex-col items-center">
            <div
              class="w-24 h-24 rounded-lg shadow-md"
              style="background-color: {colors.lightText};"
            ></div>
            <p class="mt-2 text-sm font-medium">Light Text</p>
            <p class="text-xs text-gray-500">{colors.lightText}</p>
          </div>
        {/if}
        {#if colors.darkText}
          <div class="flex flex-col items-center">
            <div
              class="w-24 h-24 rounded-lg shadow-md"
              style="background-color: {colors.darkText};"
            ></div>
            <p class="mt-2 text-sm font-medium">Dark Text</p>
            <p class="text-xs text-gray-500">{colors.darkText}</p>
          </div>
        {/if}
        {#if colors.grayDark}
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-lg shadow-md" style="background-color: {colors.grayDark};"></div>
            <p class="mt-2 text-sm font-medium">Gray Dark</p>
            <p class="text-xs text-gray-500">{colors.grayDark}</p>
          </div>
        {/if}
        {#if colors.grayLight}
          <div class="flex flex-col items-center">
            <div
              class="w-24 h-24 rounded-lg shadow-md"
              style="background-color: {colors.grayLight};"
            ></div>
            <p class="mt-2 text-sm font-medium">Gray Light</p>
            <p class="text-xs text-gray-500">{colors.grayLight}</p>
          </div>
        {/if}
      </div>
    </div>
  
    <!-- Accent Color Tester -->
    <div class="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-3">Accent Color Options</h2>
      <p class="mb-4 text-gray-600">Click on any color to see how it looks throughout the interface.</p>
      <div class="flex flex-wrap gap-3">
        {#each accentColors as color}
          <button
            class="p-2 rounded-lg flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            style="background-color: {color.hex}; color: {colors.darkText ?? '#333333'}; border: 2px solid {colors.accent === color.hex ? colors.primary : 'transparent'};"
            onclick={() => updateAccentColor(color.hex)}
          >
            <div class="w-16 h-8 mb-1 rounded" style="background-color: {color.hex};"></div>
            <span class="text-xs font-medium">{color.name}</span>
            <span class="text-xs">{color.hex}</span>
          </button>
        {/each}
      </div>
    </div>
  
    <!-- Font Pairing Tester -->
    <div class="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-3">Font Pairings</h2>
      <p class="mb-4 text-gray-600">Select different font combinations to find the right style for your application.</p>
  
      <div class="flex flex-wrap gap-3 mb-6">
        {#each fontPairings as pair}
          <button
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            style="background-color: {activeFontPair.id === pair.id ? colors.primary : '#EDE9FC'};
                   color: {activeFontPair.id === pair.id ? colors.lightText ?? '#FFFFFF' : colors.primary};"
            onclick={() => updateFontPairing(pair.id)}
          >
            {pair.heading}/{pair.body}
          </button>
        {/each}
      </div>
  
      <div class="p-4 border rounded-lg">
        <h3
          class="text-xl mb-2"
          style="font-family: '{activeFontPair.heading}', sans-serif; color: {colors.darkText ?? '#333333'};"
        >
          This is a heading in {activeFontPair.heading}
        </h3>
        <p
          class="mb-4"
          style="font-family: '{activeFontPair.body}', sans-serif; color: {colors.darkText ?? '#333333'};"
        >
          This is body text in {activeFontPair.body}. This demonstrates how the text will appear in your application with this font pairing. The right combination should create visual hierarchy while maintaining readability.
        </p>
        <div class="text-sm text-gray-500 italic" style="font-family: '{activeFontPair.body}', sans-serif;">{activeFontPair.description}</div>
      </div>
    </div>
  
    <!-- Demo Navbar -->
    <div class="w-full rounded-lg overflow-hidden shadow-md">
      <div
        class="w-full px-4 py-3 flex justify-between items-center"
        style="background-color: {colors.primary};"
      >
        <div class="flex items-center">
          <div
            class="font-bold text-lg"
            style="color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.heading}', sans-serif;"
          >
            CONCERT•HUB
          </div>
        </div>
        <div class="flex items-center space-x-6">
          <div
            class="text-sm font-medium"
            style="color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.body}', sans-serif;"
          >
            Discover
          </div>
          <div
            class="text-sm font-medium"
            style="color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.body}', sans-serif;"
          >
            Events
          </div>
          <div
            class="text-sm font-medium"
            style="color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.body}', sans-serif;"
          >
            Create
          </div>
          <div
            class="px-3 py-1 rounded text-sm font-medium"
            style="background-color: {colors.accent}; color: {colors.darkText ?? '#333333'}; font-family: '{activeFontPair.body}', sans-serif;"
          >
            Sign In
          </div>
        </div>
      </div>
    </div>
  
    <!-- Event Card -->
    <div class="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
      <div class="h-48 bg-gray-300 relative"> 
        <div
          class="absolute top-4 left-4 px-3 py-1 rounded text-xs font-bold"
          style="background-color: {colors.accent}; color: {colors.darkText ?? '#333333'}; font-family: '{activeFontPair.heading}', sans-serif;"
        >
          FEATURED
        </div>
        <div
          class="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
          style="background-color: {colors.secondary}; color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.body}', sans-serif;"
        >
          APR 25
        </div>
      </div>
      <div class="p-4">
        <h3
          class="font-bold text-lg mb-1"
          style="font-family: '{activeFontPair.heading}', sans-serif;"
        >
          Neon Wasteland Festival
        </h3>
        <p
          class="text-gray-600 text-sm mb-4"
          style="font-family: '{activeFontPair.body}', sans-serif;"
        >
          The Underground • Los Angeles, CA
        </p>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-1">
            <span
              class="text-xs font-medium px-2 py-1 rounded"
              style="background-color: {colors.grayLight ?? '#EDE9FC'}; color: {colors.primary}; font-family: '{activeFontPair.body}', sans-serif;"
            >
              Rock
            </span>
            <span
              class="text-xs font-medium px-2 py-1 rounded"
              style="background-color: {colors.grayLight ?? '#EDE9FC'}; color: {colors.primary}; font-family: '{activeFontPair.body}', sans-serif;"
            >
              Punk
            </span>
            <span
              class="text-xs font-medium px-2 py-1 rounded"
              style="background-color: {colors.grayLight ?? '#EDE9FC'}; color: {colors.primary}; font-family: '{activeFontPair.body}', sans-serif;"
            >
              Alternative
            </span>
          </div>
          <div
            class="text-sm font-bold"
            style="color: {colors.secondary}; font-family: '{activeFontPair.body}', sans-serif;"
          >
            $45-85
          </div>
        </div>
        <button
          class="w-full py-2 rounded font-medium text-center"
          style="background-color: {colors.primary}; color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.heading}', sans-serif;"
        >
          Get Tickets
        </button>
      </div>
    </div>
  
    <!-- Create Event Button -->
    <div class="w-full max-w-md flex justify-center mt-4">
      <button
        class="px-8 py-3 rounded-lg font-bold text-center"
        style="background-color: {colors.accent}; color: {colors.darkText ?? '#333333'}; font-family: '{activeFontPair.heading}', sans-serif;"
      >
        + Create New Event
      </button>
    </div>
  
    <!-- Dark Mode Sample -->
    <div
      class="w-full max-w-md rounded-lg overflow-hidden shadow-lg p-4 mt-8"
      style="background-color: {colors.darkBackground ?? colors.dark ?? '#121212'};"
    >
      <h3
        class="font-bold text-lg mb-2"
        style="color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.heading}', sans-serif;"
      >
        Dark Mode Example
      </h3>
      <p
        class="mb-4"
        style="color: {colors.lightText ? `rgba(${parseInt(colors.lightText.slice(1,3), 16)}, ${parseInt(colors.lightText.slice(3,5), 16)}, ${parseInt(colors.lightText.slice(5,7), 16)}, 0.7)` : 'rgba(255,255,255,0.7)'}; font-family: '{activeFontPair.body}', sans-serif;"
      >
        Your platform could also offer a dark mode option that's perfect for browsing upcoming events.
      </p>
      <div class="flex space-x-2">
        <button
          class="px-4 py-2 rounded font-medium"
          style="background-color: {colors.lightPrimary ?? colors.primary}; color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.body}', sans-serif;"
        >
          Browse Events
        </button>
        <button
          class="px-4 py-2 rounded font-medium border"
          style="border-color: {colors.accent}; color: {colors.accent}; font-family: '{activeFontPair.body}', sans-serif;"
        >
          Learn More
        </button>
      </div>
    </div>
  
    <!-- Notification Banner -->
    <div
      class="w-full max-w-md rounded-lg overflow-hidden shadow-md p-4"
      style="background-color: {colors.accent};"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h4
            class="font-bold text-md mb-1"
            style="color: {colors.darkText ?? '#333333'}; font-family: '{activeFontPair.heading}', sans-serif;"
          >
            New Event Alert!
          </h4>
          <p
            class="text-sm"
            style="color: {colors.darkText ?? '#333333'}; font-family: '{activeFontPair.body}', sans-serif;"
          >
            Tickets for Summer Sound Festival are now available. Limited early bird tickets!
          </p>
        </div>
        <button
          class="ml-4 px-3 py-1 rounded font-medium text-sm"
          style="background-color: {colors.primary}; color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.body}', sans-serif;"
        >
          View
        </button>
      </div>
    </div>
  
    <!-- Form Element Sample -->
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      <h3
        class="font-bold text-lg mb-4"
        style="color: {colors.darkText ?? '#333333'}; font-family: '{activeFontPair.heading}', sans-serif;"
      >
        Form Elements
      </h3>
  
      <div class="mb-4">
        <label
          for="event-name"
          class="block text-sm font-medium mb-1"
          style="color: {colors.darkText ?? '#333333'}; font-family: '{activeFontPair.body}', sans-serif;"
        >
          Event Name
        </label>
        <input
          id="event-name"
          type="text"
          class="w-full p-2 border rounded"
          style="border-color: {colors.primary}; font-family: '{activeFontPair.body}', sans-serif;"
          placeholder="Enter event name"
        />
      </div>
  
      <div class="mb-4">
        <label
          for="event-category"
          class="block text-sm font-medium mb-1"
          style="color: {colors.darkText ?? '#333333'}; font-family: '{activeFontPair.body}', sans-serif;"
        >
          Event Category
        </label>
        <select
          id="event-category"
          class="w-full p-2 border rounded"
          style="border-color: {colors.primary}; font-family: '{activeFontPair.body}', sans-serif;"
        >
          <option>Music Concert</option>
          <option>Festival</option>
          <option>Workshop</option>
          <option>Exhibition</option>
        </select>
      </div>
  
      <div class="flex justify-end">
        <button
          class="px-4 py-2 rounded font-medium"
          style="background-color: {colors.secondary}; color: {colors.lightText ?? '#FFFFFF'}; font-family: '{activeFontPair.body}', sans-serif;"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  
  <style>
    /* Import fonts */
    /* Ensure fonts are loaded. If using SSR without specific font handling, */
    /* consider conditional loading or preloading. */
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&family=Playfair+Display:wght@400;700&family=Source+Sans+Pro:wght@400;600&family=Poppins:wght@400;600;700&family=Roboto:wght@400;500;700&family=Figtree:ital,wght@0,300..900;1,300..900&family=Fredoka:wght@300..700&family=Abril+Fatface&family=Nunito:wght@400;600;700&display=swap');
  
    /* Add generic font fallbacks in style attributes for robustness */
    h1, h2, h3, h4, h5, h6 {
      /* Example: Apply heading font generally if needed, though inline styles override */
    }
    body, p, span, div, button, input, select, label {
       /* Example: Apply body font generally if needed */
    }
  </style>