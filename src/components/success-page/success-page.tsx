import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { playAudio } from "../../shared/play-audio";

export function SuccessPage ({result}: {result: string}) {
  const [isForward, setisForward] = useState(false);

  useEffect(() => {
    (async function() {
      playAudio(`/english-4-kids/audio/${result}.mp3`);
      await setTimeout(() => {
        setisForward(true);
      }, 3000);
    }())
  }, []);

  return (
    <div>
      <img src={"/english-4-kids/img/" + result + '.jpg'} alt={result} />
      { isForward ? <Redirect to="/" /> : '' }
    </div>
  );
}