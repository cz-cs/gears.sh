<script>
  import Skeleton from './pages/Skeleton.svelte';
</script>

<div
  class="flex flex-col gap-1 rounded-lg border border-[#27272a] bg-white px-4 py-2 transition-colors duration-300 dark:bg-[#09090b] dark:text-white"
>
  <Skeleton extraProps="w-96 h-4" />
  <div class="flex gap-2">
    <Skeleton extraProps="w-32 h-4" />
    <Skeleton extraProps="w-52 h-4" />
  </div>
</div>
