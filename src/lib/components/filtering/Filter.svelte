<script>
  let { children } = $props();
</script>

<div class="space-y-6 rounded-lg border border-primary bg-white p-5">
  {@render children()}
</div>
