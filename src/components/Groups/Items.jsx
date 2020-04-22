import React, { useEffect, useState } from 'react';
import {
  Card,
  Fab,
  Icon,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import ItemAction from './ItemAction';
import styles from './Items.module.scss';

const Items = ({ groups, items, createOrUpdateItem, deleteItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState(items);
  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const itemsByGroup = (contractCategoryId) => {
    const item = itemsLoaded.filter(
      (element) => element.contractCategoryId === contractCategoryId,
    );
    return item;
  };

  const setGlobalItemList = (item, deleteCheck) => {
    if (deleteCheck) {
      const index = items.findIndex(
        (element) => element.contractCategoryId === item[0].contractCategoryId,
      );
      const lastItem = [...items];
      lastItem[index] = item;
      setItemsLoaded(lastItem);
    } else {
      const lastItem = [...itemsLoaded];
      lastItem.push(item);
      setItemsLoaded(lastItem);
    }
  };
  return (
    <React.Fragment>
      <div className={styles.container}>
        {groups.map((group, index) => {
          return (
            <ExpansionPanel
              expanded={expanded === `panel${index}`}
              onChange={handleChangePanel(`panel${index}`)}
              classes={{ root: styles.expansionHeader }}
              key={index}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h5>{group.categoryName}</h5>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails classes={{ root: styles.expansionDetail }}>
                <ItemAction
                  items={itemsByGroup(group.id)}
                  createOrUpdateItem={createOrUpdateItem}
                  deleteItem={deleteItem}
                  setGlobalItemList={setGlobalItemList}
                  contractCategoryId={group.id}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    </React.Fragment>
  );
};

Items.propTypes = {
  groups: PropTypes.array,
  items: PropTypes.array,
  createOrUpdateItem: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default Items;
