<script lang="ts">
  let {
    label,
    placeholder = '',
    children
  }: { label: string; placeholder?: string; children: any } = $props();
</script>

<div class="space-y-2">
  <label for={label.toLowerCase()}>{label}</label>
  <select
    multiple
    class="border-default w-full rounded-lg border bg-transparent p-2 pl-3"
    {placeholder}
    name={label.toLowerCase()}
  >
    {@render children()}
  </select>
</div>
