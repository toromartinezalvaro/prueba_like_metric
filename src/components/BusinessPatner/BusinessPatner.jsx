
import React, { useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Accordion from '../UI/Accordion/Accordion';
import { Link } from 'react-router-dom';
import styles from './BusinessPatner.module.scss';
import Select from 'react-select';

const bussinesPatner = () => {


    const handlePatnerNameValue = () => {

    }

    const handlePatnerAddressValue = () => {

    }

    const handlePatnerPostalCodeValue = () => {

    }

    const handlePatnerCountryValue = () => {

    }

    const handlePatnerWebsiteValue = () => {

    }

    const handlePatnerContactPersonValue = () => {

    }

    const handlePatnerPhoneValue = () => {

    }

    const handlePatnerEmailValue = () => {

    }

    const handlePatnerFiscalInformationValue = () => {

    }

    const handlePatnerVatNumberValue = () => {

    }

    return (
        <div className="container">
            <h1 className={styles.tittleCenter}>Agregar Socio</h1>

            <h3>Nombre y Direccion</h3>
            <div className={styles.wrapper}>
                <div className={styles.gridOne}>
                    <Input
                        type={'text'}
                        name={'patnerName'}
                        placeholder={'Nombre'}
                        validations={[]}
                        onChange={handlePatnerNameValue}
                    ></Input>
                    <Input
                        type={'text'}
                        name={'patnerAddres'}
                        placeholder={'Direccion'}
                        validations={[]}
                        onChange={handlePatnerAddressValue}
                    ></Input>
                    <Input
                        type={'text'}
                        name={'patnerPostalCode'}
                        placeholder={'Codigo postal'}
                        validations={[]}
                        onChange={handlePatnerPostalCodeValue}
                    ></Input>
                </div>
                <div className={styles.gridTwo}>
                    <Input
                        type={'text'}
                        name={'patnerCity'}
                        placeholder={'Ciudad'}
                        validations={[]}
                        onChange={handlePatnerCountryValue}
                    ></Input>
                    <Select
                        name="patnerCountry"
                        className={styles.patnerCountry}
                        options={[{ value: '', label: 'Colombia' }]}
                    />
                    <Input
                        type={'text'}
                        name={'patnerWebsite'}
                        placeholder={'Pais'}
                        validations={[]}
                        onChange={handlePatnerWebsiteValue}
                    ></Input>
                </div>
            </div>

            <h3>Persona de contacto</h3>
            <div className={styles.wrapper}>
                <div className={styles.gridOne}>
                    <Input
                        type={'text'}
                        name={'patnerContactPerson'}
                        placeholder={'Persona de contacto'}
                        validations={[]}
                        onChange={handlePatnerContactPersonValue}
                    ></Input>
                    <Input
                        type={'text'}
                        name={'patnerPhone'}
                        placeholder={'Telefono'}
                        validations={[]}
                        onChange={handlePatnerPhoneValue}
                    ></Input>
                </div>
                <div className={styles.gridTwo}>
                    <Input
                        type={'text'}
                        name={'email'}
                        placeholder={'Email'}
                        validations={[]}
                        onChange={handlePatnerEmailValue}
                    ></Input>
                </div>
            </div>

            <h3>Información Financiera</h3>
            <div className={styles.wrapper}>
                <div className={styles.gridOne}>
                    <Input
                        type={'text'}
                        name={'patnerFiscalInformation'}
                        placeholder={'Información fiscal'}
                        validations={[]}
                        onChange={handlePatnerFiscalInformationValue}
                    ></Input>
                </div>
                <div className={styles.gridTwo}>
                    <Input
                        type={'text'}
                        name={'vatnumber'}
                        placeholder={'VAT number'}
                        validations={[]}
                        onChange={handlePatnerVatNumberValue}
                    ></Input>
                </div>
            </div>
        </div>
    )
}

export default bussinesPatner;