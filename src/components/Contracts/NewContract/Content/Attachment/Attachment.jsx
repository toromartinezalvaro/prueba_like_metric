import React, { Fragment, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import styles from './Attachment.module.scss';

class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multerImage: '',
    };
  }

  uploadImage = (e) => {
    const imageFormObject = new FormData();

    imageFormObject.append('imageName', `insta-image-${Date.now()}`);
    imageFormObject.append('imageData', e.target.files[0]);

    this.setState({ multerImage: URL.createObjectURL(e.target.files[0]) });
  };

  render() {
    return (
      <Fragment>
        <Card className={styles.card}>
          <CardContent>
            <div className={styles.container}>
              <input
                type="file"
                id="upload"
                className={styles.inputfile}
                onChange={(e) => this.uploadImage(e)}
              />
              <label htmlFor="upload">Adjuntar archivo</label>
              <img
                src={this.state.multerImage}
                className={styles.uploadedImage}
                alt="uploaded-photo"
              />
            </div>

            <div className={styles.row}>
              <TextField
                fullWidth
                className={styles.textField}
                label="Ingrese Una URL"
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                className={styles.buttons}
              >
                Guardar URL
              </Button>
            </div>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default Attachment;
