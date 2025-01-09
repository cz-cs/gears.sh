<script lang="ts">
  let {
    content = 'Hello Rizz',
    active,
    href
  }: { content: string; active: boolean; href: string } = $props();
</script>

<a
  class="rounded-t-lg border-b px-3 py-1 text-white hover:bg-[#F5F5F5] {active
    ? 'border-b-[#303030] dark:text-[#303030]'
    : 'border-b-[#B2B2B2] dark:text-[#B2B2B2]'}"
  {href}
>
  {content}
</a>
