<script lang="ts">
  let { extraProps }: { extraProps: string } = $props();
</script>

<div class="animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800 {extraProps}"></div>
