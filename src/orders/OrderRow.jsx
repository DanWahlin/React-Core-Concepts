// React
import React from 'react';
import PropTypes from 'prop-types';
import Currency from 'react-currency-formatter';

const OrderRow = ({ productName, itemCost }) => {
  return (
    <tr>
      <td>{productName}</td>
      <td>
        <Currency quantity={itemCost} />
      </td>
    </tr>
  );
};

OrderRow.propTypes = {
  productName: PropTypes.string.isRequired,
  itemCost: PropTypes.number.isRequired
};

export default OrderRow;
