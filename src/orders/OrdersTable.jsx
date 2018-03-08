// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Currency from 'react-currency-formatter';

class OrdersTable extends Component {
  static propTypes = {
    orderItems: PropTypes.array.isRequired
  };

  render() {
    return (
      <table className="table table-striped table-hover orders-table">
        <tbody>
          {this.props.orderItems.map(this.renderOrder)}
        </tbody>
      </table>
    );
  }

  renderOrder(orderItem) {
    return <tr key={orderItem.id}>
      <td>{orderItem.productName}</td>
      <td>
        <Currency quantity={orderItem.itemCost} />
      </td>
    </tr>
  }
}

export default OrdersTable;
