import React from 'react';

class DeleteItem extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <button size="sm" type="button" onClick={() => this.props.deleteItem(this.props.itemId)}>
                <span className="fa fa-trash" aria-hidden="true" />
            </button>
        )
    }
}

export default DeleteItem;
