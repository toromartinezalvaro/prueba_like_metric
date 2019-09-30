import React from 'react';
import Select from 'react-select';
import Table from '../../../UI/Table/Table';

const DefinitionsPropertyRatings = () => {
  return (
    <div>
      <Table
        intersect="Nomenclatura"
        headers={['Header 1']}
        columns={['Column 1']}
        data={[
          [
            <Select
              options={[{ value: 1, label: '1' }, { value: 2, label: '2' }]}
            />,
          ],
        ]}
      />
    </div>
  );
};

export default DefinitionsPropertyRatings;
