import React, { useState } from 'react';
import style from './CollapseAndExpand.module.scss';

const CollapseAndExpand = (props) => {
  const ArrowType = !props.isMenuHidden ? 'fa-arrow-left' : 'fa-arrow-right';
  
  const handleClick = () => {
    const expandableValue = !props.isMenuHidden ? 0 : 200;
    props.onChange(expandableValue);
  };

  const handleEnterEvent = () => {
    props.onHideArrow(true);
  }

  if (props.isHidenArrow) {
    return (
      <div onMouseEnter = {handleEnterEvent} className={style.collapseAndExpandRow} onClick={handleClick}>
        <span
          className={`${style.arrowPosition}` + ' ' + `fas ${ArrowType} `}
        ></span>
      </div>
    );
  } else {
    return(
      <div></div>
    )
  }
};

export default CollapseAndExpand;
