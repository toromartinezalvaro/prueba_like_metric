import React, { useState, Fragment } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import style from '../SideMenu.module.scss';

const Section = (props) => {
  const { items, title, validation, display, icon } = props;
  const [expanded, setExpanded] = useState(validation);

  return (
    <Fragment>
      {display && (
        <ExpansionPanel
          classes={{ root: style.expansionPanel }}
          onClick={() => setExpanded(!expanded)}
          expanded={expanded}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{ root: style.expansionPanelSummary }}
          >
            <div
              className={`${style.collapseHeader} ${expanded && style.expansionPanelActive}`}
            >
              <Icon className={`${icon} ${style.iconLabel}`} />
              {title}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{ root: style.expansionPanelDetails }}
          >
            <div className={style.linkContainer}>{items}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </Fragment>
  );
};

export default Section;
