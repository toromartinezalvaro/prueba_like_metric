import React, { useState } from 'react';
import style from './CollapseAndExpand.module.scss';

const CollapseAndExpand = ({ onChange }) => {
  const [collapseActive, setCollapseActive] = useState(true);
  let ArrowType = collapseActive ? 'fa-arrow-left' : 'fa-arrow-right';
  const handleClick = () => {
    setCollapseActive(!collapseActive);
    let expandableValue = (ArrowType == 'fa-arrow-left' ? '10px':'210')
    onChange(expandableValue);
  };
  return (
    <div className={style.collapseAndExpandRow} onClick={handleClick}>
      <span
        className={`${style.arrowPosition}` + ' ' + `fas ${ArrowType} `}
      ></span>
    </div>
  );
};

export default CollapseAndExpand;