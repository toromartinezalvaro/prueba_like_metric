import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import styles from './Attachment.module.scss';

const Attachment = () => {
  const [multerImage, setMulterImage] = useState();
  const uploadImage = (e) => {
    const imageFormObject = new FormData();

    imageFormObject.append("imageName", `insta-image-${Date.now()}`);
    imageFormObject.append("imageData", e.target.files[0]);

    setMulterImage(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Fragment>
      <Card className={styles.card}>
        <CardContent>
          <div className={styles.container}>
            <input type="file" id="upload" className={styles.inputfile} onChange={(e) => uploadImage(e)} />
            <label htmlFor="upload">Adjuntar archivo</label>
            <img src={multerImage} className={styles.uploadedImage} alt="uploaded-photo" />
          </div>

          <TextField
            fullWidth
            className={styles.textField}
            label="Ingrese Una URL"
            margin="normal"
            variant="outlined"
          />
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default Attachment;