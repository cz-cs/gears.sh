<script lang="ts">
  import Primary from '$lib/components/button/Primary.svelte';
  import Secondary from '$lib/components/button/Outline.svelte';
  import Container from '$lib/components/pages/Container.svelte';
  import Title from '$lib/components/pages/Title.svelte';

  import count from '$lib/audio/count.mp3';
  import startSfx from '$lib/audio/start.mp3';
  import stopSfx from '$lib/audio/end.mp3';
  import boomSfx from '$lib/audio/switch.mp3';

  import ftcStartSfx from '$lib/audio/ftc/matchStart.mp3';
  import ftcHandoffSfx from '$lib/audio/ftc/driverHandoff.mp3';
  import ftcDriverStartSfx from '$lib/audio/ftc/driverStart.mp3';
  import ftcEndgameSfx from '$lib/audio/ftc/endgameStart.mp3';
  import ftcEndSfx from '$lib/audio/ftc/matchEnd.mp3';

  import { blur, fade, scale, slide } from 'svelte/transition';
  import LinkPrimary from '$lib/components/button/LinkPrimary.svelte';
  import { expoInOut } from 'svelte/easing';

  let countAudio: HTMLAudioElement;
  let startAudio: HTMLAudioElement;
  let stopAudio: HTMLAudioElement;
  let boomAudio: HTMLAudioElement;

  let ftcAudio: HTMLAudioElement;
  let ftcHandoffAudio: HTMLAudioElement;
  let ftcDriverStartAudio: HTMLAudioElement;
  let ftcEndgameAudio: HTMLAudioElement;
  let ftcEndAudio: HTMLAudioElement;

  let time = $state('...');
  let status = $state('not started');

  let program = $state('iq');
  let type = $state(true);

  let countdown = $state(true);
  let sound = $state(false);

  let timeInterval: NodeJS.Timeout | undefined = $state(undefined);

  function flickerScreen() {
    let flickerCount = 0;
    let invertInterval = setInterval(() => {
      document.body.style.filter = flickerCount % 2 === 0 ? 'invert(100%)' : 'invert(0%)';
      flickerCount++;
      if (flickerCount === 4) {
        clearInterval(invertInterval);
        document.body.style.filter = 'invert(0%)';
      }
    }, 250);
  }

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
    if (type == false && program != 'ftc') {
      status = 'skills';
      time = '1:00';

      timeInterval = setInterval(async () => {
        let seconds = toSec(time);
        seconds--;

        time = formatTime(seconds);

        if (seconds == 0) {
          stopAudio.play();

          clearInterval(timeInterval);
          timeInterval = undefined;

          time = '0:00';
          status = 'match ended';
        }
      }, 1000);
      return;
    }

    if (program == 'ftc') {
      status = 'autonomous';
      time = '0:30';

      timeInterval = setInterval(() => {
        let seconds = toSec(time);
        seconds--;

        time = formatTime(seconds);

        if (seconds == 0) {
          clearInterval(timeInterval);
          timeInterval = undefined;

          ftcHandoffAudio.play();
          flickerScreen();

          status = 'pick up your controllers, drivers';
          time = '0:08';

          let handoffInterval = setInterval(() => {
            let seconds = toSec(time);
            seconds--;

            time = formatTime(seconds);

            if (seconds <= 3) {
              countAudio.play();
            }

            if (seconds == 0) {
              clearInterval(handoffInterval);

              ftcDriverStartAudio.play();
              flickerScreen();

              status = 'driver control';
              time = '2:30';

              timeInterval = setInterval(() => {
                let seconds = toSec(time);
                seconds--;

                time = formatTime(seconds);

                if (seconds == 30) {
                  status = 'endgame';
                  flickerScreen();
                  ftcEndgameAudio.play();
                }

                if (seconds == 0) {
                  status = 'match ended';
                  ftcEndAudio.play();
                  time = '0:00';

                  clearInterval(timeInterval);
                  timeInterval = undefined;
                }
              }, 1000);
            }
          }, 1000);
        }
      }, 1000);
      return;
    }

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

          flickerScreen();

          let switchInterval = setInterval(async () => {
            switchTime--;
            status = `driver switch / ${switchTime}`;
            if (switchTime == 0) {
              await boomAudio.play();
              status = 'teamwork / 2nd driver';
              flickerScreen();
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
        status = '...';

        countAudio.play();

        let interval = setInterval(() => {
          let int = parseInt(time);
          time = (int -= 1).toString();

          if (time == '0') {
            clearInterval(interval);

            if (program == 'ftc') {
              ftcAudio.play();
            } else {
              startAudio.play();
            }

            timerStart();
          }

          countAudio.play();
        }, 1000);
      } else {
        if (program == 'ftc') {
          ftcAudio.play();
        } else {
          startAudio.play();
        }

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

      if (program == 'ftc') {
        ftcEndAudio.play();
      } else {
        stopAudio.play();
      }

      time = '...';
      status = 'match ended abruptly';

      timeInterval = undefined;
    }
  }
</script>

<svelte:head>
  <title>Game timer - gears</title>
</svelte:head>

<audio bind:this={ftcAudio} src={ftcStartSfx} bind:muted={sound}></audio>
<audio bind:this={ftcHandoffAudio} src={ftcHandoffSfx} bind:muted={sound}></audio>
<audio bind:this={ftcDriverStartAudio} src={ftcDriverStartSfx} bind:muted={sound}></audio>
<audio bind:this={ftcEndgameAudio} src={ftcEndgameSfx} bind:muted={sound}></audio>
<audio bind:this={ftcEndAudio} src={ftcEndSfx} bind:muted={sound}></audio>

<audio bind:this={countAudio} src={count} bind:muted={sound}></audio>
<audio bind:this={startAudio} src={startSfx} bind:muted={sound}></audio>
<audio bind:this={stopAudio} src={stopSfx} bind:muted={sound}></audio>
<audio bind:this={boomAudio} src={boomSfx} bind:muted={sound}></audio>

<Container extraProps="flex flex-col min-h-screen">
  <Title>Game timer</Title>
  <div class="m-auto lg:w-1/2">
    <div class="rounded-xl border border-zinc-200 p-6 shadow dark:border-zinc-800">
      <div class="flex w-full items-center justify-between">
        <p class="text-center text-xs tracking-[0.27em] text-zinc-400 lowercase lg:text-sm">
          {status}
        </p>
      </div>
      <p class="my-6 text-center text-8xl font-medium lg:text-9xl">{time}</p>
      <div class="flex items-center justify-between gap-3">
        <Primary onclick={start} disabled={timeInterval != undefined} extraProps="w-full"
          >Start</Primary
        ><Secondary onclick={stop} disabled={timeInterval == undefined} extraProps="w-full"
          >Stop</Secondary
        >
      </div>
      {#if status == 'not started' || status == 'match ended' || status == 'match ended abruptly'}
        <div transition:slide={{ duration: 500, easing: expoInOut }}>
          <div class="my-3 h-px w-full bg-zinc-200 dark:bg-zinc-800"></div>
          <div class="mt-3 flex justify-between">
            <div class="inline-flex h-9 rounded-lg bg-zinc-800 p-1 text-zinc-400">
              <button
                data-active={program == 'iq'}
                onclick={() => (program = 'iq')}
                class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
              >
                IQ
              </button>
              <button
                data-active={program == 'v5'}
                onclick={() => (program = 'v5')}
                class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none disabled:cursor-default disabled:opacity-50 data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
              >
                V5
              </button>
              <button
                data-active={program == 'u'}
                onclick={() => (program = 'u')}
                class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none disabled:cursor-default disabled:opacity-50 data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
              >
                U
              </button>
              <button
                data-active={program == 'ftc'}
                onclick={() => {
                  program = 'ftc';
                }}
                class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none disabled:cursor-default disabled:opacity-50 data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
              >
                FTC
              </button>
              <button
                data-active={program == 'frc'}
                disabled={true}
                onclick={() => {
                  program = 'frc';
                }}
                class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none disabled:cursor-default disabled:opacity-50 data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
              >
                FRC
              </button>
            </div>
            <div class="inline-flex h-9 rounded-lg bg-zinc-800 p-1 text-zinc-400">
              <button
                data-active={type == true}
                disabled={program == 'ftc' || program == 'frc'}
                onclick={() => (type = true)}
                class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none disabled:cursor-default disabled:opacity-50 data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
              >
                Regular
              </button>
              <button
                data-active={type == false}
                disabled={program == 'ftc' || program == 'frc'}
                onclick={() => (type = false)}
                class="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none data-[active=true]:bg-zinc-950 data-[active=true]:text-zinc-50"
              >
                Skills
              </button>
            </div>
          </div>
          <div class="my-3 space-y-1">
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
          <LinkPrimary href="/game/score" extraProps="w-full">Calculator</LinkPrimary>
        </div>
      {/if}
    </div>
    <p class="mt-3 text-center text-xs text-zinc-400">
      all sound effects are used under fair use terms. gears claims no ownership of these sounds.
    </p>
  </div>
</Container>
