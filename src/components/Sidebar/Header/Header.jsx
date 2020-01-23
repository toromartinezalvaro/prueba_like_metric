import React, { useState, Fragment } from 'react';
import style from '../SideMenu.module.scss';

const Header = ({ title, validation }) => {
  const [showTitle, setShowTitle] = useState(validation);

  return (
    <Fragment>
      {showTitle && <div className={style.header}>{title}</div>}
    </Fragment>
  );
};

export default Header;
