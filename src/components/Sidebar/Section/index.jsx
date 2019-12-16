import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import style from '../SideMenu.module.scss';
import agent from '../../../config/config';
import Icon from '../../../assets/icons/Icon';

import { Role } from '../../../helpers';
import { DashboardRoutes, ContractRoutes } from '../../../routes/local/routes';

const Section = (props) => {
  const { items, title, validation } = props;
  console.log(validation);
  const [expanded, setExpanded] = useState(validation);

  return (
    <ExpansionPanel
      classes={{ root: style.expansionPanel }}
      onClick={() => setExpanded(!expanded)}
      expanded={expanded}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ root: style.expansionPanelSummary }}
      >
        {title}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: style.expansionPanelDetails }}>
        <div className={style.linkContainer}>{items}</div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Section;
