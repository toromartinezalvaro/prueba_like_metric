import React from 'react';

const groupSelect = ({ value, onChange, groups, locked, ...rest }) => {
  return (
    <select value={value} onChange={onChange} disabled={locked}>
      {groups.map((group) => {
        return <option value={group.id}>{group.name}</option>;
      })}
    </select>
  );
};

export default groupSelect;
