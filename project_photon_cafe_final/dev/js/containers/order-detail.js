import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { store } from '../index';
import '../components/admin.css';
import {CompletedOrderStatus} from '../actions/index';
import { bindActionCreators } from 'redux';
/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */
class Order_detail extends Component {
    Change_Order_Status(order)
    {
        const {id,name,totalAmount,Totalquantity,Orderitems}=order;

        const data = {
                id:id,
                name: name,
                totalAmount: totalAmount,
                Totalquantity: Totalquantity,
                OrderStatus:"completed",
                Orderitems: Orderitems
            }
        this.props.CompletedOrderStatus(data);
    }

    componentDidMount() {
        const value = fetch('http://localhost:3001/Orders/' + this.props.match.params.id).then(
            data =>
                ({
                    type: "ORDERED_ITEM",
                    payload: data.json()
                }),
            error => console.log(error));

        store.dispatch(
            value
        );
    };
    TableRow(row) {
        const {id,item,image,price,quantity}=row;
        return (
            
               
            <tr key={id}>
                <td>{id}</td>
                <td>{item}</td>
                <td><img className="img_size" src={image}/></td>
                <td>{price}</td>
                 <td>{quantity}</td>
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
                return this.TableRow(row);
            })}
        </table>);
    };

    render() {
        
        if (!this.props.item) {
            return (<div>Select a order...</div>);
        }
        const {name,Totalquantity,totalAmount,Orderitems}=this.props.item;
        return (
            <div>
                 <div>
            <header>
                    <Link to ="/admin-main-page"><button>Back</button></Link>
                    <div className="title">Photon Cafe</div>
                        <div className="Admin_name">Admin Name:Sundaram</div>
                    </header>
                <div className="sub-title">List of Items</div>
                </div>
                <h2>USERNAME:{name}</h2>
                <h2>QUANTITY: {Totalquantity}</h2>
                <h2>TOTALAMOUNT: {totalAmount}</h2>
               <Link to ="/admin-main-page"> <button className="order_details_completed_but" onClick={this.Change_Order_Status.bind(this,this.props.item)}>Completed</button></Link>
                {this.Table(Orderitems)}
              

            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        item: state.orderItem
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ CompletedOrderStatus:CompletedOrderStatus}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Order_detail);
