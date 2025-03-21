<script>
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';

  import posthog from 'posthog-js';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  onMount(() => {
    if (browser) {
      posthog.init('phc_jcG75DZ644o41LW6Fk64MAy9MNIDw5AEcgmTSnIKPhW', {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only'
      });
    }
    return;
  });

  import '../app.css';

  let { children } = $props();
</script>

<ParaglideJS {i18n}>
  {@render children()}
</ParaglideJS>
