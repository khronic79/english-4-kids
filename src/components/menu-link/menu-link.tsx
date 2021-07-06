import { NavLink } from "react-router-dom";
import cards from '../../cards';

export function MenuLink({category}: any) {
  
  return (
    <li className="nav-item"><NavLink to={'/english-4-kids/game/'+category}>{cards[0][category]}</NavLink></li>  
  );
}