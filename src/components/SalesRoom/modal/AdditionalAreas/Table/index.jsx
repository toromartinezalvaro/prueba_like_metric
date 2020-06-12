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
  const [pending, setPending] = useState(false);
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
      setPending(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDelete = () => {
    setAreaForDelete('');
    setOpenPrevent(false);
  };

  const confirmDelete = (areaToDelete) => {
    deleteAdditionalAreaHandler(areaToDelete);
    handleCloseDelete();
  };

  const tryToDelete = (areaToDelete) => () => {
    setOpenPrevent(true);
    setAreaForDelete(areaToDelete);
  };

  return (
    <Fragment>
      <Badge badgeContent={pending ? 'P' : 0} color="secondary">
        <MUITable>
          <TableHead>
            <TableRow>
              <TableCell>Nomenclatura</TableCell>
              <TableCell>Tipo</TableCell>
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
                    {status === 'SOLD' ? (
                      <HoverContainer
                        noHover={
                          additionalArea.nomenclature ||
                          additionalArea.areaType.name
                        }
                        hover={
                          <Button
                            onClick={() => {
                              handleDesist(additionalArea.id);
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
                  <TableCell>{additionalArea.areaType.name}</TableCell>
                  <TableCell>
                    {additionalArea.areaType.unit === 'MT2'
                      ? additionalArea.measure
                      : '-'}
                  </TableCell>
                  <TableCell>{additionalArea.areaType.unit}</TableCell>
                  <TableCell>
                    <NumberFormat
                      displayType="text"
                      thousandSeparator
                      prefix="$"
                      value={additionalArea.price}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {property.addedAdditionalAreas.map((additionalArea) => {
              return (
                <TableRow key={additionalArea.id}>
                  <TableCell></TableCell>
                  <TableCell>{additionalArea.areaType.name}</TableCell>
                  <TableCell>
                    {additionalArea.areaType.unit === 'MT2'
                      ? additionalArea.measure
                      : '-'}
                  </TableCell>
                  <TableCell>{additionalArea.areaType.unit}</TableCell>
                  <TableCell>
                    <div className={Styles.priceAndAction}>
                      <NumberFormat
                        displayType="text"
                        thousandSeparator
                        prefix="$"
                        value={additionalArea.price}
                        className={Styles.price}
                      />
                      <Button
                        onClick={
                          status === 'AVAILABLE'
                            ? tryToDelete(additionalArea)
                            : handleDesist(additionalArea.id)
                        }
                      >
                        {status === 'AVAILABLE' ? 'X' : 'Desistir'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
      </Badge>
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
