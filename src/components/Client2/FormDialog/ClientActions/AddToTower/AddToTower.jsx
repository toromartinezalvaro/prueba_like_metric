import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Context from '../../context';
import Styles from './AddToTower.module.scss';

const AddToTower = ({ ...rest }) => {
  const { state, handleAddToTower } = useContext(Context);
  const { loading, success, error } = state;
  return (
    <div className={Styles.wrapper}>
      <Button
        {...rest}
        onClick={handleAddToTower}
        variant="contained"
        color="primary"
        disabled={loading || success}
        fullWidth
      >
        {success ? 'Se agrego correctamente' : 'Agregar a la torre'}
      </Button>
      {loading && (
        <div className={Styles.buttonProgress}>
          <CircularProgress size={24} />
        </div>
      )}
    </div>
  );
};

export default AddToTower;
