<script lang="ts">
  import dayjs from 'dayjs';
  import type { Message } from './Message';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let { ...msg }: Message = $props();
</script>

<div
  data-sending={msg.sending}
  transition:scale|global={{ easing: quintOut, duration: 550, start: 0.95 }}
  class="inline-flex w-full justify-between rounded-md border border-zinc-200 p-2 text-sm data-[sending=true]:animate-pulse dark:border-zinc-800"
>
  <div class="inline-flex gap-2">
    <p class="font-medium opacity-50">{msg.username}</p>
    <p>{msg.content}</p>
  </div>
  <p class="opacity-50">{dayjs(msg.time).format('LT')}</p>
</div>
