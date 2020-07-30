import React from 'react';
import { useSelector } from 'react-redux';
import Widget from '../../../Shared/Widget';
import validateSelectedGroup from '../../../Shared/Validator';

const RotationMonths = () => {
  const rotationMonths = useSelector((state) => {
    if (validateSelectedGroup(state.strategy.root)) {
      return {};
    }
    return (
      state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
        .objective || { retentionMonths: 0 }
    ).retentionMonths;
  });
  return (
    <Widget title="Rotación de inventario objetivo">{rotationMonths}</Widget>
  );
};

export default RotationMonths;
