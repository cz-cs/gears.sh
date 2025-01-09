<script lang="ts">
  let {
    name = '',
    value = $bindable(''),
    placeholder,
    disabled = false,
    error = false,
    type = 'text',
    extraProps = '',
    oninput = undefined,
    form = undefined,
    required = false
  }: {
    name?: string;
    value?: string;
    placeholder: string;
    error?: boolean;
    disabled?: boolean;
    type?: string;
    extraProps?: string;
    oninput?: any;
    form?: string;
    required?: boolean;
  } = $props();
</script>

<input
  autocomplete="off"
  data-error={error}
  {form}
  {placeholder}
  {oninput}
  {name}
  {required}
  bind:value
  {type}
  {disabled}
  class="flex h-9 rounded-md border border-zinc-800 px-4 py-2 text-xs font-medium shadow-sm ring-zinc-50 transition-all outline-none placeholder:text-zinc-400 focus-visible:ring data-[alert=true]:ring data-[alert=true]:ring-red-400 {extraProps}"
/>
