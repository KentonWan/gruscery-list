import React, { Component} from 'react';
import {Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            description: '',
            purchased: false,
            newDescription: '',
            descriptionSpace: ''
        }
        

    }

    componentDidMount() {
        this.getItems()
          .then(res => this.setState({ items: res.items }))
          .catch(err => console.log(err));
        
    };

    getItems = async () => {
        const response = await fetch(`/lists/${this.props.listId}/items/all`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("getItems",body.items);
        return body;
      }; 

    onSubmit = async e => {

        e.preventDefault();
        const response = await fetch(`/lists/${this.props.listId}/items/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: this.state.description, purchased: this.state.purchased }),
          });
        console.log(response);
        const body = await response.text();
        this.getItems()
          .then(res => this.setState({ items: res.items }))
          .catch(err => console.log(err));  

        this.setState({description: ''});
      };

      editItem =  async (itemId, e) => {

        e.preventDefault();

        const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: this.state.newDescription }),
          });
        console.log("update",response);
        const body = await response.text();
        this.setState({newDescription: ""});
        this.getItems()
            .then(res => this.setState({ items: res.items }))
            .catch(err => console.log(err));
      };

      purchasedItem =  async (itemId, e) => {

        e.preventDefault();

        const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ purchased: true }),
          });
        console.log("purchased",response);
        const body = await response.text();
        this.getItems()
            .then(res => this.setState({ items: res.items }))
            .catch(err => console.log(err));
      };

      unpurchasedItem =  async (itemId, e) => {

        e.preventDefault();

        const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ purchased: false }),
          });
        console.log("purchased",response);
        const body = await response.text();
        this.getItems()
            .then(res => this.setState({ items: res.items }))
            .catch(err => console.log(err));
      };

      deleteItem =  async (itemId, e) => {

        e.preventDefault();

        const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/destroy`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        console.log("destroy",response);
        const body = await response.text();
        this.getItems()
            .then(res => this.setState({ items: res.items }))
            .catch(err => console.log(err));
      };


    render () {

        return(
            <div className="container">
            <h4>Items on List:</h4>
            <div className="items">
                {
                 this.state.items.map((item,index) =>
                    <div key={index}>
                        <p className="item" key={index}>{item.description}</p>
                        {(
                        item.purchased ? 
                        <button type="button" onClick={this.unpurchasedItem.bind(this, item.id)} value="Unmark as Purchased">Unmark as Purchased</button> :
                        <button type="button" onClick={this.purchasedItem.bind(this, item.id)} value="Mark as Purchased">Mark as Purchased</button>
                        )}
                        <form onSubmit={this.editItem.bind(this, item.id)}>
                            <input type="text" name="description"  onChange={e => this.setState({ newDescription: e.target.value})} placeholder="" />
                            <button type="submit" className="btn btn-danger">Update Item</button>
                        </form>
                        <button type="button" onClick={this.deleteItem.bind(this, item.id)} value="Delete Item">Delete Item</button> 
                    </div>
                    )
                }
            </div>
            <div className="newItem">
                <form className="newItemForm" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="description"
                    size="40"
                    value={this.state.description}
                    onChange={(e) => this.setState({ description: e.target.value})}
                    placeholder="Item Description (include quantity)">
                </input>
                <button type="submit" className="btn btn-success"> Add Item</button>
                </form>                
            </div>
            
            </div>
        )
    }
}

export default Item;

