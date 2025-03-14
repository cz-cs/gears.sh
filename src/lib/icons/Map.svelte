<script lang="ts">
  let { size = 4, fill = 'zinc-50' }: { size?: number; fill?: string } = $props();
</script>

<svg
  class="size-4 stroke-zinc-950 dark:stroke-zinc-50"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7 1L1 4V19L7 16M7 1L13 4M7 1V16M13 4L19 1V16L13 19M13 4V19M13 19L7 16"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
