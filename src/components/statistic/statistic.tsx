import { useMemo, useState } from 'react';
import cards from '../../cards';
import { CardData } from '../../interfaces';
import './statistic.css';

interface LoccalStorageData {
  [word: string]: {
    [train: string]: number;
  }
}
const useSortableData = (items: { [category: string]: string; word: string; translation: string; train: string; success: string; error: string; percent: string; }[], config: null | {key: string; direction: string} = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export function Statistic() {
  const categories = cards[0] as string[];
  const words = (cards.slice(1)) as unknown as CardData[][];
  let arr: {
    category: string;
    word: string;
    translation: string;
    train: string;
    success: string;
    error: string;
    percent: string
  }[] = [];
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      let train: string;
      let success: string;
      let error: string;
      let percent: string;
      if (localStorage.getItem(i.toString())) {
        let data = (JSON.parse(localStorage.getItem(i.toString()) as string)) as LoccalStorageData;
        if (data[words[i][j].word]) {
          train = (data[words[i][j].word]['train']).toString();
          success = (data[words[i][j].word]['success']).toString();
          error = (data[words[i][j].word]['error']).toString();
          percent = (((+success) / ((+success) + (+error))) * 100).toString();
          percent = percent !== 'NaN'? percent: "no data";
        } else {
          train = '0';
          success = '0';
          error = '0';
          percent = '0';
        }
      } else {
        train = '0';
        success = '0';
        error = '0';
        percent = '0';
      }
      let line = {
        category: categories[i],
        word: words[i][j].word,
        translation: words[i][j].translation,
        train,
        success,
        error,
        percent,
      }
      arr.push(line);
    }
  }
  const { items, requestSort, sortConfig } = useSortableData(arr);

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table>
      <caption>Statistic</caption>
      <thead>
        <tr>
          <th onClick={() => {requestSort('category')}} className={getClassNamesFor('category')}>Category</th>
          <th onClick={() => {requestSort('word')}} className={getClassNamesFor('word')}>Word</th>
          <th onClick={() => {requestSort('translation')}} className={getClassNamesFor('translation')}>Translation</th>
          <th onClick={() => {requestSort('train')}} className={getClassNamesFor('train')}>Train</th>
          <th onClick={() => {requestSort('success')}} className={getClassNamesFor('success')}>Success</th>
          <th onClick={() => {requestSort('error')}} className={getClassNamesFor('error')}>Error</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {items.map((word, i) => (
          <tr key={i}>
            <td>{word.category}</td>
            <td>{word.word}</td>
            <td>{word.translation}</td>
            <td>{word.train}</td>
            <td>{word.success}</td>
            <td>{word.error}</td>
            <td>{word.percent}</td>
          </tr>
        ))}
      </tbody>
  </table>
  );
}