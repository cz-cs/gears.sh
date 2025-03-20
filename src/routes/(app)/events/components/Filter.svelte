<script lang="ts">
  let { label, children }: { label: string; children?: any } = $props();
</script>

<div class="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
  <div class="space-y-2">
    <p class="text-sm font-medium">{label}</p>
    {@render children()}
  </div>
</div>
