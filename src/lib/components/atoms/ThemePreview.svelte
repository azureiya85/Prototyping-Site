<script lang="ts">
  import { onMount } from 'svelte';
  import type { CustomTheme } from '$lib/components/data/CustomStyle.ts';

  interface Props {
    currentTheme: CustomTheme;
    darkMode: boolean;
  }

  let { currentTheme, darkMode }: Props = $props();

  let activeAccordion = $state<string | null>(null);
  let tabValue = $state('features');
  let sliderValue = $state(75);
  let switchEnabled = $state(true);

  // This is the state object for your checkboxes
  let checkboxes = $state({
    notifications: true,
    marketing: false,
    analytics: true
  });

  // 1. Define a type for the keys of your 'checkboxes' state
  type CheckboxKey = keyof typeof checkboxes; // Will be "notifications" | "marketing" | "analytics"

  // 2. Define the structure for each option in your list
  interface CheckboxDisplayOption {
    key: CheckboxKey;
    label: string;
  }

  // 3. Create the typed array of checkbox options to iterate over
  const checkboxDisplayOptions: readonly CheckboxDisplayOption[] = [
    { key: 'notifications', label: 'Email notifications' },
    { key: 'marketing', label: 'Marketing updates' },
    { key: 'analytics', label: 'Usage analytics' }
  ];

  function toggleAccordion(id: string) {
    activeAccordion = activeAccordion === id ? null : id;
  }

  const sampleData = [ // This sampleData is not used in the provided template, but keeping it
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 }
  ];
</script>

