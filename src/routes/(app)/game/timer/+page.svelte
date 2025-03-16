<script lang="ts">
  import Primary from '$lib/components/button/Primary.svelte';
  import Secondary from '$lib/components/button/Outline.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';

  import count from '$lib/audio/count.mp3';
  import startSfx from '$lib/audio/start.mp3';
  import stopSfx from '$lib/audio/end.mp3';
  import boomSfx from '$lib/audio/switch.mp3';

  import iqIcon from '$lib/icons/vex/iq.svg';
  import v5Icon from '$lib/icons/vex/v5.svg';

  let countAudio: HTMLAudioElement;
  let startAudio: HTMLAudioElement;
  let stopAudio: HTMLAudioElement;
  let boomAudio: HTMLAudioElement;

  let time = $state('...');
  let status = $state('not started');

  let program = $state('iq');
  let type = $state('teamwork');
  let skill: string | undefined = undefined;

  let countdown = $state(true);
  let sound = $state(false);

  let timeInterval: NodeJS.Timeout | undefined = $state(undefined);

  function toSec(time: string) {
    const parts = time.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  }

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function v5driverStart() {
    status = 'driver control';

    if (program == 'v5') time = '1:45';
    else time = '1:15';

    timeInterval = setInterval(() => {
      let seconds = toSec(time);
      seconds--;

      time = formatTime(seconds);

      if (seconds == 30) {
        boomAudio.play();
      }

      if (seconds == 0) {
        stopAudio.play();

        clearInterval(timeInterval);
        timeInterval = undefined;

        time = '0:00';
        status = 'autonomous';
      }
    }, 1000);
  }

  function timerStart() {
    if (program != 'iq') {
      status = 'autonomous period';
      if (program == 'v5') time = '0:15';
      else time = '0:45';
      timeInterval = setInterval(() => {
        let seconds = toSec(time);
        seconds--;

        time = formatTime(seconds);

        if (seconds == 0) {
          stopAudio.play();

          clearInterval(timeInterval);
          timeInterval = undefined;

          time = '0:00';
          status = 'awp point decision';
        }
      }, 1000);
    } else {
      status = 'teamwork / 1st driver';
      time = '1:00';
      timeInterval = setInterval(async () => {
        let seconds = toSec(time);
        seconds--;

        time = formatTime(seconds);

        if (seconds == 35) {
          let switchTime = 10;
          status = `driver switch / ${switchTime}`;

          boomAudio.play();

          let switchInterval = setInterval(async () => {
            switchTime--;
            status = `driver switch / ${switchTime}`;
            if (switchTime == 0) {
              await boomAudio.play();
              status = 'teamwork / 2nd driver';
              clearInterval(switchInterval);
            }
          }, 1000);
        }

        if (seconds == 0) {
          stopAudio.play();

          clearInterval(timeInterval);
          timeInterval = undefined;

          time = '0:00';
          status = 'match ended';
        }
      }, 1000);
    }
  }

  function start() {
    countAudio.preservesPitch = false;
    if (status == 'not started' || status == 'match ended' || status == 'match ended abruptly') {
      if (countdown) {
        time = '3';
        status = 'countdown';

        countAudio.play();

        let interval = setInterval(() => {
          let int = parseInt(time);
          time = (int -= 1).toString();

          if (time == '0') {
            clearInterval(interval);

            startAudio.play();

            timerStart();
          }

          countAudio.play();
        }, 1000);
      } else {
        startAudio.play();

        timerStart();
      }
    } else if (status == 'awp point decision') {
      startAudio.play();
      v5driverStart();
    }
  }

  function stop() {
    if (timeInterval != undefined) {
      clearInterval(timeInterval);

      stopAudio.play();

      time = '...';
      status = 'match ended abruptly';

      timeInterval = undefined;
    }
  }
</script>

<svelte:head>
  <title>Game timer - gears</title>
</svelte:head>
<audio bind:this={countAudio} src={count} bind:muted={sound}></audio>
<audio bind:this={startAudio} src={startSfx} bind:muted={sound}></audio>
<audio bind:this={stopAudio} src={stopSfx} bind:muted={sound}></audio>
<audio bind:this={boomAudio} src={boomSfx} bind:muted={sound}></audio>

<Container extraProps="flex flex-col min-h-screen">
  <div class="flex w-full justify-between">
    <Title>Game timer</Title>
    <div class="flex gap-3">
      <button
        onclick={() => {
          program = 'iq';
        }}>iq</button
      >
      <button
        onclick={() => {
          program = 'v5';
        }}>v5</button
      >
      <button
        onclick={() => {
          program = 'u';
        }}>u</button
      >
    </div>
    <div class="flex gap-3">
      {#if program == 'iq'}
        <button
          onclick={() => {
            skill = undefined;
            type = 'teamwork';
          }}>teamwork</button
        >
      {:else}
        <button
          onclick={() => {
            skill = undefined;
            type = 'teamwork';
          }}>elimination</button
        >
      {/if}
      <button
        onclick={() => {
          skill = undefined;
          type = 'skills';
        }}>skills</button
      >
    </div>
    {#if type == 'skills'}
      <div class="flex gap-3">
        <button
          onclick={() => {
            skill = 'driver';
          }}>driver</button
        >
        <button
          onclick={() => {
            program = 'autonomous';
          }}>autonomous</button
        >
      </div>
    {/if}
  </div>
  <div class="m-auto lg:w-1/2">
    <div class="rounded-md border border-zinc-200 p-6 shadow dark:border-zinc-800">
      <p class="text-center text-xs tracking-[0.27em] text-zinc-400 lowercase lg:text-sm">
        {status}
      </p>
      <p class="my-6 text-center text-8xl font-medium lg:text-9xl">{time}</p>
      <div class="flex items-center justify-between gap-3">
        <Primary onclick={start} disabled={timeInterval != undefined} extraProps="w-full"
          >Start</Primary
        ><Secondary onclick={stop} disabled={timeInterval == undefined} extraProps="w-full"
          >Stop</Secondary
        >
      </div>
      <div class="my-3 h-px w-full bg-zinc-200 dark:bg-zinc-800"></div>
      <div class="space-y-1">
        <div class="flex gap-2">
          <button
            aria-label="Countdown"
            data-checked={countdown}
            onclick={() => (countdown = !countdown)}
            class="h-4 w-4 cursor-pointer rounded-sm border border-zinc-950 shadow transition-all data-[checked=false]:bg-zinc-50 data-[checked=true]:bg-zinc-950 dark:border-zinc-50 dark:data-[checked=false]:bg-zinc-950 dark:data-[checked=true]:bg-zinc-50"
          ></button>
          <p class="text-xs font-medium">3 second countdown</p>
        </div>
        <div class="flex gap-2">
          <button
            aria-label="Sound"
            data-checked={!sound}
            onclick={() => (sound = !sound)}
            class="h-4 w-4 cursor-pointer rounded-sm border border-zinc-950 shadow transition-all data-[checked=false]:bg-zinc-50 data-[checked=true]:bg-zinc-950 dark:border-zinc-50 dark:data-[checked=false]:bg-zinc-950 dark:data-[checked=true]:bg-zinc-50"
          ></button>
          <p class="text-xs font-medium">Sound</p>
        </div>
      </div>
    </div>
  </div>
</Container>
