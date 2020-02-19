import React, { useEffect, useState } from 'react';
import ContractFlowService from '../../services/contractFlow/contractFlowService';
import TablesContractFlow from '../../components/ContractFlow2/TablesContractFlow';

const ContractFlow = (props) => {
  const [data, setData] = useState([]);
  const TOWER_ID = props.match.params.towerId;
  const service = new ContractFlowService();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await service.getContractsInformation(TOWER_ID);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <h1>FLUJO DE CAJA</h1>
      {console.log('REACTIVE', data)}
      <TablesContractFlow billings={data} />
    </React.Fragment>
  );
};

export default ContractFlow;
