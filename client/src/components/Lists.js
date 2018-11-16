import React, { Component} from 'react';

class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
            lists: [],
            response: '',
            listTitle: ''
        }
        

    }

    componentDidMount() {
        this.getAllLists()
          .then(res => this.setState({ response: res }))
          .catch(err => console.log(err));
    };

    getAllLists = async () => {
        const response = await fetch('/lists/all');
        const body = await response.text();
        if (response.status !== 200) throw Error(body.message);
        console.log(body);
        return body;
      }; 

      onSubmit = async e => {

        e.preventDefault();
        const response = await fetch('/lists/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: this.state.listTitle }),
          });
        console.log(response);
        const body = await response.json();

        this.setState({listTitle: ''});
      };



    render () {

        return(
            <div className="container">
            <h4> Lists </h4>
            <div className="lists">
            </div>
            <div className="newList">
                <form className="newListForm" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="title"
                    value={this.state.listTitle}
                    onChange={(e) => this.setState({ listTitle: e.target.value})}
                    placeholder="New List Title">
                </input>
                <button type="submit" className="btn btn-success"> Add List</button>
                </form>                
            </div>
                {/* {
                    this.state.lists.map((list, index) => 
                    <p className="list" key={index}>
                    {list.title}
                    </p>)
                } */}
            </div>
        )
    }
}

export default Lists;