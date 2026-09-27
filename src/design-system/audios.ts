/**
 * One HTMLAudioElement per url, reused.
 *
 * A UI sound is played hundreds of times; minting a fresh Audio per play means
 * a fresh fetch and decode before the first sample, which is audible as lag on
 * exactly the interaction that has to feel instant.
 */
const soundCache: { [url: string]: HTMLAudioElement | undefined } = {};

/**
 * Play one sound. `volume` is 0-1.
 *
 * `currentTime = 0` first is what makes a rapid double-click sound like two
 * clicks rather than one: without it the second call is a no-op on an element
 * that is already playing.
 *
 * A rejected play() is swallowed on purpose — the usual cause is the browser's
 * autoplay policy refusing a sound that no gesture asked for, which is the
 * browser working as intended rather than an error the page should surface.
 */
export const playSound = (url?: string, volume?: number) => {
  if (!url || typeof Audio === "undefined") return;
  const audio = soundCache[url] || (soundCache[url] = new Audio(url));
  audio.currentTime = 0;
  if (typeof volume === "number") {
    audio.volume = Math.max(0, Math.min(1, volume));
  }
  const played = audio.play();
  if (played && typeof played.catch === "function") played.catch(() => {});
};

/** Stop one sound and rewind it, so the next play starts from the top. */
export const stopSound = (url?: string) => {
  const audio = url ? soundCache[url] : undefined;
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
};

/** Silence everything, without the caller having to name what is playing. */
export const stopAllSounds = () => {
  Object.keys(soundCache).forEach((key) => {
    const audio = soundCache[key];
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  });
};
export const Audios = {};
