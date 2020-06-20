import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Badge from '@material-ui/core/Badge';
import NumberFormat from 'react-number-format';
import HoverContainer from '../../../../UI2/HoverContainer';
import Button from '../../../../UI2/Button';
import Styles from './Table.module.scss';
import AdditionalAreaRequestsServices from '../../../../../services/AdditionalAreaRequests';
import PreventDelete from '../PreventDelete';

const services = new AdditionalAreaRequestsServices();

const Table = ({ property, deleteAdditionalAreaHandler, status }) => {
  const [type, setType] = useState('');
  const [openPrevent, setOpenPrevent] = useState(false);
  const [areaForDelete, setAreaForDelete] = useState('');
  const { towerId } = useParams();
  const getSubtotal = () => {
    const adminSubtotal = property.adminAdditionalAreas.reduce(
      (current, next) => current + next.unitPrice,
      0,
    );
    const addedSubtotal = property.addedAdditionalAreas.reduce(
      (current, next) => current + next.unitPrice,
      0,
    );
    return adminSubtotal + addedSubtotal;
  };

  const handleDesist = async (additionalArea) => {
    try {
      await services.postRequest({ additionalArea, tower: towerId });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDelete = () => {
    setAreaForDelete('');
    setOpenPrevent(false);
  };

  const confirmDelete = (areaToDelete) => {
    if (type === 'delete') {
      deleteAdditionalAreaHandler(areaToDelete);
    } else if (type === 'desist') {
      handleDesist(areaToDelete.id);
    }
    handleCloseDelete();
  };

  const tryToDelete = (areaToDelete, typeP) => {
    setOpenPrevent(true);
    setType(typeP);
    setAreaForDelete(areaToDelete);
  };

  return (
    <Fragment>
      <MUITable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Nomenclatura</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Unidad</TableCell>
            <TableCell align="center">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {property.adminAdditionalAreas.map((additionalArea) => {
            console.log(additionalArea);
            return (
              <TableRow key={additionalArea.id}>
                <TableCell component="th" scope="row">
                  {status === 'SOLD' ? (
                    <HoverContainer
                      noHover={
                        additionalArea.nomenclature ||
                        additionalArea.areaType.name
                      }
                      hover={
                        <Button
                          onClick={() => {
                            tryToDelete(additionalArea, 'desist');
                          }}
                        >
                          Desistir
                        </Button>
                      }
                    />
                  ) : (
                    <span>
                      {additionalArea.nomenclature ||
                        additionalArea.areaType.name}
                    </span>
                  )}
                </TableCell>
                <TableCell align="center">
                  {additionalArea.areaType.unit === 'MT2'
                    ? additionalArea.measure
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  {additionalArea.areaType.unit || '-'}
                </TableCell>
                <TableCell align="center">
                  <NumberFormat
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    value={additionalArea.price}
                  />
                  {additionalArea.additionalAreaRequests &&
                  additionalArea.additionalAreaRequests.some(
                    (request) =>
                      request.action === 'D' && request.status === 'P',
                  ) ? (
                    <Badge badgeContent={'P'} color="secondary"></Badge>
                  ) : null}
                </TableCell>
              </TableRow>
            );
          })}
          {property.addedAdditionalAreas.map((additionalArea) => {
            return (
              <TableRow key={additionalArea.id}>
                <TableCell align="center">
                  <HoverContainer
                    noHover={`${additionalArea.nomenclature} -
                       ${additionalArea.areaType.name}`}
                    hover={
                      <div className={Styles.buttonClose}>
                        <Button
                          onClick={() =>
                            additionalArea.propertyId
                              ? tryToDelete(additionalArea, 'desist')
                              : tryToDelete(additionalArea, 'delete')
                          }
                        >
                          {additionalArea.propertyId ? 'Desistir' : 'x'}
                        </Button>
                      </div>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  {additionalArea.areaType.unit === 'MT2' ? 'MT2' : 'UNIT'}
                </TableCell>
                <TableCell align="center">
                  {additionalArea.areaType.measure || '-'}
                </TableCell>
                <TableCell align="rigth">
                  <div className={Styles.priceAndAction}>
                    <NumberFormat
                      displayType="text"
                      thousandSeparator
                      prefix="$"
                      value={additionalArea.price}
                      className={Styles.price}
                    />
                    {additionalArea.additionalAreaRequests &&
                    additionalArea.additionalAreaRequests.some(
                      (request) =>
                        request.action === 'D' && request.status === 'P',
                    ) ? (
                      <Badge badgeContent={'P'} color="secondary"></Badge>
                    ) : null}
                  </div>
                </TableCell>
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
      <div className={Styles.subTotal}>
        <div className={Styles.label}>Subtotal</div>
        <div className={Styles.value}>
          <NumberFormat
            displayType="text"
            thousandSeparator
            prefix="$"
            value={getSubtotal()}
          />
        </div>
      </div>
      <PreventDelete
        open={openPrevent}
        actionDelete={confirmDelete}
        handleClose={handleCloseDelete}
        areaForDelete={areaForDelete}
      />
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
