import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdminselectItem, AdmindeleteItem } from '../actions/index';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class Admin_ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: {}
        };
    }
    itemSelect(item) {
        this.state.newItem = item;
        this.setState({ newItem: this.state.newItem });
    }
    editItem(newItem) {
        this.props.AdminselectItem(newItem);
    }
    addItem() {
    }
    deleteItem(deleteItem) {
        this.props.AdmindeleteItem(deleteItem);
    }
    viewItem(editItem) {
        this.props.AdminselectItem(editItem);
    }
    AdminTable(adminItems){
        return (<table>
            <th></th>
            <th>Item Name</th>
            <th></th>
            <th>Price</th>
            {adminItems.map(row => {
                return this.AdminTableRow(row);
            })}
        </table>);
    };
    AdminTableRow(adminRow){
        const {id,item,image,price}=adminRow;
        return (
        <tr key={id}>
            <td><input value={id} type="radio" onClick={this.itemSelect.bind(this, adminRow)} ></input></td>
            <td>{item} </td>
            <td><img src={image} className="image" /></td>
            <td>{price}</td>
        </tr>
        );
    };
    render() {
        const newItem=this.state.newItem;
        return (
            <div>
        
                    <h1 className="adminItemHeading">CAFETERIA FOOD ITEMS</h1>
                <div>
                    <ul class="adminBtnLine">
                    
                        <button className="adminBtnAlign"><Link to='/Add' onClick={this.addItem.bind(this)} >ADD</Link></button>
                        <button className="adminBtnAlign"><Link to="/Edit" onClick={this.editItem.bind(this,newItem)}>EDIT</Link>
                        </button>
                        <button className="adminBtnAlign"><Link to="/View" onClick={this.viewItem.bind(this,newItem)}>VIEW</Link>
                        </button>
                        <button  className="adminBtnAlign"><Link  to ="/admin-add-items" onClick={this.deleteItem.bind(this,newItem)}>DELETE
                        </Link></button>
                        <button  className="adminBtnAlign"><Link  to ="/admin-main-page" >BACK
                        </Link></button>
                    </ul>
                    {this.AdminTable(this.props.items)}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        items: state.adminAdd
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ AdminselectItem: AdminselectItem, AdmindeleteItem: AdmindeleteItem }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Admin_ItemList);