import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    let { account, transaction, accountFilterArr, transactionFilterArr } = this.props.state;
    let { handleFilterChange } = this.props;
    return (
      <div className='filter-panel__container'>
        <div className='filter-panel__account'>
          <p>Account Type</p>
          {account && account.length > 0 && account.map((name, index) => {
            return (
              <FormControlLabel
                key={index}
                control = {
                  <Checkbox
                    checked={accountFilterArr.includes(name)}
                    onChange={() => handleFilterChange('account', name)}
                    name='name' />
                }
                label={name}
              />
            );
          })}
        </div>
        <div className='filter-panel__transaction'>
          <p>Transaction Type</p>
          {transaction &&
                        transaction.length > 0 &&
                        transaction.map((name, index) => {
                          return (
                            <FormControlLabel
                              key={index}
                              control = {
                                <Checkbox
                                  checked={transactionFilterArr.includes(name)}
                                  onChange={() => handleFilterChange('transaction', name)}
                                  name='name' />
                              }
                              label={name}
                            />
                          );
                        })}
        </div>
      </div>
    );
  }
}

export default FilterPanel;