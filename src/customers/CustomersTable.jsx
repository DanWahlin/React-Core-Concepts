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
    sortOrder: 'asc',
    sortProp: null
  };

  sort(prop) {
    const newSortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';

    this.setState({
      sortOrder: newSortOrder,
      sortProp: prop
    });
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
    this.setState({filter});
  };


  filteredCustomers() {
    var customers = this.props.customers;

    var {filter, sortProp, sortOrder} = this.state;

    if (filter) {
      customers = customers.filter(
        cust => cust.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
      );
    }

    if (sortProp) {
      customers = _orderBy(customers, sortProp, sortOrder);
    }

    return customers;
  }

  customersOrderTotal() {
    return this.calculateOrders(this.filteredCustomers());
  }

  render() {
    var customers = this.filteredCustomers();

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
            {customers.map(cust => (
              <CustomerRow
                key={cust.id}
                id={cust.id}
                name={cust.name}
                city={cust.city}
                orderTotal={cust.orderTotal}
              />
            ))}
            {customers.length ? (
              <tr>
                <td colSpan="2" />
                <td>
                  <Currency quantity={this.customersOrderTotal()} />
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
        Number of Customers: {customers.length}
      </Fragment>
    );
  }
}

export default CustomersTable;
