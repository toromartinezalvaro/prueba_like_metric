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
      urlText: '',
      urlObject: [],
    };
  }

  uploadImage = (e) => {
    const imageFormObject = new FormData();

    imageFormObject.append('description', `insta-image-${Date.now()}`);
    imageFormObject.append('type', 'IMAGE');
    imageFormObject.append('attachmentPath', e.target.files[0]);
    this.setState({ multerImage: URL.createObjectURL(e.target.files[0]) });
    const imgObject = e.target.files[0];
    this.setState({ imgObject: [...this.state.imgObject, { imgObject }] });
  };

  imageRemove = (index) => () => {
    this.setState({
      imgObject: this.state.imgObject.filter((e, i) => {
        return i !== index;
      }),
    });
  };

  urlRemove = (index) => () => {
    this.setState({
      urlObject: this.state.urlObject.filter((e, i) => {
        return i !== index;
      }),
    });
  };

  updloadUrl = (e) => {
    const urlText = { text: e.target.value };
    this.setState({ urlText });
  };

  printUrl = () => {
    this.setState({
      urlObject: [...this.state.urlObject, this.state.urlText.text],
    });
  };

  displayComponents = () => {
    return this.state.imgObject.map((image, i) => {
      return (
        <Card className={styles.CardAttach} key={i}>
          <CardContent>
            <div className={styles.attachment}>
              <p>{image.imgObject.name}</p>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.imageRemove(i)}
                className={styles.buttons}
              >
                X
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  displayUrl = () => {
    return this.state.urlObject.map((url, i) => {
      return (
        <Card className={styles.CardAttach} key={i}>
          <CardContent>
            <div className={styles.attachment}>
              <a href={url}>{url}</a>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.urlRemove(i)}
                className={styles.buttons}
              >
                X
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <Card>
          <CardContent>
            <div className={styles.attachment}>{this.displayComponents()}</div>
            <div className={styles.inputs}>
              <input
                type="file"
                id="upload"
                className={styles.inputfile}
                onChange={(e) => this.uploadImage(e)}
              />
              <label htmlFor="upload">Adjuntar archivo</label>
              <div className={styles.attachment}>{this.displayUrl()}</div>
              <div className={styles.row}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Ingrese Una URL"
                  margin="normal"
                  variant="outlined"
                  value={this.state.urlText.text}
                  onChange={this.updloadUrl}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.buttons}
                  onClick={this.printUrl}
                >
                  Guardar URL
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default Attachment;
