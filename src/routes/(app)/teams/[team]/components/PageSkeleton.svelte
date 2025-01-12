<script>
  import Skeleton from '$lib/components/pages/Skeleton.svelte';
</script>

<div class="min-h-screen w-full p-4">
  <Skeleton extraProps="h-8 w-96 mb-3" />
  <div class="grid grid-cols-2 gap-2">
    <div class="space-y-2 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
      <div class="flex justify-between">
        <Skeleton extraProps="h-5 w-24" />
        <Skeleton extraProps="h-5 w-5" />
      </div>
      <div class="space-y-1">
        <Skeleton extraProps="h-7 w-full" />
        <Skeleton extraProps="h-3 w-48" />
      </div>
    </div>
    <div class="space-y-2 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
      <div class="flex justify-between">
        <Skeleton extraProps="h-5 w-24" />
        <Skeleton extraProps="h-5 w-5" />
      </div>
      <div class="space-y-1">
        <Skeleton extraProps="h-7 w-full" />
        <Skeleton extraProps="h-3 w-48" />
      </div>
    </div>
  </div>
  <Skeleton extraProps="my-6 h-6 w-32" />
</div>
