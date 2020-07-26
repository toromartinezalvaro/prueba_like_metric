/*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { Fragment, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import { FormControl, Fab, TextField } from '@material-ui/core';
import agent from '../../../../../config/config';
import { Role } from '../../../../../helpers';
import statusOfContractEnum from './statusOfContract.enum';

import styles from './GeneralInfo.module.scss';

const Option = (props) => {
  return (
    <components.Option
      {...props}
      className={styles.options}
      classes={{ root: styles.optionMenu }}
    />
  );
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
  alreadyCreated,
  errors,
  noError,
}) => {
  const [generalInformation, setGeneralInformation] = useState(
    dataIfEdit || {
      title: '',
      businessPartnerId: 0,
      groupId: '',
      state: '',
      contractNumber: '',
      itemId: '',
      description: '',
      itemLabel: 'Seleccione un item',
    },
  );
  const [isLocked, setIsLocked] = useState(true);
  const [isLockedEdit, setLockedEdit] = useState(true);
  const [isEmptyTitle, setEmptyTitle] = useState(false);
  const [isEmptyDescription, setEmptyDescription] = useState(false);
  const [isEmptyNumber, setEmptyNumber] = useState(false);

  const statusOfContract = statusOfContractEnum.map((contract) => {
    return {
      value: contract.id,
      label: contract.state,
    };
  });

  const changeAndSearchItem = (currentItem, generalInfo) => {
    let currentGeneralInformation =
      generalInfo && generalInfo.groupId
        ? { ...generalInfo }
        : { ...generalInformation };
    const currentItemValue = currentItem.value;
    const currentItemLabel = currentItem.label;
    console.log({ currentGeneralInformation, generalInfo, generalInformation });
    currentGeneralInformation = {
      ...currentGeneralInformation,
      itemId: currentItemValue,
      itemLabel: currentItemLabel,
    };
    setGeneralInformation(currentGeneralInformation);
    sendGeneralInfo(currentGeneralInformation);
    changeForSearchItem(currentItem);
  };

  const changeAndSearchCategory = (currentGroup) => {
    const currentGroupValue = currentGroup.value;
    console.log({ currentGroupValue });
    const currentInformation = {
      ...generalInformation,
      groupId: currentGroupValue,
      itemId: 0,
      itemLabel: '',
    };
    setGeneralInformation(currentInformation);
    changeAndSearchItem({ label: '', value: 0 }, currentInformation);
    sendGeneralInfo(currentInformation);
    changeForSearchCategory(currentGroup);
    changeItemIsLocked(currentGroupValue);
    currentGroupId(currentGroupValue);
    setIsLocked(false);
    if (items) {
      setLockedEdit(false);
    }
  };

  useEffect(() => {
    console.log({ generalInformation });
  }, [generalInformation]);

  useEffect(() => {
    if (dataIfEdit) {
      setGeneralInformation(dataIfEdit);
      sendGeneralInfo(dataIfEdit);
      setLockedEdit(false);
      changeAndSearchCategory({ value: dataIfEdit.groupId });
      changeAndSearchItem({ value: dataIfEdit.itemId, label: dataIfEdit.item });
      setEmptyTitle(false);
      setEmptyDescription(false);
    } else {
      if (partnerProp) {
        const edited = {
          ...generalInformation,
          businessPartnerId: partnerProp.value,
        };
        setGeneralInformation(edited);
      }
      setEmptyTitle(false);
      setEmptyDescription(false);
      setEmptyNumber(false);
    }
  }, []);

  const itemClean = () => {
    setGeneralInformation({
      ...generalInformation,
      itemLabel: 'Seleccione un item',
      itemId: 0,
    });
  };

  const onChangeText = (name) => (e) => {
    const information = { ...generalInformation, [name]: e.target.value };
    setGeneralInformation(information);
    sendGeneralInfo(information);
    if (name === 'contractNumber' && e.target.value !== '') {
      sendContractNumber(e.target.value);
      setEmptyNumber(false);
    } else if (name === 'title' && e.target.value === '') {
      setEmptyTitle(true);
    } else if (name === 'contractNumber' && e.target.value === '') {
      setEmptyNumber(true);
    } else if (name === 'description' && e.target.value === '') {
      setEmptyDescription(true);
    } else {
      setEmptyTitle(false);
      setEmptyNumber(false);
      setEmptyDescription(false);
      noError(name);
    }
  };

  const onChangeSelect = (name) => (label) => {
    const information = { ...generalInformation, [name]: label.value };
    setGeneralInformation(information);
    sendGeneralInfo(information);
    noError(name);
  };

  const searchForCategory = () => {
    if (
      generalInformation !== undefined &&
      generalInformation.groupId !== '' &&
      generalInformation.groupId !== 0
    ) {
      searchCategory(generalInformation.groupId);
    }
  };

  const searchForPatner = () => {
    if (
      generalInformation !== undefined &&
      generalInformation.businessPartnerId !== '' &&
      generalInformation.businessPartnerId !== 0
    ) {
      searchBusinessPartner(generalInformation.businessPartnerId);
    }
  };

  const searchForItem = () => {
    if (
      generalInformation &&
      generalInformation.itemId !== '' &&
      generalInformation.itemId !== 0
    ) {
      searchItem(generalInformation.itemId);
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

  const errorInDescription = () => {
    if (
      (generalInformation.description &&
        generalInformation.description.length > 250) ||
      isEmptyDescription ||
      errors.description
    ) {
      return true;
    }
    return false;
  };

  return (
    <Fragment className={styles.test}>
      <div className={styles.gridContainer}>
        <div className={styles.columnFullLeft}>
          <TextField
            required
            error={isEmptyTitle || errors.title}
            className={styles.textField}
            label="Titulo De Contrato"
            margin="normal"
            autoComplete="off"
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
                className={styles.SelectSimpleForLabelPartner}
                required
                maxMenuHeight={250}
                inputId="select1"
                autoWidth={false}
                autoComplete="off"
                classes={{ root: styles.SelectSimpleForLabelPartner }}
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
                defaultValue={partners.find((option) => {
                  return (
                    option.value === generalInformation.businessPartnerId && {
                      value: generalInformation.businessPartnerId,
                      label: generalInformation.businessPartner,
                    }
                  );
                })}
                onChange={changeAndSearchPartner}
              />
              {<div className={styles.errorFieldGroup}>{errors.partner}</div>}
            </div>

            {agent.isAuthorized([Role.Admin, Role.Super]) && (
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
            )}
          </div>
          <div className={styles.gridSubContainer}>
            <div className={styles.selectColumn}>
              {console.log({ generalInformation122: generalInformation })}
              <Select
                className={styles.SelectSimpleForLabel}
                inputId="select2"
                required
                maxMenuHeight={200}
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
                defaultValue={categories.find((option) => {
                  return (
                    option.value === generalInformation.groupId && {
                      value: generalInformation.groupId,
                      label: generalInformation.group,
                    }
                  );
                })}
                onChange={changeAndSearchCategory}
                onFocus={itemClean}
              />
              {<div className={styles.errorFieldGroup}>{errors.group}</div>}
            </div>
          </div>
        </div>

        <div className={styles.columnFullRigth}>
          <Fragment>
            <Select
              className={styles.SelectSimple}
              inputId="select3"
              required
              maxMenuHeight={200}
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
                  return (
                    option.value === dataIfEdit.state.id && dataIfEdit.state
                  );
                })
              }
              onChange={onChangeSelect('state')}
            />
            {<div className={styles.errorField}>{errors.state}</div>}
          </Fragment>
          <TextField
            className={styles.leftInputs}
            label="Numero de contrato"
            required
            id="4"
            error={isEmptyNumber || errors.contractNumber}
            onKeyDown={(e) => {
              if (e.key === 'Enter') document.getElementById('select5').focus();
            }}
            margin="normal"
            variant="outlined"
            defaultValue={dataIfEdit && dataIfEdit.contractNumber}
            onChange={onChangeText('contractNumber')}
            autoComplete="off"
          />

          <div className={styles.gridSubContainerRigth}>
            <div className={styles.selectColumnNoButtons}>
              <FormControl>
                <Select
                  isDisabled={dataIfEdit ? false : isLockedEdit}
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
                  defaultValue={items.find((option) => {
                    return (
                      option.value === generalInformation.itemId && {
                        label: generalInformation.itemLabel,
                        value: generalInformation.itemId,
                      }
                    );
                  })}
                  onChange={changeAndSearchItem}
                />
                {<div className={styles.errorField}>{errors.item}</div>}
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gridContainerDescription}>
        <TextField
          multiline
          error={errorInDescription()}
          required
          rows="5"
          id="TEXT6"
          className={styles.multiline}
          label="Descripción/Comentarios"
          variant="outlined"
          defaultValue={dataIfEdit && dataIfEdit.description}
          onChange={onChangeText('description')}
          autoComplete="off"
        />
        <div className={styles.labelWordLength}>
          <span
            className={
              errorInDescription() ? styles.noCaracteres : styles.normalCaracter
            }
          >
            {generalInformation.description.length > 250
              ? `${generalInformation.description.length}/250 *Numero de caracteres permitido sobrepasado.`
              : `${generalInformation.description.length}/250`}
          </span>
        </div>
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
