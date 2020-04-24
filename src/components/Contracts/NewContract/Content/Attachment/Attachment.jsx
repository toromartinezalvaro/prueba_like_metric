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
    if (this.state.imgObject.length >= 1) {
      this.props.spawnMessage('Solo se puede agregar un archivo', 'error');
    } else {
      const imageFormObject = new FormData();
      imageFormObject.append('description', `insta-image-${Date.now()}`);
      imageFormObject.append(
        'attachmentPath',
        e.target.files[0],
        e.target.files[0].name,
      );
      const attach = {
        path: e.target.files[0].name,
        description: e.target.files[0].name,
        type: 'IMAGE',
      };
      this.setState({
        attach: [...this.state.attach, attach],
        imgObject: [...this.state.imgObject, attach],
      });
      this.props.sendAttachments(imageFormObject);
    }
  };

  imageRemove = (index) => () => {
    const eraseThis = this.state.imgObject[index];
    this.setState({
      imgObject: this.state.imgObject.filter((e, i) => {
        return i !== index;
      }),
    });
    this.props.eraseImg(eraseThis.path);
  };

  urlRemove = (index) => () => {
    let tempo = this.state.imgObject[index];
    tempo = { ...tempo, erased: true };
    this.setState({
      imgObject: this.state.imgObject.filter((e, i) => {
        return i !== index;
      }),
    });
    this.props.sendUrl(tempo);
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
      const tempo = {
        path: this.state.urlText.text,
        description: this.state.urlText.text,
        type: 'URL',
      };
      this.setState({
        urlObject: [...this.state.urlObject, this.state.urlText.text],
        imgObject: [...this.state.imgObject, tempo],
      });
      this.props.sendUrl(tempo);
      this.cleanURLInput();
    } else {
      this.props.spawnMessage('El campo URL no puede estar vacío', 'error');
    }
  };

  displayComponents = () => {
    return this.state.imgObject.map((image, i) => {
      return (
        image.type === 'IMAGE' && (
          <Card className={styles.CardAttach} key={i}>
            <CardContent>
              <div className={styles.attachment}>
                <p>{image.description}</p>
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
        )
      );
    });
  };

  displayUrl = () => {
    return this.state.imgObject.map((url, i) => {
      return (
        url.type === 'URL' && (
          <Card classes={{ root: styles.cardModify }} key={i}>
            <CardContent>
              <div className={styles.attachmentUrl}>
                <div className={styles.urlcontainer}>
                  <a href={url.path}>{url.path}</a>
                </div>
                <div className={styles.btncont}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.urlRemove(i)}
                  >
                    X
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
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
