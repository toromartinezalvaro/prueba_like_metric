import React, { Fragment, Component } from "react";
import styles from "./Modal.module.scss";

class modal extends Component {
  constructor(props) {
    super(props);
    this.divModal = React.createRef();
  }
  state = {
    blocked: false,
    heightViewPort: window.innerHeight,
  };

  componentDidUpdate() {
    console.log(this.divModal);
    if (this.state.heightModal !== this.divModal.current) {
    }
  }

  performAction = action => {
    if (action === "confirm") {
      this.setState({ blocked: true });
      this.props.onConfirm();
    } else if (action === "cancel") {
      this.props.onCancel();
    }
  };

  render() {
    console.log(this.state.heightViewPort)
    return (
      <Fragment>
        {this.props.hidden ? null : (
          <div
            className={styles.Container}
            style={{
              /* height:
                this.state.heightViewPort > 600
                  ? null
                  : "100vh" */
            }}
          >
            <div className={styles.Modal} ref={this.divModal}>
              <div className={styles.Title}>{this.props.title}</div>
              <div className={styles.Content}>{this.props.children}</div>
              <div className={styles.Actions}>
                <button
                  className={styles.ConfirmButton}
                  onClick={() => {
                    this.performAction("confirm");
                  }}
                  disabled={this.state.blocked}
                >
                  Confirmar
                </button>
                <button
                  className={styles.CancelButton}
                  onClick={() => {
                    this.performAction("cancel");
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

export default modal;
