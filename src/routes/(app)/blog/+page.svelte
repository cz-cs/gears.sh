<script>
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';
  import BlogEntry from './BlogEntry.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>Blog - gears</title>
</svelte:head>
<Container>
  <Title extraProps="mb-1">Blog</Title>
  <p class="mb-5 text-zinc-400">A little log journal from the guy behind Gears</p>
  <div class="space-y-3">
    {#each data.posts as post}
      <BlogEntry
        title={post.title}
        description={post.description}
        author={post.author}
        date={post.date}
        url={post.url}
      />
    {/each}
    <p class="text-center text-xs font-medium tracking-widest text-zinc-400">no more to show</p>
  </div>
</Container>
