interface ForStars {
  currentWord: boolean[];
}

export function Stars({currentWord}: ForStars) {

  let stars = [];
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i]) {
      stars.push(<img key={i.toString()} src="/english-4-kids/img/star-win.svg" alt="ok"/>);
    } else stars.push(<img key={i.toString()} src="/english-4-kids/img/star.svg" alt="ok"/>);
  }
  return (
    <div className="stars">{stars}</div>
  );
}