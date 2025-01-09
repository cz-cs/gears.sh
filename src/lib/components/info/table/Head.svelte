<script lang="ts">
  let { children, extraProps = '' }: { children: any; extraProps?: string } = $props();
</script>

<th class="h-10 px-2 text-left align-middle font-medium text-zinc-400 {extraProps}" scope="col"
  >{@render children()}</th
>
