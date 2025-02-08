<script lang="ts">
  let { size = 4, fill = 'zinc-950' }: { size?: number; fill?: string } = $props();
</script>

<svg class="size-{size}" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    class="stroke-{fill}"
    d="M19 11V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H3C2.46957 20 1.96086 19.7893 1.58579 19.4142C1.21071 19.0391 1 18.5304 1 18V4C1 3.46957 1.21071 2.96086 1.58579 2.58579C1.96086 2.21071 2.46957 2 3 2H10M14 4H20M17 1V7M19 14L15.914 10.914C15.5389 10.5391 15.0303 10.3284 14.5 10.3284C13.9697 10.3284 13.4611 10.5391 13.086 10.914L4 20M9 8C9 9.10457 8.10457 10 7 10C5.89543 10 5 9.10457 5 8C5 6.89543 5.89543 6 7 6C8.10457 6 9 6.89543 9 8Z"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
