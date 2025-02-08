<script>
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import '../app.css';

  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';

  injectSpeedInsights();
  injectAnalytics();

  let { children } = $props();
</script>

<ParaglideJS {i18n}>
  {@render children()}
</ParaglideJS>
