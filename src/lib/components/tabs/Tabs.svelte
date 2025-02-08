<script lang="ts">
  let { children } = $props();
</script>

<div class="inline-flex h-9 rounded-lg bg-zinc-800 p-1 text-zinc-400">
  {@render children()}
</div>
