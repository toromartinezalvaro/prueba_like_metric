import React from 'react';
import { useSelector } from 'react-redux';
import Widget from '../../../Shared/Widget';

const SalesSpeed = () => {
  const saleSpeed = useSelector(
    (state) =>
      (
        state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
          .objective || { saleSpeed: 0 }
      ).saleSpeed,
  );
  return <Widget title="Velocidad de ventas">{saleSpeed}</Widget>;
};

export default SalesSpeed;
