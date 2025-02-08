<script lang="ts">
  let { children, onclick, active }: { children: any; onclick: any; active: boolean } = $props();
</script>

<button
  {onclick}
  data-active={active}
  class="h-9 cursor-pointer rounded-md bg-transparent px-4 py-2 text-left text-sm font-medium hover:underline data-[active=true]:bg-zinc-800"
>
  {@render children()}
</button>
