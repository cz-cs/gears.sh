<script lang="ts">
  let {
    label,
    type,
    placeholder = '',
    value = ''
  }: { label: string; placeholder?: string; value?: string; type: string } = $props();
  let name = label.toLowerCase().replace(' ', '-');
</script>

<div class="space-y-2">
  <label for={name}>{label}</label>
  <input
    class="w-full rounded-lg border border-primary bg-transparent p-2 pl-3"
    {type}
    {name}
    required
    bind:value
    placeholder={placeholder !== '' ? placeholder : ''}
  />
</div>
