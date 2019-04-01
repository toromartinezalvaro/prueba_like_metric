import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Layout from '../../HOC/Layouts/Layout';
import styles from './Home.module.scss';

class Home extends Component {

  render() {
    return (
      <Layout>
        <div className={styles.App}>
          <Header />
        </div>
      </Layout>

    );
  }
}

export default Home;