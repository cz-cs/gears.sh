<script lang="ts">
  import type { FormEventHandler, KeyboardEventHandler } from 'svelte/elements';

  let {
    name = '',
    value = $bindable(''),
    placeholder,
    disabled = false,
    error = false,
    type = 'text',
    extraProps = '',
    oninput = undefined,
    onkeydown = undefined,
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
    oninput?: FormEventHandler<HTMLInputElement>;
    onkeydown?: KeyboardEventHandler<HTMLInputElement>;
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
  {onkeydown}
  {name}
  {required}
  bind:value
  {type}
  {disabled}
  class="flex h-9 rounded-md border border-zinc-800 px-4 py-2 text-xs font-medium shadow-sm ring-zinc-50 transition-all outline-none placeholder:text-zinc-400 focus-visible:ring data-[error=true]:ring data-[error=true]:ring-red-600 {extraProps}"
/>
