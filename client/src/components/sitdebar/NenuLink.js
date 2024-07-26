import React from 'react';
import { NavLink } from 'react-router-dom';

const NenuLink = ({ itme, menuItems, toggleMenu }) => {
  if (!itme || !itme.path) {
    console.error('Item or path is undefined:', itme);
    return null;
  }
  // בדיקה אם הכותרת היא "משתמש" ולא להציג
  if (itme.title === 'משתמש') {
    return null;
  }

  const handleClick = () => {
    toggleMenu();
  };

  return (
    <div className="nav">
      <NavLink to={itme.path} className="side-bar-menu-link" onClick={handleClick}>
        {itme.icon}
        {itme.title}
      </NavLink>
    </div>
  );
};

export default NenuLink;
