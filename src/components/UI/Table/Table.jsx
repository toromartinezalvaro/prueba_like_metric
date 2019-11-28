import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.scss';

class table extends Component {
  constructor(props) {
    super(props);
    this.wrapperTop = React.createRef();
    this.wrapperBottom = React.createRef();
    this.divTop = React.createRef();
    this.divBot = React.createRef();
    this.scrollWidth = -1;
  }

  state = {
    isSyncingTopScroll: false,
    isSyncingBottomScroll: false,
    width: 0,
    heightViewPort: 0,
    height: 0,
    columnsStyle: styles.Columns,
  };

  componentDidUpdate() {
    if (
      this.wrapperTop.current &&
      this.scrollWidth !== this.divBot.current.scrollWidth
    ) {
      if (this.divTop.current.scrollWidth !== this.divBot.current.scrollWidth) {
        this.scrollWidth = this.divBot.current.scrollWidth;
        this.setState({
          width: this.divBot.current.scrollWidth,
        });
      }
      if (
        this.state.height === 0 &&
        this.state.heightViewPort !== window.innerHeight
      ) {
        this.setState({
          heightViewPort: window.innerHeight,
        });
      }
    }
    if (this.state.height !== this.wrapperBottom.current.offsetHeight) {
      this.setState({ height: this.wrapperBottom.current.offsetHeight });
    }
    if (
      this.props.columnsMinWidth &&
      this.state.columnsStyle !== styles.ColumnsMinWidth
    ) {
      this.setState({
        columnsStyle: styles.ColumnsMinWidth,
      });
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({ height: this.wrapperBottom.current.offsetHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ heightViewPort: window.innerHeight });
  };

  handleScrollTop = (event) => {
    if (!this.state.isSyncingTopScroll) {
      this.setState({ isSyncingBottomScroll: true });
      this.divBot.current.scrollLeft = this.wrapperTop.current.scrollLeft;
    }
    this.setState({ isSyncingTopScroll: false });
  };

  handleScrollBottom = (event) => {
    if (!this.state.isSyncingBottomScroll && this.wrapperTop.current !== null) {
      this.setState({ isSyncingTopScroll: true });
      this.wrapperTop.current.scrollLeft = this.divBot.current.scrollLeft;
    }
    this.setState({ isSyncingBottomScroll: false });
  };

  scrollDidUpdate = () => {};

  render() {
    return (
      <Fragment>
        <div>
          {this.state.heightViewPort * 0.5 < this.state.height ? (
            <div
              className={styles.wrapper1}
              ref={this.wrapperTop}
              onScroll={this.handleScrollTop}
            >
              <div
                className={styles.div1}
                ref={this.divTop}
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
              ref={this.divBot}
              style={
                this.props.maxHeight
                  ? this.props.maxHeight
                  : { maxHeight: this.state.heightViewPort }
              }
            >
              <div className={styles.Intersect}>
                <p style={{ marginBlockStart: '0.8em' }}>
                  {this.props.intersect}
                </p>
              </div>

              <div className={styles.Header}>
                {this.props.headers.map((element, i) => (
                  <div
                    key={styles.Element + i}
                    style={this.props.width}
                    className={styles.Element}
                  >
                    {element}
                  </div>
                ))}
              </div>

              <div className={this.state.columnsStyle} style={this.props.style}>
                {this.props.columns.map((element, i) => (
                  <div
                    key={`${styles.Element + i}-columns`}
                    className={styles.Element}
                  >
                    {element}
                  </div>
                ))}
              </div>

              <div className={styles.Table}>
                {this.props.data &&
                  this.props.data.map((row, i) => (
                    <div key={i + styles.Table} className={styles.Row}>
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex + styles.Row}
                          className={styles.Cell}
                          style={this.props.width}
                        >
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}{' '}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default table;
