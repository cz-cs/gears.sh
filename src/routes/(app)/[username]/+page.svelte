<script>
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import Trash2 from '$lib/icons/Trash2.svelte';
</script>

<Container
  extraProps="space-y-6 bg-linear-to-b from-purple-950 via-zinc-950 to-zinc-950 mb-16 lg:mb-0"
>
  <div class="flex flex-col gap-4 border-b border-purple-800 p-3 lg:flex-row lg:p-6">
    <div
      class="mx-auto my-auto flex gap-4 border-purple-800 pb-4 lg:mx-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4"
    >
      <img
        class="h-24 w-24 self-center rounded-full lg:h-32 lg:w-32"
        src="https://cdn.vectorstock.com/i/500p/52/48/yellow-smile-face-seamless-pattern-funny-melting-vector-45485248.jpg"
        alt=""
      />
      <div class="space-y-2">
        <div>
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold">cz.cs</p>
            <button
              class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
              >Follow</button
            >
          </div>
          <p class="text-xs text-zinc-400">@cz_cs</p>
        </div>
        <p class="text-sm text-zinc-50">i like computers</p>
        <div class="flex gap-2 text-xs font-semibold text-zinc-950">
          <div class="rounded-md bg-zinc-50 px-2.5 py-0.5 transition-colors hover:bg-zinc-300">
            programmer
          </div>
          <div class=" rounded-md bg-zinc-50 px-2.5 py-0.5 transition-colors hover:bg-zinc-300">
            driver
          </div>
          <div
            class="rounded-md bg-blue-200 px-2.5 py-0.5 text-blue-950 transition-colors hover:bg-blue-300"
          >
            ceo
          </div>
        </div>
      </div>
    </div>
    <div class="grid grow grid-cols-2 justify-between gap-2 lg:flex">
      <div
        class="flex grow flex-col justify-center space-y-2 rounded-lg border border-purple-800 p-6 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:bg-transparent"
      >
        <p class="text-sm font-medium tracking-tight">Current Team</p>
        <div class="space-y-1">
          <p class="text-3xl font-bold">Hidden</p>
          <p class="text-xs text-zinc-400">
            <span class="font-semibold">cz.cs</span> isn't sharing their team
          </p>
        </div>
      </div>
      <div
        class="flex grow flex-col justify-center space-y-2 rounded-lg border border-purple-800 p-6 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:bg-transparent"
      >
        <p class="text-sm font-medium tracking-tight">Total Competitions</p>
        <p class="text-3xl font-bold tracking-tight">7</p>
      </div>
      <div
        class="flex grow flex-col justify-center space-y-2 rounded-lg border border-purple-800 p-6 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:bg-transparent"
      >
        <p class="text-sm font-medium tracking-tight">Been to Worlds</p>
        <p class="text-3xl font-bold tracking-tight">No</p>
      </div>
      <div
        class="flex grow flex-col justify-center space-y-2 rounded-lg border border-purple-800 p-6 lg:rounded-none lg:border-none lg:bg-transparent"
      >
        <p class="text-sm font-medium tracking-tight">Followers</p>
        <p class="text-3xl font-bold tracking-tight">0</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-2 lg:flex-row">
    <div class="flex gap-2 lg:w-1/5 lg:flex-col">
      <button class="h-9 rounded-md bg-zinc-800 px-4 py-2 text-left text-sm font-medium">
        Blog
      </button>
      <button
        disabled={true}
        class="h-9 rounded-md px-4 py-2 text-left text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent"
      >
        Rankings
      </button>
      <button
        disabled={true}
        class="h-9 rounded-md px-4 py-2 text-left text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent"
      >
        Followers (Hidden)
      </button>
    </div>
    <div class="flex w-full flex-col gap-4">
      <div
        class="flex min-h-9 items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm"
      >
        <p><span class="font-medium">cz.cs</span> everything is inconsistent omg</p>
        <div role="separator" class="h-full w-px bg-zinc-800"></div>
        <Trash2 />
      </div>
      <p class="min-h-9 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm">
        <span class="font-medium">cz.cs</span> i am losing my sanity making this website
      </p>
    </div>
  </div>
</Container>
