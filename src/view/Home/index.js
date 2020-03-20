import React, { Component, Fragment } from 'react';
import Navbar from '../../components/navbar/Navbar';
import FilterPanel from '../../components/home/FilterPanel';
import DataTable from '../../components/home/DataTable';
import { transactions } from '../../data.json';
import '../../components/home/Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: transactions,
      account: [
        'Savings Account', 'Checking Account',
        'Auto Loan Account', 'Credit Card Account',
        'Investing Account', 'Personal Loan Account',
        'Money Market Account', 'Home Loan Account'
      ],
      transaction: ['deposit', 'withdrawal', 'invoice', 'payment'],
      filterData: null,
      accountFilterArr: [],
      transactionFilterArr: []
    };
  }

    handleFilterChange = (type, value) => {
      let { accountFilterArr, transactionFilterArr } = this.state;
      let AccountArr = [];
      let TransArr = [];
      if (type) {
        switch (type) {
        case 'account':
          AccountArr = accountFilterArr;
          if (AccountArr) {
            if (!AccountArr.includes(value)) {
              AccountArr.push(value);
            } else {
              AccountArr.splice(AccountArr.indexOf(value), 1);
            }
            this.setState({ accountFilterArr: AccountArr, data: [] }, () => {
              this.updateData();
            });
          }
          break;
        case 'transaction':
          TransArr = transactionFilterArr;
          if (TransArr) {
            if (!TransArr.includes(value)) {
              TransArr.push(value);
            } else {
              TransArr.splice(TransArr.indexOf(value), 1);
            }
            this.setState({ transactionFilterArr: TransArr, data: [] }, () => {
              this.updateData();
            });
          }

          break;
        default:
          break;
        }
      }
    }

    updateData = () => {
      let { accountFilterArr, transactionFilterArr } = this.state;
      let originalData = transactions, arr = [];
      if ((accountFilterArr && accountFilterArr.length > 0) && (transactionFilterArr && transactionFilterArr.length === 0)) {
        originalData.forEach(item => {
          if (accountFilterArr.includes(item.accountName)) {
            arr.push(item);
          }
        });
      } else if ((transactionFilterArr && transactionFilterArr.length > 0) && (accountFilterArr && accountFilterArr.length === 0)) {
        originalData.forEach(item => {
          if (transactionFilterArr.includes(item.transactionType)) {
            arr.push(item);
          }
        });
      } else if ((transactionFilterArr && transactionFilterArr.length > 0) && (accountFilterArr && accountFilterArr.length > 0)) {
        originalData.forEach(item => {
          if (accountFilterArr.includes(item.accountName) && transactionFilterArr.includes(item.transactionType)) {
            arr.push(item);
          }
        });
      } else {
        arr = originalData;
      }
      this.setState({ data: arr });
    }

    render() {
      return (
        <Fragment>
          <Navbar title='My Transactions'/>
          <div className='home-container max-width'>
            <FilterPanel
              state={this.state}
              handleFilterChange={this.handleFilterChange}
              history={this.props.history}
            />
            <DataTable
              key={this.state.accountFilterArr.length}
              state={this.state}
              history={this.props.history}
            />
          </div>
        </Fragment>
      );
    }
}
export default Home;