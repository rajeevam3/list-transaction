import React, { PureComponent } from 'react';

class DataTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      splitData: [],
      totalPages: 0,
      limit: 50,
      currentSelectedPage: 1
    };
  }
    createPaginationData = (data, limit) => {
      if (data && data.length > 0) {
        let min = 0, max = limit;
        this.setState({ splitData: data.slice(min, max), totalPages: Math.ceil(data.length / limit) });
      }
    }

    componentDidMount() {
      let { limit } = this.state;
      let { data } = this.props.state;
      this.createPaginationData(data, limit);
    }

    createPrevNextPagination = () => {
      let { currentSelectedPage, totalPages } = this.state;
      let { data } = this.props.state;
      if (data && data.length > 0) {
        return (
          <ul className='pagination-container'>
            <li onClick={() => this.updatePagination(1)}>First</li>
            <li
              className={`${currentSelectedPage === 1 ? 'disabled' : ''}`}
              onClick={() => this.updatePagination(currentSelectedPage - 1)}>Prev</li>
            <li className={`${currentSelectedPage === totalPages ? 'disabled' : ''}`}
              onClick={() => this.updatePagination(currentSelectedPage + 1)}>Next</li>
            <li onClick={() => this.updatePagination(totalPages)}>Last</li>
          </ul>
        );
      }
    }

    updatePagination = (page) => {
      let { limit } = this.state;
      let { data } = this.props.state;
      if (page > 1) {
        this.setState({ splitData: data.slice(((page-1)*limit), (page*limit)), currentSelectedPage: page });
      } else {
        this.setState({ splitData: data.slice(0, limit), currentSelectedPage: page });
      }
    }

    redirect = (item) => {
      this.props.history.push({
        pathname: `/${item.account}`,
        state: item
      });
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextProps !== this.props || nextState !== this.state;
    }

    componentDidUpdate(previousProps) {
      if (previousProps !== this.props) {
        let { limit } = this.state;
        if (this.props && this.props.state && this.props.state.data && this.props.state.data.length > 0) {
          this.createPaginationData(this.props.state.data, limit);
        }
      }
    }

    render() {
      let { splitData } = this.state;
      let { data } = this.props.state;
      let arr = ( splitData ? ( ( splitData.length > 0 ) ? splitData : ( data ? ( (data.length > 0) ? data : null ) : null )) : null );
      return (
        <div className='data-table__container'>
          <table>
            <thead>
              <tr>
                <th>Account No.</th>
                <th>Account Name</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {arr && arr.length > 0 && arr.map((item) => {
                return (
                  <tr key={item.account}>
                    <td onClick={() => this.redirect(item)} className='link-text'>{item.account}</td>
                    <td>{item.accountName}</td>
                    <td>{item.currencyCode}</td>
                    <td>{item.amount}</td>
                    <td>{item.transactionType}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {this.createPrevNextPagination()}
        </div>
      );
    }
}

export default DataTable;