import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {CompletedOrderStatus} from '../actions/index';
import '../components/admin.css';

class OrderList extends Component {
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
    render() {
        console.log("user-list");
        return (
            <div>
                <header>
                <div className="Admin_back"><Link className="admin_name_color" to ="/">Logout</Link></div>
                    <div className="title">Photon Cafe</div>
                        <div className="Admin_name"><Link className="admin_name_color" to ="/admin-add-items">List Items</Link></div>
                        
                    </header>
                <div className="sub-title">List of orders</div>
              
                    <table>

                        <th>S.No</th>
                        <th>Name</th>
                        <th>TotalAmount</th>
                        <th>Total Quantity</th>
                        <th>Status</th>



                        {this.props.item.map((order) => {
                            const {id,name,totalAmount,Totalquantity}=order;
                            if(order.OrderStatus=="pending")
                            return (
                                <tr>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{totalAmount}</td>
                                    <td>{Totalquantity}</td>
                                    <td>{<Link to={`/admin-view/${order.id}`}> <button className="view-buttuon" > view  </button></Link>}
                                    <button  className="view-buttuon" onClick={this.Change_Order_Status.bind(this,order)}>Completed</button></td>
                                    
                                </tr>




                            );
                        })}
                    </table>
               

            </div>
        );
    }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        item: state.adminItem
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ CompletedOrderStatus:CompletedOrderStatus}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(OrderList);