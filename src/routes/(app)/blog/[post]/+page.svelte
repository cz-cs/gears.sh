<script>
  import Container from '$lib/components/pages/Container.svelte';
  import { marked } from 'marked';

  marked.use({
    breaks: true,
    gfm: true
  });

  let { data } = $props();

  let html = marked(data.content);
</script>

<svelte:head>
  <title>{data.title} - gears</title>
</svelte:head>
<Container extraProps="flex flex-col">
  <div class="mx-auto w-1/2">
    <div class="md">
      {@html html}
    </div>
  </div>
</Container>
