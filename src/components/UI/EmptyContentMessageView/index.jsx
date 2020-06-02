import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './EmptyContentMessageView.module.scss';
import Button from '../Button/Button';
import Icon from '../../../assets/icons/Icon';

const EmptyContentMessageView = ({
  title,
  message,
  buttonsContent,
  disableSold,
  ...rest
}) => {
  const buttonsFromText = (buttonContent) => (
    <Link key={buttonContent.message} to={buttonContent.url}>
      <Button>
        {buttonContent.title} <Icon name="fa-angle-double-right" />
      </Button>
    </Link>
  );

  const deadButton = (buttonContent) => (
    <Button>
      {buttonContent.title} <Icon name="fa-angle-double-right" />
    </Button>
  );

  return (
    <div className={styles.Container} {...rest}>
      <h2>{title}</h2>
      <h3>{message}</h3>
      {disableSold
        ? buttonsContent.map(deadButton)
        : buttonsContent.map(buttonsFromText)}
    </div>
  );
};

EmptyContentMessageView.propTypes = {
  buttonsContent: PropTypes.array,
  message: PropTypes.string,
  title: PropTypes.string,
};

EmptyContentMessageView.defaultProps = {
  buttonsContent: [],
};

export default EmptyContentMessageView;
