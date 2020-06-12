import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const groupSelect = ({ value, onChange, groups, locked, ...rest }) => {
  return (
    <Select value={value} onChange={onChange} disabled={locked}>
      {groups.map((group) => {
        return <MenuItem value={group.id}>{group.name}</MenuItem>;
      })}
    </Select>
  );
};

export default groupSelect;
