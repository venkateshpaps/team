import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdminmodifyItem} from '../actions/index';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

export class ItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: this.props.items
        };
    }

    itemChange(event) {
        this.state.newItem.item = event.target.value;
        this.setState({ newItem: this.state.newItem });
    }
    priceChange(event) {
        this.state.newItem.price = event.target.value;
        this.setState({ newItem: this.state.newItem });
    }
    componentWillReceiveProps(nextProps) {
        const {id,item,price,image} =nextProps.items;
        if (nextProps.items) {
            this.setState({
                newItem: {
                    id: id,
                    item: item,
                    price: price,
                    image: image
                    
                }
            });
        }
    }
    render() {
        const {id,image}=this.props.items;
        if (!this.props.items) {
            return (
                    <div> <h2>User Details</h2> Select a user...</div>);
        }
        return (
            <div>
              
                    <h2 className="adminEditHeading">Item Details</h2>
                    <h2 className="AdminEdittextalign">Id:{id}</h2>
                    <h3 className="AdminEdittextalign">Item Name: <input type="text" value={this.state.newItem.item} onChange={this.itemChange.bind(this)}></input></h3>
                    <h3 className="AdminEdittextalign">Price: <input type="text" value={this.state.newItem.price} onChange={this.priceChange.bind(this)}></input></h3>
                    <img className="AdminEditImg AdminEdittextalign" src={image} />
                    <button  className="AdminEdittextalign adminBtnAlign" onClick={this.props.AdminmodifyItem.bind(this, this.state.newItem)}> save</button><br/>
                    <Link className="AdminEdittextalign" to ="/admin-add-items" >back</Link>
              
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        items: state.activeItem
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ AdminmodifyItem: AdminmodifyItem }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ItemEdit);