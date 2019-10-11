import React from 'react';
import PropType from 'prop-types';
import style from './CollapseAndExpand.module.scss';

const CollapseAndExpand = ({
  isMenuHidden,
  isHidenArrow,
  onChange,
  onHideArrow,
}) => {
  const ArrowType = isMenuHidden ? 'fa-arrow-right' : 'fa-arrow-left';

  const handleClick = () => {
    const expandableValue = isMenuHidden ? 200 : 0;
    onChange(expandableValue);
  };

  const handleEnterEvent = () => {
    onHideArrow(true);
  };

  if (isHidenArrow) {
    return (
      <div
        onMouseEnter={handleEnterEvent}
        className={style.collapseAndExpandRow}
        onClick={handleClick}
      >
        <span className={`${style.arrowPosition} fas ${ArrowType} `}></span>
      </div>
    );
  }
  return null;
};

export default CollapseAndExpand;

CollapseAndExpand.proptypes = {
  isMenuHidden: PropType.func,
  isHidenArrow: PropType.func,
  onChange: PropType.func,
  onHideArrow: PropType.func,
};
