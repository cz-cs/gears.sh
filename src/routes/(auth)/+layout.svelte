<script lang="ts">
  let { children } = $props();
</script>

<div class="flex min-h-screen text-zinc-50 select-none">
  <div
    class="hidden w-1/2 flex-col justify-between border-r border-zinc-800 bg-zinc-900 p-6 lg:visible lg:flex"
  >
    <img class="pointer-events-none h-9 w-fit" alt="Gears logo" src="/img/gears.png" />
    <p class="text-xl">
      "Joining this platform has streamlined our task management and made collaboration
      straightforward."<br /><span class="text-sm">- Microsoft Copilot</span>
    </p>
  </div>
  {@render children()}
</div>
