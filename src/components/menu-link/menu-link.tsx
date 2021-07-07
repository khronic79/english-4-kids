import { NavLink } from "react-router-dom";
import cards from '../../cards';
import './menu-link.css';

export function MenuLink({category, cb}: any) {
  
  return (
    <li className="nav-item"><NavLink to={'/english-4-kids/game/'+category } onClick={() => {cb()}}>{cards[0][category]}</NavLink></li>  
  );
}