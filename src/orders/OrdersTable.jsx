// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import OrderRow from './OrderRow';

class OrdersTable extends Component {
  static propTypes = {
    orderItems: PropTypes.array.isRequired
  };

  render() {
    return (
      <table className="table table-striped table-hover orders-table">
        <tbody>
          {this.props.orderItems.map(orderItem => (
            <OrderRow
              key={orderItem.id}
              productName={orderItem.productName}
              itemCost={orderItem.itemCost}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default OrdersTable;
