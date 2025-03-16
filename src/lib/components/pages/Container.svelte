<script lang="ts">
  import { fly } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';

  let { children, extraProps = '' } = $props();
</script>

<div class="w-full p-4 lg:mb-0 {extraProps}" in:fly={{ y: -15 }}>
  {@render children()}
</div>
