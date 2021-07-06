export function playAudio(audioSrc: string) {
    let audio = new Audio();
    audio.preload = 'auto';
    audio.src = audioSrc;
    const audioPromise = audio.play()
    if (audioPromise !== undefined) {
      audioPromise
        .then(_ => {
          // autoplay started
        })
        .catch(err => {
          // catch dom exception
          console.info(err)
        })
    }
  }