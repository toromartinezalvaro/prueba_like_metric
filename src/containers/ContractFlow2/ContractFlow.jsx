import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import commonStyles from '../../assets/styles/variables.scss';
import ContractFlowService from '../../services/contractFlow/contractFlowService';
import TablesContractFlow from '../../components/ContractFlow2/TablesContractFlow';
import styles from './ContractFlow.module.scss';

const ContractFlow = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const TOWER_ID = props.match.params.towerId;
  const service = new ContractFlowService();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await service.getContractsInformation(TOWER_ID);
        setData(res.data);
        setLoading(!loading)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return loading ? (
    <div className={styles.Loader} key="loader">
      <Loader
        type="ThreeDots"
        color={commonStyles.mainColor}
        height="100"
        width="100"
      />
    </div>
  ) : (
    <React.Fragment>
      <h1>FLUJO DE CAJA</h1>
      <div className={styles.container}>
        <TablesContractFlow billings={data} />
      </div>
    </React.Fragment>
  );
};

export default ContractFlow;
