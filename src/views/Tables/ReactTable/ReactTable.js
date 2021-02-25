import React, {Component} from 'react';
import makeData from './makeData'
import "./style.scss";
import Table from '../../../helpers/Table';
import { Col, Row, Card, CardBody, CardHeader } from 'reactstrap';


class ReactTable extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      loading: false,
      pageCount: 0
    };

    this.fetchData = this.fetchData.bind(this);

  }
  componentDidMount() {
    console.log("component did mount");
  }
  componentDidUpdate() {
    console.log("component did update");
  }
  fetchData({pageSize, pageIndex}){
    console.log("fetchData");
    this.setState({
      loading: true
    });
    setTimeout(() => {
      // We'll even set a delay to simulate a server here
      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;
      const serverData = makeData(1500);
      this.setState({
        data: serverData.slice(startRow, endRow),
        pageCount: Math.ceil(serverData.length / pageSize),
        loading: false
      })
    }, 1000)
    
  }

  render() {
    const columns = 
    [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
        //sortType: 'basic'
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        // sortType: 'basic'
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        // sortType: 'basic'
      },
    ];


    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                Card title
              </CardHeader>
              <CardBody>
                  <Table
                    columns={columns}
                    data={this.state.data}
                    fetchData={this.fetchData}
                    loading={this.state.loading}
                    pageCount={this.state.pageCount}
                  />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ReactTable;
