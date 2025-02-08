<script lang="ts">
  let { size = 4, fill = 'zinc-50' }: { size?: number; fill?: string } = $props();
</script>

<svg
  class={`size-${size} stroke-${fill}`}
  fill="none"
  viewBox="0 0 22 22"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17 1L21 5M6.5 19.5L18 8L14 4L2.5 15.5L1 21L6.5 19.5Z"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
