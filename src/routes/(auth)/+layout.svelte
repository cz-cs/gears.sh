<script lang="ts">
  let { children } = $props();
</script>

<div
  class="flex min-h-screen bg-zinc-50 text-zinc-950 select-none dark:bg-zinc-950 dark:text-zinc-50"
>
  <div
    class="hidden w-1/2 flex-col justify-between border-r border-zinc-200 bg-zinc-100 p-6 lg:visible lg:flex dark:border-zinc-800 dark:bg-zinc-900"
  >
    <img
      class="pointer-events-none h-9 w-fit invert dark:invert-0"
      alt="Gears logo"
      src="/img/gears.png"
    />
    <p class="text-xl">
      "Joining this platform has streamlined our task management and made collaboration
      straightforward."<br /><span class="text-sm">- Microsoft Copilot</span>
    </p>
  </div>
  {@render children()}
</div>
