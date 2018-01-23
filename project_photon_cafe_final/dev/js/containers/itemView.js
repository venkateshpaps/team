import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
class ItemView extends Component {
    render() {
        const {id,item,price,image}=this.props.adminItems;

        if (!this.props.adminItems) {
            return (<div>Select a Item...</div>);
        }
        return (
            <div>
                <h1  className="adminViewHeading">ITEM VIEW</h1>
                <h2 className="AdminViewTxt">Id:{id}</h2>
                <h2 className="AdminViewTxt">Item: {item}</h2>
                <h3 className="AdminViewTxt">Price: {price}</h3>
                <img className="itemImage AdminViewTxt" src={image} /><br/>
                <Link to="/admin-add-items" className="AdminViewback">back</Link>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        adminItems: state.activeItem
    };
}
export default connect(mapStateToProps)(ItemView);