<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    label: string;
    value: string;
    onchange: (color: string) => void;
  }

  let { label, value, onchange }: Props = $props();
  
  let showPicker = $state(false);
  let inputRef: HTMLInputElement;
  let colorInput = $state(value);

  // Generate unique IDs for accessibility
  const uniqueIdSuffix = Math.random().toString(36).substring(2, 15);
  const textInputId = `color-picker-text-${uniqueIdSuffix}`;
  const hueSliderId = `hue-slider-${uniqueIdSuffix}`;
  const saturationSliderId = `saturation-slider-${uniqueIdSuffix}`;
  const lightnessSliderId = `lightness-slider-${uniqueIdSuffix}`;
  
  // Popular color presets
  const colorPresets = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#FF7F50', '#87CEEB', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA', '#F1948A'
  ];

  // Update internal state when prop changes
  $effect(() => {
    colorInput = value;
  });

  function handleColorChange(newColor: string) {
    colorInput = newColor;
    onchange(newColor);
  }

  function handleInputChange() {
    if (inputRef && inputRef.value) {
      handleColorChange(inputRef.value);
    }
  }

  onMount(() => {
    // Close picker when clicking outside
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (showPicker && !target.closest('.color-picker-container')) {
        showPicker = false;
      }
    }
    
    document.addEventListener('click', handleClickOutside, true); // Use capture phase for reliable outside click
    return () => document.removeEventListener('click', handleClickOutside, true);
  });


    // Color conversion utilities (assuming these are correct and used as intended)
  function hexToHsl(hex: string): { h: number, s: number, l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  function hslToHex(hsl: { h: number, s: number, l: number }): string {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hexVal = Math.round(c * 255).toString(16);
      return hexVal.length === 1 ? '0' + hexVal : hexVal;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
</script>

<div class="color-picker-container relative">
  <label 
    for={textInputId} 
    class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2"
  >
    {label}
  </label>
  
  <div class="flex items-center space-x-3">
    <!-- Color Display & Picker Trigger -->
    <button
      type="button" 
      class="relative w-12 h-10 rounded-lg border-2 border-surface-200 dark:border-surface-600 shadow-sm hover:border-surface-300 dark:hover:border-surface-500 transition-colors overflow-hidden"
      style="background-color: {colorInput};"
      onclick={() => showPicker = !showPicker}
      aria-label="Open color picker. Current color is {colorInput}" 
      aria-expanded={showPicker}
    >
      <!-- Checkerboard pattern for transparency -->
      <div class="absolute inset-0 opacity-20" aria-hidden="true">
        <div class="w-full h-full" style="background-image: repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 8px 8px;"></div>
      </div>
      
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity" aria-hidden="true"></div>
    </button>
    
    <!-- Text Input -->
    <input
      bind:this={inputRef}
      id={textInputId} 
      type="text"
      value={colorInput}
      placeholder="#RRGGBB" 
      class="flex-1 px-3 py-2 border border-surface-200 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      onchange={handleInputChange}
      oninput={(e) => {
        const target = e.target as HTMLInputElement;
        colorInput = target.value; // Update reactive variable for immediate feedback if desired
        if (target.value.match(/^#[0-9A-Fa-f]{6}$/i)) { // Case-insensitive match
          handleColorChange(target.value);
        }
        // Potentially add validation/error state if not a valid hex
      }}
      maxlength="7"
    />
    
    <!-- Native Color Input (Hidden, used for native picker on some devices) -->
    <input
      type="color"
      value={colorInput}
      class="w-0 h-0 opacity-0 absolute"
      onchange={(e) => {
        const target = e.target as HTMLInputElement;
        handleColorChange(target.value);
      }}
      oninput={(e) => { // Also use oninput for better responsiveness for native picker
        const target = e.target as HTMLInputElement;
        handleColorChange(target.value);
      }}
      onclick={(e) => e.stopPropagation()}
      tabindex="-1" 
      aria-hidden="true" 
    />
  </div>
  
  <!-- Color Picker Dropdown -->
  {#if showPicker}
    <div 
        class="absolute top-full left-0 mt-2 p-4 bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 z-50 min-w-64"
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="color-picker-heading" 
    >
      <h3 id="color-picker-heading" class="sr-only">Color Picker Options</h3> 
      <!-- Color Presets -->
      <div class="mb-4">
        <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Color Presets</h4>
        <div class="grid grid-cols-5 gap-2">
          {#each colorPresets as preset (preset)}
            <button
              type="button"
              class="w-10 h-10 rounded-lg border-2 border-surface-200 dark:border-surface-600 hover:border-surface-400 dark:hover:border-surface-400 transition-colors shadow-sm"
              style="background-color: {preset};"
              onclick={() => handleColorChange(preset)}
              aria-label="Select color {preset}" 
            ></button>
          {/each}
        </div>
      </div>
      
      <!-- HSL Sliders -->
      <div class="space-y-3">
        <div>
          <label for={hueSliderId} class="block text-xs font-medium text-surface-600 dark:text-surface-400 mb-1">
            Hue
          </label>
          <input
            id={hueSliderId}
            type="range"
            min="0"
            max="360"
            value={hexToHsl(colorInput).h}
            class="w-full h-2 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 rounded-lg appearance-none cursor-pointer"
            oninput={(e) => {
              const target = e.target as HTMLInputElement;
              const hsl = hexToHsl(colorInput);
              hsl.h = parseInt(target.value);
              handleColorChange(hslToHex(hsl));
            }}
          />
        </div>
        
        <div>
          <label for={saturationSliderId} class="block text-xs font-medium text-surface-600 dark:text-surface-400 mb-1">
            Saturation
          </label>
          <input
            id={saturationSliderId}
            type="range"
            min="0"
            max="100"
            value={hexToHsl(colorInput).s}
            class="w-full h-2 bg-gradient-to-r from-gray-500 to-current rounded-lg appearance-none cursor-pointer"
            style="--tw-gradient-to: hsl({hexToHsl(colorInput).h}, 100%, 50%);"
            oninput={(e) => {
              const target = e.target as HTMLInputElement;
              const hsl = hexToHsl(colorInput);
              hsl.s = parseInt(target.value);
              handleColorChange(hslToHex(hsl));
            }}
          />
        </div>
        
        <div>
          <label for={lightnessSliderId} class="block text-xs font-medium text-surface-600 dark:text-surface-400 mb-1">
            Lightness
          </label>
          <input
            id={lightnessSliderId}
            type="range"
            min="0"
            max="100"
            value={hexToHsl(colorInput).l}
            class="w-full h-2 bg-gradient-to-r from-black via-current to-white rounded-lg appearance-none cursor-pointer"
            style="--tw-gradient-via: hsl({hexToHsl(colorInput).h}, {hexToHsl(colorInput).s}%, 50%);"
            oninput={(e) => {
              const target = e.target as HTMLInputElement;
              const hsl = hexToHsl(colorInput);
              hsl.l = parseInt(target.value);
              handleColorChange(hslToHex(hsl));
            }}
          />
        </div>
      </div>
      
      <!-- Color Info -->
      <div class="mt-4 pt-3 border-t border-surface-200 dark:border-surface-600">
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span class="text-surface-500 dark:text-surface-400">HEX:</span>
            <span class="text-surface-900 dark:text-surface-100 font-mono ml-1">{colorInput}</span>
          </div>
          <div>
            <span class="text-surface-500 dark:text-surface-400">HSL:</span>
            <span class="text-surface-900 dark:text-surface-100 font-mono ml-1">
              {hexToHsl(colorInput).h}, {hexToHsl(colorInput).s}%, {hexToHsl(colorInput).l}%
            </span>
          </div>
        </div>
      </div>
      <button 
        type="button" 
        class="mt-4 w-full px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        onclick={() => showPicker = false}
      >
        Done
      </button>
    </div>
  {/if}
</div>


<style>
  /* Custom slider styles */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent; /* Ensure custom track styles are visible */
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    border: 2px solid #cbd5e1; /* Example border, adjust to your theme */
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0,0,0,0.06); /* Softer shadow */
    margin-top: -7px; /* Adjust to center thumb on track */
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    border: 2px solid #cbd5e1; /* Example border, adjust to your theme */
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0,0,0,0.06);
  }

  /* Add this for screen-reader only text */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>