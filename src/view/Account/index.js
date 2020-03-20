import React, { PureComponent, Fragment } from 'react';
import Navbar from '../../components/navbar/Navbar';
import '../../components/home/Home.scss';

class Account extends PureComponent {
  render() {
    let data = this.props.history ? this.props.history.location ? this.props.history.location.state ? this.props.history.location.state : null : null : null;
    return (
      <Fragment>
        <Navbar title={`Transaction ${data.account}`}/>
        <div className='max-width transaction-container'>
          <ul>
            <li>Account No.: <span>{data.account}</span></li>
            <li>Account Name: <span>{data.accountName}</span></li>
            <li>Currency Code: <span>{data.currencyCode}</span></li>
            <li>Account: <span>{data.amount}</span></li>
            <li>Transaction Type: <span>{data.transactionType}</span></li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default Account;