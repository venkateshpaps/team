import React, { Component } from 'react';
import Header from './second-page-header';
import { connect } from 'react-redux';
import { modifyItem, deleteItem, finalCart,EmptycartItems } from '../actions/index.js'
import { bindActionCreators } from 'redux';
import './Cart_page.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Cart_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: {}
        };
    }

    quantityChange(iterator, event) {
        const {item,price,image, id}=iterator;
        this.setState({
            newItem: {
                item: item,
                quantity: event.target.value,
                price: price,
                image: image,
                id: id
            }
        })
    }
    updateCart() {
        this.props.modifyItem(this.state.newItem);
    }

    finalCartUpdate(singleUserItemCost,singleUserquantity) {
        const data = {
            name: this.props.users[0].name,
            totalAmount: singleUserItemCost,
            Totalquantity: singleUserquantity,
            OrderStatus:"pending",
            Orderitems: this.props.itemsSelected
            
        }
        this.props.finalCart(data);
        alert("successfully placed the order");
        this.props.EmptycartItems();
    }
    totalAmountDisplay() {


        const { itemsSelected } = this.props;
        
        if(itemsSelected.length>0)
        {
        const totalCost = itemsSelected.map((iterator) => {
            return iterator.price * iterator.quantity;
        });
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const singleUserItemCost = totalCost.reduce(reducer);
        const totalquantity = itemsSelected.map((iterator) => {
            return iterator.quantity;
        });
        const totalqt=totalquantity.map(Number);
        const singleUserquantity = totalqt.reduce(reducer);
    
        return (<div className="Total_amount_Quantity_display"><div className="display_Total_Amount">Total-Amount:{singleUserItemCost}</div> <div className="display_Total_quantity">Total-Quantity:{singleUserquantity}</div>
           <Link to="/item-List"> <button className="display_order_button" onClick={this.finalCartUpdate.bind(this, singleUserItemCost,singleUserquantity)}>Place order</button></Link></div>
        );
    }
}
    tableRow(row) {
        const {id,item,image,price,quantity}=row;
        console.log(row);
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{item}</td>
                <td><img src={image} className="imageHeight" /></td>
                <td>{price}</td>
                <td><input type="number" defaultValue={quantity} onChange={this.quantityChange.bind(this, row)} min="0" />
                <button className="update_button" onClick={this.updateCart.bind(this)}>Update</button>
                <button className="Delete_button" onClick={this.props.deleteItem.bind(this, row)}>Delete</button></td>
            </tr>
        )
    };
    Table(items) {
        return (<table>
            <th>S.no</th>
            <th>Food-Items</th>
            <th></th>
            <th>Price</th>
            <th>Quantity</th>
            {items.map(row => {
                return this.tableRow(row);
            })}
        </table>);
    };
    render() {
        const { itemsSelected } = this.props;
        return (
            <div>
                <Header />
                {this.totalAmountDisplay()}
                
                {this.Table(itemsSelected)}
            </div>
        );
    }
}



function mapStatetoProps(state) {
    return {
        users: state.users,
        itemsSelected: state.itemsSelected,
        totalAmountValue: state.totalAmount
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ modifyItem: modifyItem, deleteItem: deleteItem, finalCart: finalCart,EmptycartItems:EmptycartItems }, dispatch);
}
export default connect(mapStatetoProps, matchDispatchToProps)(Cart_page);
