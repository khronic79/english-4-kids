import React from 'react';
import './menu.css';
import { NavLink } from 'react-router-dom';
import cards from '../../cards';
import { MenuLink } from '../menu-link/menu-link';

function Menu() {
  const links = cards[0].map((item, i) => {
    return <MenuLink key={i} category = {i}/>;
  });

  return (
    <ul className="nav">
      <li className="nav-item"><NavLink to="/">Main page</NavLink></li>
      {links}
      <li className="nav-item stat"><NavLink to="/statistic">Statistic</NavLink></li>
    </ul>
  );
}

export default Menu;