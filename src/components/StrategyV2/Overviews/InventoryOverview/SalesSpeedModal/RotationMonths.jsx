import React from 'react';
import { useSelector } from 'react-redux';
import Widget from '../../../Shared/Widget';

const RotationMonths = () => {
  const rotationMonths = useSelector(
    (state) =>
      (
        state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
          .objective || { retentionMonths: 0 }
      ).retentionMonths,
  );
  return (
    <Widget title="Rotación de inventario objetivo">{rotationMonths}</Widget>
  );
};

export default RotationMonths;
