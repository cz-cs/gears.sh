<script lang="ts">
  let { children } = $props();
</script>

<button

  class="inline-flex h-9 items-center rounded-sm px-4 py-1.5 text-xs font-medium transition-colors duration-300 hover:cursor-pointer hover:bg-zinc-800"
>
  {@render children()}
</button>
