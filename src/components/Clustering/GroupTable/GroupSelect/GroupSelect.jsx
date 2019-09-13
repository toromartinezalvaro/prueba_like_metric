import React from 'react';

const groupSelect = ({ value, onChange, groups, ...rest }) => {
  return (
    <select value={value} onChange={onChange}>
      {groups.map(group => {
        return <option value={group.id}>{group.name}</option>;
      })}
    </select>
  );
};

export default groupSelect;
