<script>
  import BlockSpinner from '$lib/components/BlockSpinner.svelte';
  import '../../app.css';
  let loading = $state(false);
</script>

<svelte:head>
  <title>Hi! - gears</title>
</svelte:head>
<div class="font-default text-primary h-screen antialiased dark:bg-zinc-950 dark:text-white">
  <div class="flex h-full flex-col items-center justify-center backdrop-blur-md">
    <div class="mb-8 text-center">
      <h1 class="text-default text-7xl font-bold">Hi!</h1>
      <div class="text-md text-zinc-400">
        <p>I'm SO excited you want to use gears!</p>
        <p>
          Unfortunately, it's a relatively new service, and with new things, often there are tons of
          issues that still need to be ironed out before it can be labeled as "functional".
        </p>
        <p>
          I don't want to serve a half-baked application, so I'll officially open HQ to the general
          public around Q1 2025, but if you're just <b>itching</b> to try it out, you can be put on the
          waitlist to try the alpha.
        </p>
        <p>
          If you do get accepted, please let me (<a
            class="text-blue-600 underline"
            href="mailto:me@czcs.xyz">me@czcs.xyz</a
          >) know of any bugs you encounter by clicking the little bug in the sidebar.
        </p>
      </div>
    </div>
    <form class="flex gap-2">
      <div class="rounded-lg border border-zinc-800 px-3 py-2">
        <input
          required
          class="text-default w-full bg-transparent outline-hidden"
          placeholder="Email..."
        />
      </div>
      <button
        disabled={loading}
        class="flex items-center justify-center gap-2 rounded-lg pr-4 pl-2 text-center text-white transition-all hover:bg-white/85 dark:bg-white dark:text-black"
      >
        <BlockSpinner size={16} fill="white" active={loading} />
        <p class="text-center">Submit</p>
      </button>
    </form>
  </div>
</div>
