/*
 * Created by Jcatman on Wed Dec 04 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Fragment, Component } from 'react';
import { TextField, Fab, Card, CardContent, Button } from '@material-ui/core';
import { AddIcon, EditIcon } from '@material-ui/icons';
import ContractService from '../../../../../services/contract/contractService';
import withDefaultLayout from '../../../../../HOC/Layouts/Default/withDefaultLayout';
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
      attach: [],
    };
    this.inputFileRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.dataIfEdit) {
      this.setState({ imgObject: this.props.dataIfEdit.attachments });
    }
  }

  uploadImage = (e) => {
    const imageFormObject = new FormData();

    imageFormObject.append('description', `insta-image-${Date.now()}`);
    imageFormObject.append('type', 'IMAGE');
    imageFormObject.append('attachmentPath', e.target.files[0], e.name);

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ multerImage: objectUrl });
    const imgObject = e.target.files[0];
    const dataObject = [...this.state.imgObject, { imgObject }];
    this.setState({ imgObject: dataObject });
    const attach = {
      path: imageFormObject.getAll('attachmentPath'),
      description: imageFormObject.getAll('description'),
      type: imageFormObject.getAll('type'),
    };
    this.setState({ attach: [...this.state.attach, attach] });
    this.props.sendAttachments(imageFormObject);
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

  cleanURLInput = () => {
    this.setState({
      urlText: { text: '' },
    });
  };

  updloadUrl = (e) => {
    const urlText = { text: e.target.value };
    this.setState({ urlText });
  };

  printUrl = () => {
    if (this.state.urlText.text) {
      this.setState({
        urlObject: [...this.state.urlObject, this.state.urlText.text],
      });
      const tempo = {
        multerImage: this.state.multerImage,
        imgObject: this.state.imgObject,
        urlText: this.state.urlText,
        urlObject: this.state.urlText.text,
      };
      this.props.sendAttachments(tempo);
      this.cleanURLInput();
    } else {
      this.props.spawnMessage('El campo URL no puede estar vacío', 'error');
    }
  };

  displayComponents = () => {
    let attachs = 'Archivo';
    return this.state.imgObject.map((image, i) => {
      if (this.props.dataIfEdit) {
        attachs = image.description;
      }
      if (image.imgObject) {
        attachs = image.imgObject.name;
      }
      return (
        <Card className={styles.CardAttach} key={i}>
          <CardContent>
            <div className={styles.attachment}>
              <p>{attachs || ''}</p>
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
        <Card className={styles.cardAttachment}>
          <CardContent>
            <div className={styles.attachment}>{this.displayComponents()}</div>
            <div className={styles.inputs}>
              <input
                type="file"
                id="upload"
                className={styles.inputfile}
                onChange={(e) => this.uploadImage(e)}
                ref={this.inputFileRef}
              />
              <label htmlFor="upload">Adjuntar archivo</label>
              <div className={styles.attachment}>{this.displayUrl()}</div>
              <div className={styles.row}>
                <TextField
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

export default withDefaultLayout(Attachment);
