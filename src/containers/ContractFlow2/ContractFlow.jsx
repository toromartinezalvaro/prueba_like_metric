import React, { useEffect, useState } from 'react';
import ContractFlowService from '../../services/contractFlow/contractFlowService';
import TableContractFlow from '../../components/ContractFlow2/TablesContractFlow';
import TablesContractFlow from '../../components/ContractFlow2/TablesContractFlow';

const ContractFlow = (props) => {
  const [bills, setBills] = useState([]);
  const TOWER_ID = props.match.params.towerId;
  const service = new ContractFlowService();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await service.getContractsInformation(TOWER_ID);
        setBills(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>FLUJO DE CAJA</h1>
      {console.log('REACTIVE', bills)}
      <TablesContractFlow />
    </React.Fragment>
  );
};

export default ContractFlow;
