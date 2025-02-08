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
    form = undefined
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
  } = $props();
</script>

<input
  autocomplete="off"
  data-error={error}
  {form}
  {placeholder}
  {oninput}
  {name}
  bind:value
  {type}
  {disabled}
  required
  class="mb-3 flex h-9 w-full rounded-md border border-zinc-800 px-4 py-2 text-xs font-medium shadow-sm ring-zinc-50 transition-all outline-none placeholder:text-zinc-400 focus-visible:ring data-[error=true]:ring data-[error=true]:ring-red-400 {extraProps}"
/>
