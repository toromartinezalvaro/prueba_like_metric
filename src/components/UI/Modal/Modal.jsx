import React, { Fragment, Component } from 'react';
import styles from './Modal.module.scss';
import variables from '../../../assets/styles/variables.scss';
import Button from '../Button/Button';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.divModal = React.createRef();
  }
  state = {
    blocked: false,
    heightViewPort: window.innerHeight,
    style: this.props.rightColor ? this.props.rightColor : variables.greenColor,
    isCenter: this.props.isCenter ? { justifyContent: 'center' } : null,
  };

  componentWillReceiveProps(nextProps) {
    //I know this is an antipater but meanwhile let's use derived data, i will solve this
    this.setState({ blocked: nextProps.blocked });
  }

  componentDidUpdate() {
    if (this.state.heightModal !== this.divModal.current) {
    }
  }

  performAction = (action) => {
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
    return (
      <Fragment>
        {this.props.hidden ? null : (
          <div className={styles.Container}>
            <div
              style={this.props.style}
              className={styles.Modal}
              ref={this.divModal}
            >
              <div className={styles.Title}>{this.props.title}</div>
              <div className={styles.Content}>{this.props.children}</div>
              <div className={styles.Actions} style={this.state.isCenter}>
                <Button
                  className={styles.ConfirmButton}
                  style={{ backgroundColor: this.state.style }}
                  onClick={() => {
                    this.performAction('confirm');
                  }}
                  disabled={this.state.blocked}
                >
                  {this.props.rightButton
                    ? this.props.rightButton
                    : 'Confirmar'}
                </Button>
                {this.props.leftButton ? (
                  <Button
                    className={styles.ConfirmButton}
                    style={{ backgroundColor: this.props.leftColor }}
                    onClick={() => {
                      this.performAction('confirmLeft');
                    }}
                    disabled={this.state.blocked}
                  >
                    {this.props.leftButton}
                  </Button>
                ) : null}
                {this.props.onlyConfirm ? null : (
                  <Button
                    className={styles.CancelButton}
                    onClick={() => {
                      this.performAction('cancel');
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Modal;