<div class="bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
  <!-- Preview Header -->
  <div class="bg-gradient-to-r from-primary-500 to-accent-500 p-6 text-white">
    <h2 class="text-2xl font-bold mb-2" style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
      Theme Preview
    </h2>
    <p class="text-primary-100" style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
      Experience your custom theme across various UI components
    </p>
  </div>

  <div class="p-6 space-y-8">
    <!-- Typography Showcase -->
    <section>
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4" 
          style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
        Typography Scale
      </h3>
      <div class="space-y-3">
        <h1 class="text-4xl font-bold text-surface-900 dark:text-surface-100" 
            style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
          Heading 1 - Main Title
        </h1>
        <h2 class="text-3xl font-semibold text-surface-800 dark:text-surface-200" 
            style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
          Heading 2 - Section Title
        </h2>
        <h3 class="text-2xl font-medium text-surface-700 dark:text-surface-300" 
            style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
          Heading 3 - Subsection
        </h3>
        <p class="text-base text-surface-600 dark:text-surface-400 leading-relaxed" 
           style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
          Body text with comfortable reading experience. This paragraph demonstrates how your chosen fonts work together in longer form content, ensuring readability and visual hierarchy.
        </p>
        <p class="text-sm text-surface-500 dark:text-surface-500" 
           style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
          Small text for captions, metadata, and supplementary information.
        </p>
      </div>
    </section>

    <!-- Button Variants -->
    <section>
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4" 
          style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
        Button Components
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Primary Buttons -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300 uppercase tracking-wide"
              style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            Primary Actions
          </h4>
          <div class="flex flex-wrap gap-3">
            <button class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors shadow-sm"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Get Started
            </button>
            <button class="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-medium transition-colors shadow-sm"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Learn More
            </button>
            <button class="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-medium transition-colors shadow-sm"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Special Action
            </button>
          </div>
        </div>

        <!-- Secondary Buttons -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300 uppercase tracking-wide"
              style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            Secondary Actions
          </h4>
          <div class="flex flex-wrap gap-3">
            <button class="px-4 py-2 border border-primary-300 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg font-medium transition-colors"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Outline
            </button>
            <button class="px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg font-medium transition-colors"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Ghost
            </button>
            <button class="px-4 py-2 text-secondary-600 hover:text-primary-700 hover:border-b hover:border-primary-700 font-medium transition-colors"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Link Style
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Cards & Content -->
    <section>
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4" 
          style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
        Card Components
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Feature Card -->
        <div class="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 border border-surface-200 dark:border-surface-600">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2" 
              style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
            Fast Performance
          </h4>
          <p class="text-surface-600 dark:text-surface-400 text-sm leading-relaxed" 
             style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            Optimized for speed and efficiency with modern web technologies.
          </p>
        </div>

        <!-- Stats Card -->
        <div class="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-6 text-white">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-semibold" style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
              Total Users
            </h4>
            <svg class="w-8 h-8 text-secondary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div class="text-3xl font-bold mb-1" style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
            12,459
          </div>
          <div class="text-secondary-200 text-sm" style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            +12% from last month
          </div>
        </div>

        <!-- Action Card -->
        <div class="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700 shadow-sm">
          <h4 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2" 
              style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
            Quick Actions
          </h4>
          <p class="text-surface-600 dark:text-surface-400 text-sm mb-4" 
             style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            Manage your account settings and preferences.
          </p>
          <div class="space-y-2">
            <button class="w-full px-3 py-2 text-left text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors text-sm"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Edit Profile
            </button>
            <button class="w-full px-3 py-2 text-left text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors text-sm"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Privacy Settings
            </button>
            <button class="w-full px-3 py-2 text-left text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900 rounded-lg transition-colors text-sm"
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs Component -->
    <section>
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4" 
          style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
        Navigation Tabs
      </h3>
      <div class="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 border border-surface-200 dark:border-surface-600">
        <!-- Tab Headers -->
        <div class="flex space-x-1 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg mb-6" role="tablist" aria-label="Theme sections">
          {#each [
            { id: 'features', label: 'Features' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'support', label: 'Support' }
          ] as tab}
            <button
              class="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all"
              class:bg-white={tabValue === tab.id}
              class:dark:bg-surface-700={tabValue === tab.id}
              class:text-primary-600={tabValue === tab.id}
              class:shadow-sm={tabValue === tab.id}
              class:text-surface-600={tabValue !== tab.id}
              class:dark:text-surface-400={tabValue !== tab.id}
              style="font-family: '{currentTheme.fonts.body.family}', sans-serif;"
              role="tab"
              aria-selected={tabValue === tab.id}
              aria-controls="tabpanel-{tab.id}"
              onclick={() => tabValue = tab.id}
            >
              {tab.label}
            </button>
          {/each}
        </div>

        <!-- Tab Content -->
        <div class="min-h-24" role="tabpanel" id="tabpanel-{tabValue}" aria-labelledby="tab-{tabValue}">
          {#if tabValue === 'features'}
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-surface-900 dark:text-surface-100" 
                  style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
                Amazing Features
              </h4>
              <p class="text-surface-600 dark:text-surface-400" 
                 style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                Discover powerful tools designed to enhance your workflow and boost productivity.
              </p>
              <div class="grid grid-cols-2 gap-4 mt-4">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span class="text-sm text-surface-700 dark:text-surface-300" 
                        style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                    Real-time sync
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-secondary-500 rounded-full"></div>
                  <span class="text-sm text-surface-700 dark:text-surface-300" 
                        style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                    Advanced analytics
                  </span>
                </div>
              </div>
            </div>
          {:else if tabValue === 'pricing'}
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-surface-900 dark:text-surface-100" 
                  style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
                Flexible Pricing
              </h4>
              <p class="text-surface-600 dark:text-surface-400" 
                 style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                Choose the plan that best fits your needs with transparent pricing.
              </p>
              <div class="flex items-center space-x-4 mt-4">
                <div class="text-3xl font-bold text-primary-600" 
                     style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
                  $29
                </div>
                <div class="text-surface-500 dark:text-surface-400" 
                     style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                  per month
                </div>
              </div>
            </div>
          {:else}
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-surface-900 dark:text-surface-100" 
                  style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
                24/7 Support
              </h4>
              <p class="text-surface-600 dark:text-surface-400" 
                 style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                Get help when you need it with our dedicated support team.
              </p>
              <button class="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-medium transition-colors text-sm"
                      style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                Contact Support
              </button>
            </div>
          {/if}
        </div>
      </div>
    </section>

    <!-- Accordion Component -->
    <section>
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4" 
          style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
        Accordion FAQ
      </h3>
      <div class="space-y-2">
        {#each [
          {
            id: 'faq1',
            question: 'How do I customize my theme?',
            answer: 'Use the theme designer to adjust colors, fonts, and preview changes in real-time. Export your final theme as JSON or CSS variables.'
          },
          {
            id: 'faq2',
            question: 'Can I use custom fonts?',
            answer: 'Yes! Choose from hundreds of Google Fonts or upload your own custom font files. The typography system supports various font weights and styles.'
          },
          {
            id: 'faq3',
            question: 'Is dark mode supported?',
            answer: 'Absolutely. All themes automatically generate dark mode variants with proper contrast ratios and accessibility compliance.'
          }
        ] as faq}
          <div class="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
            <button
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
              aria-expanded={activeAccordion === faq.id}
              aria-controls="accordion-content-{faq.id}"
              onclick={() => toggleAccordion(faq.id)}
            >
              <span class="font-medium text-surface-900 dark:text-surface-100" 
                    style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
                {faq.question}
              </span>
              <svg 
                class="w-5 h-5 text-surface-400 transition-transform"
                class:rotate-180={activeAccordion === faq.id}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {#if activeAccordion === faq.id}
              <div class="px-6 pb-4 text-surface-600 dark:text-surface-400 leading-relaxed" 
                   id="accordion-content-{faq.id}"
                   style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                {faq.answer}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>

    <!-- Form Controls -->
     <section>
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4" 
          style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
        Form Controls
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Input Fields -->
        <div class="space-y-4">
          <div>
            <label for="email-input" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2" 
                   style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="Enter your email"
              class="w-full px-3 py-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              style="font-family: '{currentTheme.fonts.body.family}', sans-serif;"
            />
          </div>
          
          <div>
            <label for="message-textarea" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2" 
                   style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Message
            </label>
            <textarea
              id="message-textarea"
              placeholder="Your message here..."
              rows="3"
              class="w-full px-3 py-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
              style="font-family: '{currentTheme.fonts.body.family}', sans-serif;"
            ></textarea>
          </div>
        </div>

        <!-- Controls -->
        <div class="space-y-6">
          <!-- Range Slider -->
          <div>
            <label for="progress-slider" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2" 
                   style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Progress: {sliderValue}%
            </label>
            <input
              id="progress-slider"
              type="range"
              min="0"
              max="100"
              bind:value={sliderValue}
              class="w-full h-2 bg-surface-200 dark:bg-surface-600 rounded-lg appearance-none cursor-pointer range-primary"
            />
          </div>

          <!-- Toggle Switch -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-surface-700 dark:text-surface-300" 
                  style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Enable notifications
            </span>
            <button
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              class:bg-primary-500={switchEnabled}
              class:bg-surface-300={!switchEnabled}
              class:dark:bg-surface-600={!switchEnabled}
              aria-pressed={switchEnabled}
              aria-label="Toggle notifications"
              onclick={() => switchEnabled = !switchEnabled}
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                class:translate-x-6={switchEnabled}
                class:translate-x-1={!switchEnabled}
              ></span>
            </button>
          </div>

          <!-- Checkboxes -->
          <fieldset class="space-y-3">
            <legend class="text-sm font-medium text-surface-700 dark:text-surface-300" 
                    style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Preferences
            </legend>
            <!-- 4. Use the typed array in the #each loop -->
            {#each checkboxDisplayOptions as option}
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  bind:checked={checkboxes[option.key]}
                  class="w-4 h-4 text-primary-600 bg-white dark:bg-surface-700 border-surface-300 dark:border-surface-600 rounded focus:ring-primary-500 focus:ring-2"
                />
                <span class="text-sm text-surface-700 dark:text-surface-300" 
                      style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
                  {option.label}
                </span>
              </label>
            {/each}
          </fieldset>
        </div>
      </div>
    </section>


    <!-- Alert/Badge Components -->
    <section>
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4" 
          style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
        Alerts & Badges
      </h3>
      <div class="space-y-4" role="region" aria-label="Status messages and labels">
        <!-- Success Alert -->
        <div class="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4 flex items-start space-x-3" role="alert">
          <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <h4 class="font-medium text-green-800 dark:text-green-200" 
                style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
              Theme Applied Successfully
            </h4>
            <p class="text-green-700 dark:text-green-300 text-sm mt-1" 
               style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Your custom theme has been applied and is ready to use.
            </p>
          </div>
        </div>

        <!-- Info Alert -->
        <div class="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 flex items-start space-x-3" role="alert">
          <svg class="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <h4 class="font-medium text-blue-800 dark:text-blue-200" 
                style="font-family: '{currentTheme.fonts.heading.family}', sans-serif;">
              Pro Tip
            </h4>
            <p class="text-blue-700 dark:text-blue-300 text-sm mt-1" 
               style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
              Export your theme to reuse across different projects.
            </p>
          </div>
        </div>

        <!-- Badges -->
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full"
                style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            New
          </span>
          <span class="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 text-sm font-medium rounded-full"
                style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            Popular
          </span>
          <span class="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 text-sm font-medium rounded-full"
                style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            Featured
          </span>
          <span class="px-3 py-1 bg-surface-200 dark:bg-surface-600 text-surface-800 dark:text-surface-200 text-sm font-medium rounded-full"
                style="font-family: '{currentTheme.fonts.body.family}', sans-serif;">
            Default
          </span>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  /* Custom range slider styling */
  .range-primary::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgb(var(--color-primary-500));
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .range-primary::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgb(var(--color-primary-500));
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .range-primary::-webkit-slider-track {
    height: 8px;
    border-radius: 4px;
    background: rgb(var(--color-surface-200));
  }

  .range-primary::-moz-range-track {
    height: 8px;
    border-radius: 4px;
    background: rgb(var(--color-surface-200));
    border: none;
  }

  :global(.dark) .range-primary::-webkit-slider-track {
    background: rgb(var(--color-surface-600));
  }

  :global(.dark) .range-primary::-moz-range-track {
    background: rgb(var(--color-surface-600));
  }

  /* Focus states for accessibility */
  .range-primary:focus {
    outline: none;
  }

  .range-primary:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px rgba(var(--color-primary-500), 0.2);
  }

  .range-primary:focus::-moz-range-thumb {
    box-shadow: 0 0 0 3px rgba(var(--color-primary-500), 0.2);
  }

  /* Custom checkbox styling */
  input[type="checkbox"]:checked {
    background-color: rgb(var(--color-primary-600));
    border-color: rgb(var(--color-primary-600));
  }

  input[type="checkbox"]:focus {
    box-shadow: 0 0 0 3px rgba(var(--color-primary-500), 0.2);
  }

  /* Smooth transitions for interactive elements */
  button, input, textarea {
    transition: all 0.2s ease-in-out;
  }

  /* Ensure proper font loading */
  /* .font-loading {
    font-display: swap;
  } */
</style>