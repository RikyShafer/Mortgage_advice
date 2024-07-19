import React from 'react';
import { NavLink } from 'react-router-dom';

const NenuLink = ({ itme, menuItems }) => {
  if (!itme || !itme.path) {
    console.error('Item or path is undefined:', itme);
    return null;
  }
  // בדיקה אם הכותרת היא "משתמש" ולא להציג
  if (itme.title === 'משתמש') {
    return null;
  }

  if (menuItems) {
    return (
      <div className="nav">
        <NavLink to={itme.path} className="side-bar-menu-link">
          {itme.icon}
          {itme.title}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="nav">
      <NavLink to={itme.path} className="side-bar-menu-link">
        {itme.icon}
        {itme.title}
      </NavLink>
    </div>
  );
};

export default NenuLink;
