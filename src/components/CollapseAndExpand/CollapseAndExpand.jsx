import React, { useState } from 'react';
import style from './CollapseAndExpand.module.scss';

const CollapseAndExpand = (props) => {
  const [collapseActive, setCollapseActive] = useState(props.isMenuHidden);
  let ArrowType = !props.isMenuHidden ? 'fa-arrow-left' : 'fa-arrow-right';
  console.log("props.isMenuHidden ", props.isMenuHidden)
  const handleClick = () => {
    setCollapseActive(!collapseActive);
    let expandableValue = collapseActive ? 0 : 200;
    props.onChange(expandableValue);
  };

  const handleEnterEvent = () => {
    props.onHideArrow(true);
  }
  const handleLeaveEvent = () => {
    props.onHideArrow(false);
  }
console.log("ssshiiit", props.isHidenArrow)
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
