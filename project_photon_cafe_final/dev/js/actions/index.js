
const host ='http://localhost:3001/';
const header={ 'Accept': 'application/json', 'Content-Type': 'application/json' };

export const AdminselectItem = (items) => {
    return {
        type: 'ITEM_SELECTED',
        payload: items
    }
};

export const AdminmodifyItem = (items) => {
    return fetch(host+'items/' + items.id,
        {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(items)
        }).then(
        data =>
            ({
                type: "MODIFY_ITEM",
                payload: data.json()
            }),
        error => console.log(error)
        );
};
export const AdmindeleteItem = (items) => {
    return fetch(host+'items/' + items.id,
        {
            method: 'DELETE',
        }).then(
        data =>
            ({
                type: 'DELETE_ITEM',
                payload: items
            }),

        error => console.log(error)
        );
};
export const AdminaddItems = (items) => {
    return fetch(host+'items/' ,
        {
            method: 'POST',
            headers: header,
            body: JSON.stringify(items)
        }).then(
        data =>
            ({
                type: "ADD_ITEM",
                payload: data.json()
            }),
        error => console.log(error)
        );
};


export const modifyItem = (Item) => {
console.log(Item);
    return {
        type: 'MODIFY_CART_ITEM',
        payload: Item
    }
};
export const cartItems = (items) => {
    return {
        type: "ADD_CART_ITEM",
        payload: items

    }
};

export const deleteItem = (Item) => {
    return {
        type: 'DELETE_CART_ITEM',
        payload: Item
    }
};
export const finalCart = (data) => {
    return fetch(host+'Orders/',
        {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        }).then(
        data =>
            ({
                type: "ADD_FINAL_CART",
                payload: data.json()
            }),

        error => console.log(error)
        );

};
export const userLogging= (user) => {
    console.log("hello", user);
    return {
        type: "USER_LOGIN",
        payload: user
    };
};

export const EmptycartItems = () => {
    return {
        type: "EMPTY_CART_ITEM"
    }
};


export const CompletedOrderStatus = (items) => {
    console.log(items);
    return fetch(host+'Orders/' + items.id,
        {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(items)
        }).then(
        data =>
            ({
                type: "MODIFY_STATUS",
                payload: data.json()
            }),
        error => console.log(error)
        );
};