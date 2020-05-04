import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import Loader from '../../../UI2/Loader/Loader';
import Item from './Item';

const ItemPanel = ({ items, groupId, loadingField }) => {
  const [ItemsFiltered, setItemsFiltered] = useState([]);

  useEffect(() => {
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
  }, [groupId, items]);

  return ItemsFiltered.map((currentItem, index) => {
    return (
      <TableRow key={index}>
        <Loader isLoading={loadingField}>
          <Item currentItem={currentItem} index={index} />
        </Loader>
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
});

const mapDispatchToprops = {};
export default connect(
  mapStateToProps,
  mapDispatchToprops,
)(ItemPanel);
