import React, { Component } from "react";
import API from "./API";
import ReactTable from "react-table-6";

class App extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    API.search().then(({ data: { results } }) => {
      let users = results.map((person) => {
        return {
          id: person.id.value || "N/A",
          name: person.name.first + person.name.last,
          address: person.location.city,
          email: person.email,
          phone: person.phone,
          website: person.picture.thumbnail,
        };
      });
      this.setState({ users });
    });
  }

  deleteRow(id) {
    const index = this.state.users.findIndex((user) => {
      return user.id === id;
    });
    console.log("index", index);
  }

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "id",
        filterable: true,
        style: { textAlign: "center" },
        width: 150,
      },
      {
        Header: "NAME",
        accessor: "name",
        filterable: true,
        textAlign: "center",
        style: { textAlign: "center" },
        width: 300,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        style: { textAlign: "center" },
      },
      {
        Header: "PHONE",
        accessor: "phone",
        filterable: true,
        style: { textAlign: "center" },
      },
      {
        Header: "THUMBNAIL",
        Cell: (props) => {
          console.log(props);
          return <img src={props.value} />;
        },
        accessor: "website",
        style: { textAlign: "center" },
        width: 200,
      },
      {
        Header: "CITY",
        accessor: "address",
        filterable: true,
        style: { textAlign: "center" },
      },
      {
        Header: "DELETE",
        Cell: (props) => {
          return (
            <button
              style={{
                backgroundColor: "red",
                padding: "5px",
                color: "white",
                borderRadius: "10px",
                borderColor: "white",
              }}
              onClick={() => {
                this.deleteRow(props.original.id);
              }}
            >
              Delete
            </button>
          );
        },
        style: { textAlign: "center" },
        width: 200,
      },
    ];

    return (
      <ReactTable
        columns={columns}
        data={this.state.users}
        showPaginationTop
      ></ReactTable>
    );
  }
}

export default App;
