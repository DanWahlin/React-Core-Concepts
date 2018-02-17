// React
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Currency from 'react-currency-formatter';

// Utilities
import _orderBy from 'lodash.orderby';
import _isEqual from 'lodash.isequal';

// Components
import CustomerRow from './CustomerRow';

class CustomersTable extends Component {
  static propTypes = {
    customers: PropTypes.array.isRequired
  };

  state = {
    filter: '',
    filteredCustomers: [],
    customersOrderTotal: 0,
    sortOrder: 'asc'
  };

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.customers, nextProps.customers)) {
      this.setState({
        filteredCustomers: nextProps.customers,
        customersOrderTotal: this.calculateOrders(nextProps.customers)
      });
    }
  }

  sort(prop) {
    const newSortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';

    this.setState(state => ({
      sortOrder: newSortOrder,
      filteredCustomers: _orderBy(state.filteredCustomers, prop, newSortOrder)
    }));
  }

  calculateOrders = customers => {
    let total = 0;

    customers.forEach(cust => {
      total += cust.orderTotal;
    });

    return total;
  };

  handleFilterChange = e => {
    const filter = e.target.value;

    if (filter) {
      const filteredCustomers = this.props.customers.filter(
        cust => cust.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
      );

      this.setState({
        filter,
        filteredCustomers,
        customersOrderTotal: this.calculateOrders(filteredCustomers),
      });
    } else {
      this.setState({
        filter,
        filteredCustomers: this.props.customers,
        customersOrderTotal: this.calculateOrders(this.props.customers)
      });
    }
  };

  render() {
    return (
      <Fragment>
        Filter: <input type="text" onInput={this.handleFilterChange} value={this.state.filterValue} />
        <br />
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th onClick={() => this.sort('name')}>Name</th>
              <th onClick={() => this.sort('city')}>City</th>
              <th onClick={() => this.sort('orderTotal')}>Order Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredCustomers.map(cust => (
              <CustomerRow
                key={cust.id}
                id={cust.id}
                name={cust.name}
                city={cust.city}
                orderTotal={cust.orderTotal}
              />
            ))}
            {this.state.filteredCustomers.length ? (
              <tr>
                <td colSpan="2" />
                <td>
                  <Currency quantity={this.state.customersOrderTotal} />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="4">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
        Number of Customers: {this.state.filteredCustomers.length}
      </Fragment>
    );
  }
}

export default CustomersTable;
