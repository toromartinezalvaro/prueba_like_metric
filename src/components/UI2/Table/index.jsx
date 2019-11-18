import React from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Styles from './Table.module.scss';

import 'react-virtualized/styles.css';

const Table2 = ({ children, columns, data, ...rest }) => {
  const cellRenderer = ({ cellData }) => {
    return <div className={Styles.Cell}>{cellData}</div>;
  };

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          width={width}
          height={500}
          headerHeight={50}
          rowHeight={50}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          headerClassName={Styles.ReactVirtualizedTableheaderRow}
        >
          {columns.map((column) => (
            <Column
              key={column.dataKey}
              label={column.label}
              dataKey={column.dataKey}
              width={column.width}
              cellRenderer={cellRenderer}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
};

export default Table2;
