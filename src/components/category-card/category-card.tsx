import { NavLink } from "react-router-dom";
import cards from '../../cards';
import './category-card.css'

export function CategoryCard() {
  const cardsArr = (cards.slice(1)) as unknown as {
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
}[][];
  const categoriesArr = cards[0] as string[];
  const categories = categoriesArr.map((category, i) => {
    return (
      <NavLink key={i} to={'/english-4-kids/game/'+i} className="category-link">
        <div className="category">
          <div className="categoty-img-wrapper">
            <img src={"/english-4-kids/" + cardsArr[i][0].image} alt={category} />
            <div className="category-name"><span>{category}</span></div>
          </div>
        </div>
      </NavLink>
    );
  });

  return (
    <main className="main-section">
      <div className="cards-container">
        {categories}
      </div>
    </main>
  );
}