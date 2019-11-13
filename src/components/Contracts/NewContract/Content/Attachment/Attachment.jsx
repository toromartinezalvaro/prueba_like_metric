import React, { Fragment, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ContractService from '../../../../../services/contract/contractService';
import styles from './Attachment.module.scss';

class Attachment extends Component {
  constructor(props) {
    super(props);
    this.services = new ContractService();
    this.state = {
      multerImage: '',
      imgObject: [],
    };
  }

  uploadImage = (e) => {
    const imageFormObject = new FormData();

    imageFormObject.append('imageName', `insta-image-${Date.now()}`);
    imageFormObject.append('imageData', e.target.files[0]);
    console.log("que pedo", e.target.files[0].name);
    this.setState({ multerImage: URL.createObjectURL(e.target.files[0]) });
    const imgObject = e.target.files[0];
    this.setState({ imgObject: [...this.state.imgObject, { imgObject }] });
    console.log("que pedo", imgObject);
    console.log("que pedo", this.state.imgObject);
    // this.services.postImages(imageFormObject);
  };

  displayComponents = () => {
    return this.state.imgObject.map((image) => {
      console.log(image);
      return (
        <Card key={image.imgObject.id}>
          <CardContent>
            <div className="attachment">
              <p>{image.imgObject.name}</p>
              <Button
                variant="contained"
                color="secondary"
                className={styles.buttons}
              >X</Button>
            </div>
          </CardContent>
        </Card>
      )
    })
  }

  render() {
    return (
      <Fragment>
        <Card className={styles.card}>
          <CardContent>
            <div className={styles.container}>
              {
                this.displayComponents()
              }
              <input
                type="file"
                id="upload"
                className={styles.inputfile}
                onChange={(e) => this.uploadImage(e)}
              />
              <label htmlFor="upload">Adjuntar archivo</label>
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
