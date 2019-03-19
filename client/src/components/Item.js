import React, { Component} from 'react';
import {Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import "./Item.css";
import UpdateItem from './UpdateItem.js';

class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            description: '',
            purchased: false,
            newDescription: '',
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
      
    updateItem = () => {
        this.getItems()
          .then(res => this.setState({ items: res.items }))
          .catch(err => console.log(err));
        
    }

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
        console.log("unpurchased",response);
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
            <h4>Items</h4>
            <div className="items">
                {
                 this.state.items.map((item,index) =>
                    <div className="row item" key={index}>

                        <p className="item col-md-2" id="item-desc" key={index}>{item.description}</p>
                        <div className="item col-md-5">
                            <UpdateItem  updateItem = {this.updateItem} itemId={item.id} />
                        </div>


                        {(
                        item.purchased ? 
                        <button className="btn btn-sml btn-secondary item unpurchase-btn col-md-2" type="button" onClick={this.unpurchasedItem.bind(this, item.id)} value="Unmark as Purchased">Unpurchase</button> :
                        <button className="btn btn-sml btn-primary item purchase-btn col-md-2" type="button" onClick={this.purchasedItem.bind(this, item.id)} value="Mark as Purchased">Purchased</button>
                        )}

                        <button className="btn btn-sml btn-danger item delete-btn col-md-2" type="button" onClick={this.deleteItem.bind(this, item.id)} value="Delete Item">Delete Item</button> 

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
                    className="new-item-input"
                    value={this.state.description}
                    onChange={(e) => this.setState({ description: e.target.value})}
                    placeholder="Item Description (include quantity)">
                </input>
                <button type="submit" className="btn btn-sml btn-success add-btn"> Add Item</button>
                </form>                
            </div>
            
            </div>
        )
    }
}

export default Item;

