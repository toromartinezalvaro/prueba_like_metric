import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HoverContainer from '../../../../UI2/HoverContainer';
import Button from '../../../../UI2/Button';
import Styles from './Table.module.scss';

const Table = ({ property, deleteAdditionalAreaHandler }) => {
  return (
    <Fragment>
      <MUITable>
        <TableHead>
          <TableRow>
            <TableCell>Nomenclatura</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Unidad</TableCell>
            <TableCell>Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {property.adminAdditionalAreas.map((additionalArea) => {
            return (
              <TableRow key={additionalArea.id}>
                <TableCell>
                  {additionalArea.nomenclature || additionalArea.areaType.name}
                </TableCell>
                <TableCell>
                  {additionalArea.areaType.unit === 'MT2'
                    ? additionalArea.measure
                    : '-'}
                </TableCell>
                <TableCell>{additionalArea.areaType.unit}</TableCell>
                <TableCell>{additionalArea.price}</TableCell>
              </TableRow>
            );
          })}
          {property.addedAdditionalAreas.map((additionalArea) => {
            return (
              <TableRow key={additionalArea.id}>
                <TableCell>
                  <HoverContainer
                    noHover={
                      additionalArea.nomenclature ||
                      additionalArea.areaType.name
                    }
                    hover={
                      <Button
                        onClick={() => {
                          deleteAdditionalAreaHandler(additionalArea);
                        }}
                      >
                        Eliminar area
                      </Button>
                    }
                  />
                </TableCell>
                <TableCell>
                  {additionalArea.areaType.unit === 'MT2'
                    ? additionalArea.measure
                    : '-'}
                </TableCell>
                <TableCell>{additionalArea.areaType.unit}</TableCell>
                <TableCell>{additionalArea.price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MUITable>
      {property.addedAdditionalAreas.length === 0 &&
        property.adminAdditionalAreas.length === 0 && (
          <div className={Styles.noAdditionalAreasContainer}>
            No hay areas adicionales
          </div>
        )}
    </Fragment>
  );
};

Table.propTypes = {
  property: PropTypes.shape({
    additionalAreas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        measure: PropTypes.number,
        price: PropTypes.number,
        nomenclature: PropTypes.string,
        areaType: PropTypes.shape({
          name: PropTypes.string,
          unit: PropTypes.string,
        }),
      }),
    ),
    addedAdditionalAreas: PropTypes.array,
  }).isRequired,
  deleteAdditionalAreaHandler: PropTypes.func.isRequired,
};

export default Table;
