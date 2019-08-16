import React, { Fragment, useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import commonStyles from '../../../assets/styles/variables.scss';
import styles from './Card.module.scss';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';
import CardFooter from './CardFooter/CardFooter';

const Card = ({ loading, children, style, ...rest }) => {
  const [isLoading, setLoading] = useState(isLoading);
  useEffect(() => {
    setLoading(loading);
  }, [isLoading]);
  return (
    <div className={styles.Card} style={style} {...rest} >
      {loading ? (
        <div className={styles.Loader}>
          <Loader
            type="ThreeDots"
            color={commonStyles.mainColor}
            height="100"
            width="100"
          />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Card;
export { CardHeader, CardBody, CardFooter };
