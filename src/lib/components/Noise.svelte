<script lang="ts">
  let {
    patternSize = 250,
    patternScaleX = 1,
    patternScaleY = 1,
    patternRefreshInterval = 2,
    patternAlpha = 15
  }: {
    patternSize?: number;
    patternScaleX?: number;
    patternScaleY?: number;
    patternRefreshInterval?: number;
    patternAlpha?: number;
  } = $props();

  let grain: HTMLCanvasElement;

  $effect(() => {
    if (!grain) return;

    const ctx = grain.getContext('2d')!;
    if (!ctx) return;

    let frame = 0;

    const patternCanvas = document.createElement('canvas');

    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;

    const patternCtx = patternCanvas.getContext('2d');

    if (!patternCtx) return;

    const patternData = patternCtx.createImageData(patternSize, patternSize);

    const patternPixelDataLength = patternSize * patternSize * 4;

    function resize() {
      if (!grain) return;

      grain.width = window.innerWidth * window.devicePixelRatio;
      grain.height = window.innerHeight * window.devicePixelRatio;

      ctx.scale(patternScaleX, patternScaleY);
    }

    function updatePattern() {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;

        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }

      patternCtx!.putImageData(patternData, 0, 0);
    }

    function drawGrain() {
      ctx.clearRect(0, 0, grain.width, grain.height);

      const pattern = ctx.createPattern(patternCanvas, 'repeat');

      if (pattern) {
        ctx.fillStyle = pattern;

        ctx.fillRect(0, 0, grain.width, grain.height);
      }
    }

    function loop() {
      if (frame % patternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }

      frame++;
      window.requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);

    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
    };
  });
</script>

<canvas class="fixed top-0 left-0 z-0 h-screen w-screen" bind:this={grain}></canvas>
