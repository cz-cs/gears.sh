<script lang="ts">
  import dayjs from 'dayjs';

  let {
    title,
    description,
    author,
    date,
    url
  }: { title: string; description: string; author: string; date: string; url: string } = $props();
</script>

<a
  class="flex flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm transition-colors duration-300 hover:bg-zinc-900"
  href="/blog/{url}"
>
  <div class="flex items-center gap-2">
    <p class="font-medium">{title}</p>
    <p class="text-zinc-400">{dayjs(date).format('DD/MM/YYYY HH:mm')}</p>
    <p class="text-zinc-400">{author}</p>
  </div>
  <p class="text-xs text-zinc-400">{description}</p></a
>
