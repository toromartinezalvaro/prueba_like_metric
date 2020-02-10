/*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import statusOfContractEnum from './statusOfContract.enum';

import styles from './GeneralInfo.module.scss';

const Option = (props) => {
  return <components.Option {...props} className={styles.options} />;
};

const GeneralInfo = ({
  handleOpenCategory,
  handleOpenBusinessPatner,
  searchCategory,
  searchItem,
  searchBusinessPartner,
  items,
  categories,
  partners,
  categoryProp,
  partnerProp,
  itemProp,
  changeForSearchCategory,
  changeForSearchPartner,
  changeForSearchItem,
  sendGeneralInfo,
  handleOpenItem,
  handleCloseItem,
  itemIsLocked,
  currentGroupId,
  changeItemIsLocked,
  dataIfEdit,
  sendContractNumber,
}) => {
  const [generalInformation, setGeneralInformation] = useState({
    title: '',
    businessPartnerId: '',
    groupId: '',
    state: '',
    contractNumber: '',
    itemId: '',
    description: '',
  });

  const [isLocked, setIsLocked] = useState(true);
  const [isLockedEdit, setsLockedEdit] = useState(true);

  const statusOfContract = statusOfContractEnum.map((contract) => {
    return {
      value: contract.id,
      label: contract.state,
    };
  });

  useEffect(() => {
    if (dataIfEdit) {
      setGeneralInformation(dataIfEdit);
    }
  }, []);

  const onChangeText = (name) => (e) => {
    const information = { ...generalInformation, [name]: e.target.value };
    setGeneralInformation(information);
    sendGeneralInfo(information);
    if (name === 'contractNumber') {
      sendContractNumber(e.target.value);
    }
  };

  const onChangeSelect = (name) => (label) => {
    const information = { ...generalInformation, [name]: label.value };
    setGeneralInformation(information);
    sendGeneralInfo(information);
  };

  const searchForCategory = () => {
    if (categoryProp !== undefined && categoryProp.value !== '') {
      searchCategory(categoryProp.value);
    }
  };

  const searchForPatner = () => {
    if (partnerProp !== undefined && partnerProp.value !== '') {
      searchBusinessPartner(partnerProp.value);
    }
  };

  const searchForItem = () => {
    if (itemProp && itemProp.value !== '') {
      searchItem(itemProp.value);
    }
  };

  const changeAndSearchCategory = (currentGroup) => {
    const currentGroupValue = currentGroup.value;
    setGeneralInformation({
      ...generalInformation,
      groupId: currentGroupValue,
    });
    sendGeneralInfo(generalInformation);
    changeForSearchCategory(currentGroup);
    changeItemIsLocked(currentGroupValue);
    currentGroupId(currentGroupValue);
    setIsLocked(false);
    if (items) {
      setsLockedEdit(false);
    }
  };

  const changeAndSearchPartner = (currentPartner) => {
    const currentPartnerValue = currentPartner.value;
    setGeneralInformation({
      ...generalInformation,
      businessPartnerId: currentPartnerValue,
    });
    sendGeneralInfo(generalInformation);
    changeForSearchPartner(currentPartner);
  };

  const changeAndSearchItem = (currentItem) => {
    const currentItemValue = currentItem.value;
    setGeneralInformation({ ...generalInformation, itemId: currentItemValue });
    sendGeneralInfo(generalInformation);
    changeForSearchItem(currentItem);
  };

  return (
    <Fragment className={styles.test}>
      <div className={styles.gridContainer}>
        <div className={styles.columnFullLeft}>
          <TextField
            required
            className={styles.textField}
            label="Titulo De Contrato"
            margin="normal"
            onKeyDown={(e) => {
              if (e.key === 'Enter') document.getElementById('select1').focus();
            }}
            variant="outlined"
            defaultValue={dataIfEdit && dataIfEdit.title}
            onChange={onChangeText('title')}
          />
          <div className={styles.gridSubContainer}>
            <div className={styles.selectColumn}>
              <Select
                className={styles.SelectSimpleForLabel}
                required
                inputId="select1"
                TextFieldProps={{
                  label: 'Socio de negocios',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    document.getElementById('select2').focus();
                }}
                placeholder="Seleccione socio"
                options={partners}
                components={Option}
                defaultValue={
                  dataIfEdit
                    ? partners.find((option) => {
                        return (
                          option.value === dataIfEdit.businessPartnerId && {
                            value: dataIfEdit.businessPartnerId,
                            label: dataIfEdit.businessPartner,
                          }
                        );
                      })
                    : partnerProp
                }
                onChange={changeAndSearchPartner}
              />
            </div>
            <div className={styles.buttonColumn}>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                onClick={handleOpenBusinessPatner}
                className={styles.fab}
              >
                <AddIcon />
              </Fab>
              <Fab
                color="secondary"
                mx={2}
                size="small"
                aria-label="edit"
                className={styles.fab}
                onClick={searchForPatner}
              >
                <EditIcon />
              </Fab>
            </div>
          </div>
          <div className={styles.gridSubContainer}>
            <div className={styles.selectColumn}>
              <Select
                className={styles.SelectSimpleForLabel}
                inputId="select2"
                required
                TextFieldProps={{
                  label: 'Selecciona un grupo',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    document.getElementById('select3').focus();
                }}
                placeholder="Selecciona un grupo"
                options={categories}
                components={Option}
                defaultValue={
                  dataIfEdit
                    ? categories.find((option) => {
                        return (
                          option.value === dataIfEdit.groupId && {
                            value: dataIfEdit.groupId,
                            label: dataIfEdit.group,
                          }
                        );
                      })
                    : categoryProp
                }
                onChange={changeAndSearchCategory}
              />
            </div>
            <div className={styles.buttonColumn}>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                className={styles.fab}
                onClick={handleOpenCategory}
              >
                <AddIcon />
              </Fab>
              <Fab
                color="secondary"
                mx={2}
                size="small"
                aria-label="edit"
                className={styles.fab}
                onClick={searchForCategory}
              >
                <EditIcon />
              </Fab>
            </div>
          </div>
        </div>

        <div className={styles.columnFullRigth}>
          <Select
            className={styles.SelectSimple}
            inputId="select3"
            required
            onKeyDown={(e) => {
              if (e.key === 'Enter') document.getElementById('4').focus();
            }}
            TextFieldProps={{
              label: 'Estado',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            placeholder="Estado"
            options={statusOfContract}
            components={Option}
            defaultValue={
              dataIfEdit &&
              statusOfContract.find((option) => {
                return option.value === dataIfEdit.state.id && dataIfEdit.state;
              })
            }
            onChange={onChangeSelect('state')}
          />
          <TextField
            className={styles.leftInputs}
            label="Numero de contrato"
            required
            id="4"
            onKeyDown={(e) => {
              if (e.key === 'Enter') document.getElementById('select5').focus();
            }}
            margin="normal"
            variant="outlined"
            defaultValue={dataIfEdit && dataIfEdit.contractNumber}
            onChange={onChangeText('contractNumber')}
          />

          <div className={styles.gridSubContainerRigth}>
            <div className={styles.selectColumn}>
              <Select
                isDisabled={dataIfEdit ? false : isLocked}
                className={styles.SelectSimpleForLabel}
                inputId="select5"
                required
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    document.getElementById('TEXT6').focus();
                }}
                TextFieldProps={{
                  label: 'item',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                placeholder="Seleccione un Item"
                components={Option}
                options={items}
                defaultValue={
                  dataIfEdit &&
                  items.find((option) => {
                    return (
                      option.value === dataIfEdit.itemId && {
                        value: dataIfEdit.itemId,
                        label: dataIfEdit.item,
                      }
                    );
                  })
                }
                onChange={changeAndSearchItem}
              />
            </div>
            <div className={styles.buttonColumnForItem}>
              <Fab
                disabled={isLocked}
                color="primary"
                size="small"
                aria-label="add"
                className={styles.fab}
                onClick={handleOpenItem}
              >
                <AddIcon />
              </Fab>
              <Fab
                disabled={isLockedEdit}
                color="secondary"
                mx={2}
                size="small"
                aria-label="edit"
                className={styles.fab}
                onClick={searchForItem}
              >
                <EditIcon />
              </Fab>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <TextField
          multiline
          required
          rows="5"
          id="TEXT6"
          className={styles.multiline}
          label="Descripción/Comentarios"
          variant="outlined"
          defaultValue={dataIfEdit && dataIfEdit.description}
          onChange={onChangeText('description')}
        />
      </div>
    </Fragment>
  );
};

GeneralInfo.propTypes = {
  categories: PropTypes.array,
  categoryProp: PropTypes.object,
  dataIfEdit: PropTypes.object,
  partnerProp: PropTypes.object,
  itemProp: PropTypes.object,
  sendGeneralInfo: PropTypes.func,
  searchItem: PropTypes.func,
};

export default GeneralInfo;
