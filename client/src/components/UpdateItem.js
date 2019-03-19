import React, { Component} from 'react';
import { Link } from 'react-router-dom';



class UpdateItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            newDescription: ''
        }
    }

    editItem =  async (itemId, e) => {

        e.preventDefault();

        this.setState({newDescription: e.target.value})

        const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: this.state.newDescription }),
          });
        console.log("update",response);
        const body = await response.text();
        this.props.updateItem();
        this.setState({newDescription: ""});


    };

    render () {


        return(
            <div className="updateItem-container">
                <form className="item" onSubmit={this.editItem.bind(this, this.props.itemId)}>
                    <input type="text" name="description"  value={this.state.newDescription} onChange={e => this.setState({ newDescription: e.target.value})} placeholder="" />
                    <button type="submit" className="btn btn-sml btn-warning update-btn">Update Item</button>
                </form>
            </div>
            )
            
        }
}

export default UpdateItem;