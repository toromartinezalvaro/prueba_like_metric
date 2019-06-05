import React from "react";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import styles from "../../assets/styles/variables.scss";
import styles1 from "../../components/User/Login.module.scss";
import Error from "../../components/UI/Error/Error";

const SecureContainer = (Container, additionalProps) =>
  class extends Container {
    constructor() {
      super();
      this.state = {
        isLoading: false,
        currentErrorMessage: "",
        redirect: false,
        excecuteNoAuthorization: this.excecuteNoAuthorization,
        loadingAspect: (
          <div className={styles1.Container}>
            <Loader
              type="Puff"
              color={styles.mainColor}
              height="100"
              width="100"
            />
          </div>
        )
      };
    }

    excecuteNoAuthorization = () => {
      this.setState({ redirect: true });
    };

    render() {
      const { isLoading, redirect, currentErrorMessage } = this.state;
      if (isLoading) {
        console.log("this.state.loadingAspect ", this.state.loadingAspect);
        if (currentErrorMessage !== "") {
          console.log(currentErrorMessage);
          return (
            <div className={styles1.Container}>
              <Error message={this.state.currentErrorMessage} />
            </div>
          );
        }
        return this.state.loadingAspect;
        
      } 
      
      if (redirect) {
        return <Redirect to="/login" />;
      }

      const props = { ...this.props, additionalProps };
      return (
        <React.Fragment>
          <Container {...props} />
        </React.Fragment>
      );
    }
  };

export default SecureContainer;
