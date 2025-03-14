<script lang="ts">
  let { children } = $props();
</script>

<div class="inline-flex h-9 rounded-lg p-1 text-zinc-400 dark:bg-zinc-800">
  {@render children()}
</div>
