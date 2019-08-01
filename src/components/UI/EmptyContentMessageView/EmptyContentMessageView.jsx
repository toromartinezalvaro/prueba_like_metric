import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './EmptyContentMessageView.module.scss';
import Button from '../Button/Button';
import Icon from '../../../assets/icons/Icon';

const EmptyContentMessageView = ({ message, buttonsContent, ...rest }) => {
  const buttonsFromText = buttonContent => (
    <Link key={buttonContent.message} to={buttonContent.url}>
      <Button>
        {buttonContent.message} <Icon name="fa-angle-double-right" />
      </Button>
    </Link>
  );

  return (
    <div className={styles.Container} {...rest}>
      <h4>{message}</h4>
      {buttonsContent.map(buttonsFromText)}
    </div>
  );
};

EmptyContentMessageView.propTypes = {
  buttonsContent: PropTypes.array,
  message: PropTypes.string,
};

EmptyContentMessageView.defaultProps = {
  buttonsContent: [{ message: '', url: '' }],
};

export default EmptyContentMessageView;
