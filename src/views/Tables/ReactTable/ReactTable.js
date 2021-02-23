import React, {Component} from 'react';
import axios from 'axios';

import data from './_data';

import RcTable from 'react-table';
import "react-table/react-table.css";


const getTestData = (page, pageSize, sorted, filtered, handleRetrievedData) => {
  let url = this.baseURL + "/getData";
  let postObject = {
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filtered: filtered,
  }; 

  //return this.post(url, postObject).then(response => handleRetrievedData(response)).catch(response => console.log(response));
  
}
// const post = (url, params = {}) => {
//   return axios.post(url, params)
// }


class ReactTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      loading: false,
      pages: 0
    };
  }

  render() {
    const { data } = this.state;

    return (
        <RcTable
                       data={data}
                       pages={this.state.pages}
                       columns={[
                             {
                               Header: "Index",
                               accessor: "index"
                             },
                             {
                               Header: "Status",
                               accessor: "status"
                             },
                             {
                               Header: "Name",
                               accessor: "name"
                              }
                            ]}
                     defaultPageSize={10}
                     className="-striped -highlight"
                     loading={this.state.loading}
                     showPagination={true}
                     showPaginationTop={false}
                     showPaginationBottom={true}
                     pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                     manual // this would indicate that server side pagination has been enabled 
                     onFetchData={(state, instance) => {
                             this.setState({loading: true});
                             this.getTestData(state.page, state.pageSize, state.sorted, state.filtered, (res) => {
                             this.setState({
                                     data: res.data.rows,
                                     pages: res.data.pages,
                                     loading: false
                             })
                          });
                     }}
                     />
    );
  }
}

export default ReactTable;
