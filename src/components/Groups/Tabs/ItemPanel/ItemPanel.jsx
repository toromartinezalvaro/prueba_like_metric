import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { startApiFetch, successApiFetch } from './action';
import { setCurrentItem, setIndex, setItemsFiltered } from './Item/action';
import Item from './Item';

const ItemPanel = ({
  items,
  groupId,
  onStartApi,
  onSuccessApi,
  onSetCurrentItem,
  onSetIndex,
  onSetItemsFiltered,
}) => {
  const [ItemsFiltered, setItemsFilteredState] = useState([]);

  useEffect(() => {
    const filter = items.filter(
      (element) => element.contractCategoryId === groupId,
    );
    setItemsFilteredState(
      _.orderBy(
        filter,
        [(itemFilter) => itemFilter.name.toLowerCase()],
        ['asc'],
      ),
    );
  }, [groupId, items]);

  return ItemsFiltered.map((currentItem, index) => {
    onSetCurrentItem(currentItem);
    onSetIndex(index);
    onSetItemsFiltered(ItemsFiltered);
    return (
      <TableRow key={index}>
        <Item />
      </TableRow>
    );
  });
};

ItemPanel.propTypes = {
  items: PropTypes.array.isRequired,
  groupId: PropTypes.number,
  onSetCurrentItem: PropTypes.func.isRequired,
  onSetIndex: PropTypes.func.isRequired,
  onSetItemsFiltered: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.groups.groupTabs.groups,
  items: state.groups.groupTabs.items,
  groupId: state.groups.groupTabs.expandedGroup,
  onStartApi: PropTypes.func.isRequired,
  onSuccessApi: PropTypes.func.isRequired,
});

const mapDispatchToprops = {
  onStartApi: startApiFetch,
  onSuccessApi: successApiFetch,
  onSetCurrentItem: setCurrentItem,
  onSetIndex: setIndex,
  onSetItemsFiltered: setItemsFiltered,
};
export default connect(
  mapStateToProps,
  mapDispatchToprops,
)(ItemPanel);
