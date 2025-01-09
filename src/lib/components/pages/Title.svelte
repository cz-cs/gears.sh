<script>
  let { children, extraProps = '' } = $props();
</script>

<h1 class="scroll-m-20 text-2xl font-bold tracking-tight {extraProps}">
  {@render children()}
</h1>
