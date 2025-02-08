<script>
  let { children, extraProps = undefined } = $props();
</script>

<h2 class="scroll-m-20 text-lg font-medium {extraProps}">{@render children()}</h2>
