import React, { useState, useEffect } from 'react';
import './sitdebar.css';
import NenuLink from './NenuLink';
import useAuth from '../../hooks/useAuth';

const SitdeBar = () => {
  const { firstName, email, roles, isAdmin, isUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      document.body.classList.add('menu-open'); // הוספת מחלקת menu-open כאשר התפריט פתוח
    } else {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('menu-open'); // הסרת מחלקת menu-open כאשר התפריט סגור
    }
  }, [isOpen]);

  const menuItems = [
    {
      title: 'דפים',
      className: 'right-column',
      list: [
        { title: 'עמוד הבית', path: '/' },
        { title: 'קצת עלינו', path: '/about' },
        { title: 'השירותים שלנו', path: '/our-services' },
        { title: 'מספרים עלינו', path: '/they-tell-us' },
        { title: 'מחשבון משכנתא', path: '/mortgage-calculator' },
        { title: 'צור קשר', path: '/contact-us' },
      ],
    },
    {
      title: 'משתמש',
      className: 'left-column',
      list: [
        { title: isUser || isAdmin ? 'אזור אישי' : 'התחברות', path: isUser ? '/private-area' : isAdmin ? '/aprivate-area' : '/login' },
        !isUser && !isAdmin && { title: 'הרשמה', path: '/signup' },
      ].filter(Boolean),
    },
  ];

  return (
    <>
      <div className='hamburger-menu'>
        <button className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </button>
      </div>
      <div className={`side-bar ${isOpen ? 'show' : ''}`}>
        <div className="side-bar-user">
          <div className="side-bar-user-details">
            <span className="side-car-user-username">שם משתמש: {firstName}</span>
            <span className="side-car-user-title">מייל: {email}</span>
            <span className="side-car-user-title">סוג: {roles}</span>
          </div>
        </div>
        <div className="side-bar-menuItems">
          <ul className="side-bar-menu-list">
            <img className="side-bar-menu-img" src="./Rectangle.png" alt="User avatar" />
            {menuItems.map((cat) => (
              <li key={cat.title} className={cat.className}>
                {cat.title === 'משתמש' ? (
                  <span className="side-bar-menu-catM">{cat.title}</span>
                ) : (
                  <span className="side-bar-menu-cat">{cat.title}</span>
                )}
                {cat.list.map((item) => (
                  <NenuLink itme={item} key={item.title} menuItems={isAdmin} toggleMenu={toggleMenu} />
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SitdeBar;
