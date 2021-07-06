import { CardData } from '../interfaces';

export function mixArray(arr: CardData[]): CardData[] {
  const array = arr.slice(0);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let t = array[i]; 
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}