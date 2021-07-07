import React, { useEffect } from 'react';
import './menu.css';
import { NavLink } from 'react-router-dom';
import cards from '../../cards';
import { MenuLink } from '../menu-link/menu-link';

function Menu({cb}: {cb: () => void}) {
  const links = cards[0].map((item, i) => {
    return <MenuLink cb={cb} key={i} category = {i}/>;
  });

  return (
    <ul className="nav">
      <li className="nav-item main"><NavLink exact to="/english-4-kids/" onClick={() => {cb()}}>Main page</NavLink></li>
      {links}
      <li className="nav-item stat"><NavLink to="/english-4-kids/statistic" onClick={() => {cb()}}>Statistic</NavLink></li>
    </ul>
  );
}

export default Menu;