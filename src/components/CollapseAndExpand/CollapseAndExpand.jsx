import React, { useState } from 'react';
import style from './CollapseAndExpand.module.scss';

const CollapseAndExpand = (props) => {
  const [collapseActive, setCollapseActive] = useState(true);
  let ArrowType = collapseActive ? 'fa-arrow-left' : 'fa-arrow-right';
  const handleClick = () => {
    setCollapseActive(!collapseActive);
    let expandableValue = ArrowType == 'fa-arrow-left' ? '10px' : '210';
    props.onChange(expandableValue);
  };

  const handleEnterEvent = () => {
    props.onHideArrow(true);
  }
  const handleLeaveEvent = () => {
    props.onHideArrow(false);
  }

  if (props.isHidenArrow) {
    return (
      <div onMouseEnter = {handleEnterEvent} onMouseLeave = {handleLeaveEvent} className={style.collapseAndExpandRow} onClick={handleClick}>
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
