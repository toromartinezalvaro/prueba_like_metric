import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import Loader from '../../../UI2/Loader/Loader';
import { startApiFetch, successApiFetch } from './action';
import Item from './Item';

const ItemPanel = ({
  items,
  groupId,
  loadingField,
  onStartApi,
  onSuccessApi,
}) => {
  const [ItemsFiltered, setItemsFiltered] = useState([]);

  useEffect(() => {
    onStartApi();
    const filter = items.filter(
      (element) => element.contractCategoryId === groupId,
    );
    setItemsFiltered(
      _.orderBy(
        filter,
        [(itemFilter) => itemFilter.name.toLowerCase()],
        ['asc'],
      ),
    );
    onSuccessApi();
  }, [groupId, items]);

  return ItemsFiltered.map((currentItem, index) => {
    return (
      <TableRow key={index}>
          <Item
            currentItem={currentItem}
            index={index}
            ItemsFiltered={ItemsFiltered}
          />
      </TableRow>
    );
  });
};

ItemPanel.propTypes = {
  items: PropTypes.array.isRequired,
  groupId: PropTypes.number,
  loadingField: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.groups.groupTabs.groups,
  items: state.groups.groupTabs.items,
  loadingField: state.groups.groupItemPanel.loading,
  groupId: state.groups.groupTabs.expandedGroup,
  onStartApi: PropTypes.func.isRequired,
  onSuccessApi: PropTypes.func.isRequired,
});

const mapDispatchToprops = {
  onStartApi: startApiFetch,
  onSuccessApi: successApiFetch,
};
export default connect(
  mapStateToProps,
  mapDispatchToprops,
)(ItemPanel);
