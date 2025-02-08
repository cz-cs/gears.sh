<script lang="ts">
  let { size = 4, fill = 'zinc-50' }: { size?: number; fill?: string } = $props();
</script>

<svg
  class="size-{size} stroke-{fill}"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg
>
