import React, { Component, Fragment } from "react";
import styles from "./Table.module.scss";

class table extends Component {
  constructor(props) {
    super(props);
    this.wrapperTop = React.createRef();
    this.wrapperBottom = React.createRef();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  state = {
    isSyncingTopScroll: false,
    isSyncingBottomScroll: false,
    width: 0,
    heightViewPort: 0,
    height: 0
  };

  componentDidUpdate() {
    if (this.wrapperTop.current) {
      if (
        this.wrapperTop.current.scrollWidth !==
        this.wrapperBottom.current.scrollWidth
      ) {
        this.setState({
          width: this.wrapperBottom.current.scrollWidth
        });
      }
      if (this.state.height === 0) {
        this.setState({
          heightViewPort: window.innerHeight
        });
      }
    }
    if (this.state.height !== this.wrapperBottom.current.offsetHeight) {
      this.setState({ height: this.wrapperBottom.current.offsetHeight });
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.setState({ height: this.wrapperBottom.current.offsetHeight });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ heightViewPort: window.innerHeight });
  }

  handleScrollTop = event => {
    if (!this.state.isSyncingTopScroll) {
      this.setState({ isSyncingBottomScroll: true });
      this.wrapperBottom.current.scrollLeft = this.wrapperTop.current.scrollLeft;
    }
    this.setState({ isSyncingTopScroll: false });
  };

  handleScrollBottom = event => {
    if (this.wrapperTop.current) {
      if (!this.state.isSyncingBottomScroll) {
        this.setState({ isSyncingTopScroll: true });
        this.wrapperTop.current.scrollLeft = this.wrapperBottom.current.scrollLeft;
      }
      this.setState({ isSyncingBottomScroll: false });
    }
  };
  render() {
    return (
      <Fragment>
        <div>
          {this.state.heightViewPort * 0.2 < this.state.height ? (
            <div
              className={styles.wrapper1}
              ref={this.wrapperTop}
              onScroll={this.handleScrollTop}
            >
              <div
                className={styles.div1}
                style={{ width: this.state.width }}
              />
            </div>
          ) : null}
          <div
            className={styles.wrapper2}
            ref={this.wrapperBottom}
            onScroll={this.handleScrollBottom}
          >
            <div
              className={styles.Container}
              style={{ maxHeight: this.state.heightViewPort }}
            >
              <div className={styles.Intersect}>
                <p style={{ marginBlockStart: "0.8em" }}>
                  {this.props.intersect}
                </p>
              </div>

              <div className={styles.Header}>
                {this.props.headers.map(element => (
                  <div style={this.props.width} >{element}</div>
                ))}
              </div>

              <div className={styles.Columns} style={this.props.style}>
                {this.props.columns.map(element => (
                  <div>{element}</div>
                ))}
              </div>

              <div className={styles.Table}>
                {this.props.data.map(row => (
                  <div className={styles.Row}>
                    {row.map(cell => (
                      <div className={styles.Cell} style={this.props.width}>
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}{" "}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default table;
