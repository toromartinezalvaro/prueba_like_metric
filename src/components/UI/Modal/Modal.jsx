import React, { Fragment, Component } from 'react';
import styles from './Modal.module.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.divModal = React.createRef();

  }
  state = {
    blocked: false,
    heightViewPort: window.innerHeight
  };

  componentWillReceiveProps(nextProps) {
    //I know this is an antipater but meanwhile let's use derived data, i will solve this
    this.setState({blocked: nextProps.blocked})
  }
  
  componentDidUpdate() {
    if (this.state.heightModal !== this.divModal.current) {
    }
  }

  performAction = action => {
    if (action === 'confirm') {
      this.setState({ blocked: true });
      this.props.onConfirm();
    } else if (action === 'cancel') {
      this.props.onCancel();
    } else if (action === 'confirmLeft') {
      this.props.onConfirmLeft();
    } 
  };

  render() {
    console.log(this.state.heightViewPort);
    return (
      <Fragment>
        {this.props.hidden ? null : (
          <div className={styles.Container}>
            <div className={styles.Modal} ref={this.divModal}>
              <div className={styles.Title}>{this.props.title}</div>
              <div className={styles.Content}>{this.props.children}</div>
              <div className={styles.Actions}>
                <button
                  className={styles.ConfirmButton}
                  style={{ backgroundColor: this.props.rightColor }}
                  onClick={() => {
                    this.performAction('confirm');
                  }}
                  disabled={this.state.blocked}
                >
                  {this.props.rightButton
                    ? this.props.rightButton
                    : 'Confirmar'}
                </button>
                {this.props.leftButton ? (
                  <button
                    className={styles.ConfirmButton}
                    style={{ backgroundColor: this.props.leftColor }}
                    onClick={() => {
                      this.performAction('confirmLeft');
                    }}
                    disabled={this.state.blocked}
                  >
                    {this.props.leftButton}
                  </button>
                ) : null}
                <button
                  className={styles.CancelButton}
                  onClick={() => {
                    this.performAction('cancel');
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Modal;
