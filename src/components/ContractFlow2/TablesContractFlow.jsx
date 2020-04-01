import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  GroupingState,
  SelectionState,
  IntegratedGrouping,
  CustomGrouping,
} from '@devexpress/dx-react-grid';

import styles from './TableContractFlow.module.scss';

const TablesContractFlow = ({ billings }) => {
  const [rows, setRows] = useState([{ group: 'default' }, { item: 'default' }]);
  const [columns, setColumns] = useState([
    { name: 'group', title: 'default' },
    { name: 'item', title: 'default' },
  ]);

  const [tableColumnExtensions, setTableColumnExtensions] = useState([
    { columnName: 'contract', width: 210 },
    { columnName: 'acumulated', width: 110 },
    { columnName: 'projected', width: 110 },
    { columnName: 'total', width: 110 },
    { columnName: 'date', width: 100 },
    { columnName: 'group', width: 200 },
    { columnName: 'item', width: 120 },
  ]);

  const numberFormater = (number) => {
    return (
      <NumberFormat
        value={number}
        thousandSeparator
        displayType={'text'}
        isNumericString
        prefix="$"
      />
    );
  };

  const datesInitialNumber = (bill, i) => {
    let initialNumber = 0;
    // eslint-disable-next-line no-unused-expressions
    bill.items[i] &&
      bill.items[i].contracts.forEach((information) => {
        information.billing.forEach((internalInfo) => {
          if (
            Number(
              moment(Number(information.schedulesDate.salesStartDate)).add(
                Number(internalInfo.displacement),
                'M',
              ),
            ) >= initialNumber
          ) {
            initialNumber = Number(
              moment(Number(information.schedulesDate.salesStartDate)).add(
                Number(internalInfo.displacement),
                'M',
              ),
            );
          }
        });
      });
    return initialNumber;
  };

  const datesFinalNumber = (bill, i) => {
    let finalNumber = [];
    bill.items[i] &&
      bill.items[i].contracts.forEach((information) => {
        information.billing.forEach((internalInfo) => {
          if (
            Number(
              moment(Number(internalInfo.lastBillingDate)).add(
                Number(internalInfo.paymentNumber),
                'M',
              ),
            ) >= finalNumber
          ) {
            finalNumber.push(
              Number(
                moment(Number(internalInfo.lastBillingDate)).add(
                  Number(internalInfo.paymentNumber),
                  'M',
                ),
              ),
            );
          }
        });
      });
    return Math.max(...finalNumber);
  };

  const GroupCellContent = ({ column, row }) => (
    <span>
      {column.title === 'Grupo' ? (
        <i className={styles.forColumnGroup}>{column.title}</i>
      ) : (
        <i className={styles.forColumnItem}>{column.title}</i>
      )}{' '}
      : <strong>{row.value}</strong>
    </span>
  );

  const textFormater = (title, type) => {
    switch (type) {
      case 'group':
        return <span className={styles.forColumnGroup}>{title}</span>;
      case 'item':
        return <span className={styles.forColumnItem}>{title}</span>;
      case 'text':
        return <span>{title}</span>;
      default:
        break;
    }
  };

  const totalFunc = (total) => {
    let totalAdded = 0;
    const completeTotal = total.map((totalValue) => {
      totalAdded += parseInt(totalValue, 10);
      return totalAdded;
    });
    return totalAdded;
  };

  const projectedFunc = (arrProjected) => {
    let valueTotal = 0;
    arrProjected.forEach((value) => {
      if (value.length > 1) {
        value.slice(2).forEach((item) => {
          valueTotal += item.value;
        });
      } else if (value.length <= 1) {
        value.slice(2).forEach((item) => {
          valueTotal += item.value;
        });
      }
    });
    return parseInt(valueTotal, 10);
  };

  const acummulatedFunc = (acummulated) => {
    let totalAcummulated = 0;
    acummulated.forEach((value) => {
      totalAcummulated += value[1].value;
    });
    return parseInt(totalAcummulated, 10);
  };
  let bigDummie = 0;
  const deepInformation = (
    bill,
    group,
    item,
    q,
    initialNumber,
    finalNumber,
  ) => {
    const numberOfDates =
      Math.round(moment(finalNumber).diff(initialNumber, 'months', true)) > 0 &&
      finalNumber > initialNumber
        ? Math.round(moment(finalNumber).diff(initialNumber, 'months', true))
        : Math.round(moment(initialNumber).diff(finalNumber, 'months', true));
    bigDummie = numberOfDates > bigDummie ? numberOfDates : bigDummie;
    const information = bill.items.map((value, t) => {
      return value.contracts.map((val, n) => {
        let prices = {};
        const contract = textFormater(val.title, 'text');
        const acumulated =
          val.acumulated.length !== 0 ? acummulatedFunc(val.acumulated) : 0;
        const projected =
          val.projected.length !== 0 ? projectedFunc(val.projected) : 0;
        let result = {
          group,
          item: item[t],
          contract,
          acumulated: numberFormater(acumulated),
          projected: numberFormater(projected),
          total: numberFormater(acumulated + projected),
        };

        const initialDatesValues = [...Array(bigDummie)].forEach(
          (column, x) => {
            const name = `date${x}`;
            result = { ...result, [name]: [numberFormater(0)] };
          },
        );
        const datesValues = val.billings.map((dateValue, K) => {
          dateValue.slice(1).forEach((singleValue, l) => {
            const name = `date${l}`;
            if (
              columns.find(
                (element) =>
                  element.title ===
                  String(
                    moment(Number(singleValue.date))
                      .add(singleValue.displacement, 'M')
                      .format('MMM YYYY'),
                  ),
              )
            ) {
              prices = {
                ...prices,
                [name]: [singleValue.value + prices[name][0]],
              };
            } else {
              prices = { ...prices, [name]: [singleValue.value] };
            }
            result = { ...result, [name]: [numberFormater(prices[name][0])] };
          });
        });
        return result;
      });
    });
    return information;
  };

  useEffect(() => {
    let active = true;
    if (active) {
      const rowsPerLine = () => {
        const rows = billings.reduce((acummulated, bill, n) => {
          const billingsForDates = () => {
            const initialNumber = [];
            const finalNumber = [];
            const initial = billings.map((bill, n) => {
              const billLength = bill.items.length;
              bill.items &&
                bill.items.map((individual) => {
                  individual.contracts.forEach((information) => {
                    information.billing.forEach((internalInfo) => {
                      initialNumber.push(
                        Number(
                          moment(
                            Number(information.schedulesDate.salesStartDate),
                          ).add(Number(internalInfo.displacement), 'M'),
                        ),
                      );
                    });
                  });
                });
            });
            const final = billings.map((bill, n) => {
              const billLength = bill.items.length;
              bill.items &&
                bill.items.map((individual) => {
                  individual.contracts.forEach((information) => {
                    information.billing.forEach((internalInfo) => {
                      finalNumber.push(
                        Number(
                          moment(Number(internalInfo.lastBillingDate)).add(
                            Number(internalInfo.paymentNumber),
                            'M',
                          ),
                        ),
                      );
                    });
                  });
                });
            });
            return {
              initialNumber: Math.min(...initialNumber),
              finalNumber: Math.max(...finalNumber),
            };
          };
          const { initialNumber } = billingsForDates();
          const { finalNumber } = billingsForDates();
          const group = bill.group;
          const item = bill.items.map((value) => value.item);
          const contracts = deepInformation(
            bill,
            group,
            item,
            n,
            initialNumber,
            finalNumber,
          );
          contracts.forEach((contract) =>
            contract.forEach((row) => {
              acummulated.push(row);
            }),
          );
          return acummulated;
        }, []);

        return rows;
      };
      let firstPull = true;
      let dummie = 0;

      const billingsForDates = () => {
        const initialNumber = [];
        const finalNumber = [];
        const initial = billings.map((bill, n) => {
          const billLength = bill.items.length;
          bill.items &&
            bill.items.map((individual) => {
              individual.contracts.forEach((information) => {
                information.billing.forEach((internalInfo) => {
                  initialNumber.push(
                    Number(
                      moment(
                        Number(information.schedulesDate.salesStartDate),
                      ).add(Number(internalInfo.displacement), 'M'),
                    ),
                  );
                });
              });
            });
        });
        const final = billings.map((bill, n) => {
          const billLength = bill.items.length;
          bill.items &&
            bill.items.map((individual) => {
              individual.contracts.forEach((information) => {
                information.billing.forEach((internalInfo) => {
                  finalNumber.push(
                    Number(
                      moment(Number(internalInfo.lastBillingDate)).add(
                        Number(internalInfo.paymentNumber),
                        'M',
                      ),
                    ),
                  );
                });
              });
            });
        });
        return {
          initialNumber: Math.min(...initialNumber),
          finalNumber: Math.max(...finalNumber),
        };
      };

      const columnsPerLine = billings.map((bill, n) => {
        const { initialNumber } = billingsForDates();
        const { finalNumber } = billingsForDates();
        const numberOfDates =
          Math.round(moment(finalNumber).diff(initialNumber, 'months', true)) >
            0 && finalNumber > initialNumber
            ? Math.round(
                moment(finalNumber).diff(initialNumber, 'months', true),
              )
            : Math.round(
                moment(initialNumber).diff(initialNumber, 'months', true),
              );

        let objects = [];
        dummie = numberOfDates > dummie ? numberOfDates : dummie;
        if (firstPull) {
          objects = [...Array(dummie)].map((value, index) => {
            return {
              name: `date${index}`,
              title: String(
                moment(initialNumber)
                  .add(index, 'M')
                  .format('MMM YYYY'),
              ),
            };
          });
          firstPull = false;
        }
        return objects;
      });

      const columnsPerLineDefined = columnsPerLine.flatMap((items) => {
        return items.flatMap((item) => {
          return [item];
        });
      });

      columnsPerLineDefined.unshift(
        { name: 'contract', title: 'Contrato' },
        { name: 'group', title: 'Grupo' },
        { name: 'item', title: 'Item' },
        { name: 'acumulated', title: 'Acumulado' },
        { name: 'projected', title: 'Proyectado' },
        { name: 'total', title: 'Total' },
      );
      setColumns(columnsPerLineDefined);
      setRows(rowsPerLine);
    }
    return () => {
      active = false;
    };
  }, [billings]);

  const [leftColumns] = useState([
    'contract',
    'acumulated',
    'projected',
    'total',
    'group',
    'item',
  ]);
  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <GroupingState
          grouping={[
            { columnName: 'group', width: 150 },
            { columnName: 'item' },
          ]}
        />
        <IntegratedGrouping />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableGroupRow contentComponent={GroupCellContent} />
        <TableFixedColumns leftColumns={leftColumns} />
      </Grid>
    </Paper>
  );
};

export default TablesContractFlow;
