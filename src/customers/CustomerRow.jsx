// React
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Currency from 'react-currency-formatter';

// Utilities
import { capitalize } from '../utils';

const CustomerRow = ({ id, name, city, orderTotal }) => {
  return (
    <tr>
      <td>
        <Link to={`/orders/${id}`}>{capitalize(name)}</Link>
      </td>
      <td>{city}</td>
      <td>
        <Currency quantity={orderTotal} />
      </td>
    </tr>
  );
};

CustomerRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  orderTotal: PropTypes.number.isRequired
};

export default CustomerRow;
