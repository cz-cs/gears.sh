<script lang="ts">
  let { size = 4, fill = 'zinc-50' }: { size?: number; fill?: string } = $props();
</script>

<svg
  class="size-{size} stroke-{fill}"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M13 1L1 13M1 1L13 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
