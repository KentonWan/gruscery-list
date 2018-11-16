import React, { Component} from 'react';

class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
            lists: []
        }
        

    }

    componentDidMount() {
        this.getAllLists()
          .then(res => this.setState({ lists: res }))
          .catch(err => console.log(err));
    };

    getAllLists = async () => {
        const response = await fetch('/lists/all');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(body);
        return body;
      }; 



    render () {

        return(
            <div className="container">
            <h4> Lists </h4>
                {
                    this.state.lists.map((list, index) => 
                    <p className="list" key={index}>
                    {list.title}
                    </p>)
                }
            </div>
        )
    }
}

export default Lists;