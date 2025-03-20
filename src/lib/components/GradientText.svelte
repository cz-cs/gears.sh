<script lang="ts">
  let {
    children,
    extraProps = '',
    colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
    animationSpeed = 8
  }: {
    children: any;
    extraProps?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
  } = $props();
</script>

<div
  class="animate-gradient relative z-2 inline-block bg-cover text-transparent {extraProps}"
  style:background-image={`linear-gradient(to right, ${colors.join(', ')})`}
  style:animation-duration={`${animationSpeed}s`}
  style:background-size={`300% 100%`}
  style:background-clip={`text`}
  style:-webkit-background-clip={`text`}
>
  {@render children()}
</div>
