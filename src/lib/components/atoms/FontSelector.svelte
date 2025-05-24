<script lang="ts">
  import { onMount } from 'svelte';
import { popularGoogleFonts, type GoogleFont, loadGoogleFont } from '$lib/components/data/CustomStyle.ts';
  interface Props {
    label: string;
    selectedFont: GoogleFont;
    onchange: (font: GoogleFont) => void;
  }

      
const controlId = `font-selector-trigger-${Math.random().toString(36).substring(2, 15)}`;

    

  let { label, selectedFont, onchange }: Props = $props();

  let showDropdown = $state(false);
  let searchQuery = $state('');
  let selectedCategory = $state<string>('all');
  
  // Filter fonts based on search and category
  let filteredFonts = $derived(() => {
    let fonts = popularGoogleFonts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      fonts = fonts.filter(font => font.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      fonts = fonts.filter(font => 
        font.family.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return fonts;
  });

  // Font categories for filtering
  const categories = [
    { id: 'all', name: 'All Fonts' },
    { id: 'sans-serif', name: 'Sans Serif' },
    { id: 'serif', name: 'Serif' },
    { id: 'display', name: 'Display' },
    { id: 'handwriting', name: 'Handwriting' },
    { id: 'monospace', name: 'Monospace' }
  ];

  function selectFont(font: GoogleFont) {
    // Load the font before selecting
    loadGoogleFont(font, ['400', '600']);
    onchange(font);
    showDropdown = false;
    searchQuery = '';
  }

  // Load preview fonts on mount
  onMount(() => {
    // Load a few fonts for preview
    filteredFonts().slice(0, 10).forEach(font => {
      loadGoogleFont(font, ['400']);
    });
    
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest('.font-selector-container')) {
        showDropdown = false;
      }
    }
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  // Load more fonts as user scrolls or searches
  $effect(() => {
    if (showDropdown && filteredFonts().length > 0) {
      // Load first 20 fonts for preview
      filteredFonts().slice(0, 20).forEach(font => {
        loadGoogleFont(font, ['400']);
      });
    }
  });
</script>

<div class="font-selector-container relative">
  <label 
    for={controlId} 
    class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2"
  >
    {label}
  </label>
  
  <!-- Selected Font Display -->
    <button
    id={controlId} 
    class="w-full p-3 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-left hover:border-surface-300 dark:hover:border-surface-500 transition-colors focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    onclick={() => showDropdown = !showDropdown}
    aria-haspopup="listbox" 
    aria-expanded={showDropdown} 
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <div class="font-medium text-surface-900 dark:text-surface-100" 
             style="font-family: '{selectedFont.family}', {selectedFont.category};">
          {selectedFont.family}
        </div>
        <div class="text-sm text-surface-500 dark:text-surface-400 capitalize">
          {selectedFont.category} • {selectedFont.variants.length} variant{selectedFont.variants.length !== 1 ? 's' : ''}
        </div>
      </div>
      <svg 
        class="w-5 h-5 text-surface-400 transition-transform"
        class:rotate-180={showDropdown}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true" 
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </button>
  
  <!-- Font Dropdown -->
    {#if showDropdown}
    <div 
      class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 z-50 max-h-96 overflow-hidden"
      role="listbox" 
      aria-labelledby={controlId} 
    >
      <!-- Search and Filters -->
      <div class="p-4 border-b border-surface-200 dark:border-surface-700">
        <!-- Search Input -->
        <div class="relative mb-3">
          <input
            type="text"
            placeholder="Search fonts..."
            bind:value={searchQuery}
            class="w-full pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Search fonts" 
            aria-controls="font-list" 
          />
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        <!-- Category Filter -->
        <div class="flex flex-wrap gap-2" role="group" aria-label="Font categories"> 
          {#each categories as category}
            <button
              class="px-3 py-1 text-xs rounded-full transition-colors"
              class:bg-primary-500={selectedCategory === category.id}
              class:text-white={selectedCategory === category.id}
              class:bg-surface-100={selectedCategory !== category.id}
              class:dark:bg-surface-600={selectedCategory !== category.id}
              class:text-surface-700={selectedCategory !== category.id}
              class:dark:text-surface-300={selectedCategory !== category.id}
              onclick={() => selectedCategory = category.id}
              aria-pressed={selectedCategory === category.id} 
            >
              {category.name}
            </button>
          {/each}
        </div>
      </div>
      
      <!-- Font List -->
     <div id="font-list" class="max-h-64 overflow-y-auto"> 
        {#if filteredFonts().length === 0}
          <div class="p-4 text-center text-surface-500 dark:text-surface-400" role="status"> 
            No fonts found matching your criteria
          </div>
        {:else}
          {#each filteredFonts().slice(0, 50) as font (font.family)}
           <button
              role="option" 
              aria-selected={selectedFont.family === font.family} 
              class="w-full p-3 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors text-left border-b border-surface-100 dark:border-surface-700 last:border-b-0"
              class:bg-primary-50={selectedFont.family === font.family}
              class:dark:bg-primary-900={selectedFont.family === font.family}
              onclick={() => selectFont(font)}
            >
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-surface-900 dark:text-surface-100 truncate" 
                       style="font-family: '{font.family}', {font.category};">
                    {font.family}
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400 truncate" 
                       style="font-family: '{font.family}', {font.category};">
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <div class="text-xs text-surface-400 dark:text-surface-500 capitalize">
                    {font.category}
                  </div>
                </div>
                
                {#if selectedFont.family === font.family}
                  <svg class="w-5 h-5 text-primary-500 flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                {/if}
              </div>
            </button>
          {/each}
          
          {#if filteredFonts().length > 50}
            <div class="p-3 text-center text-sm text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-700">
              Showing first 50 results. Use search to narrow down.
            </div>
          {/if}
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  /* Smooth transitions for dropdown */
  .font-selector-container {
    transition: all 0.2s ease-in-out;
  }
</style>