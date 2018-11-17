import React, { Component} from 'react';
import {Link} from 'react-router-dom';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
        }
        

    }

    componentDidMount() {
        this.getList()
          .then(res => this.setState({ list: res.list }))
          .catch(err => console.log(err));
    };

    getList = async () => {
        const response = await fetch('/lists/1');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("list",body);
        return body;
      }; 

    //   onSubmit = async e => {

    //     e.preventDefault();
    //     const response = await fetch('/lists/create', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ title: this.state.listTitle }),
    //       });
    //     console.log(response);
    //     const body = await response.json();

    //     this.setState({listTitle: ''});
    //   };





    render () {

        console.log(this.state.list)

        return(
            <div className="container">
            <h4>{this.state.list.title}</h4>
            </div>
        )
    }
}

export default List;

