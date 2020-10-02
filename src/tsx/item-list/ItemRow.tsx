import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

type RowProps = {
    item: any
}

const ItemRow: React.FC<RowProps> = ({ item }) => {
    function onDeleteClick() {
        // deleteIssue(item._id);
    }

    return (
        <tr>
            <td>
                <Link to={`/items/${item._id}`}>
                    {item._id.substr(-4)}
                </Link>
            </td>
            <td>{item.brand}</td>
            <td>{item.category}</td>
            <td>{item.color}</td>
            <td>{item.price}</td>
            <td>{item.purchaseDate}</td>
            <td>{item.note}</td>
            <td><Button size="sm" onClick={onDeleteClick}><span className="glyphicon glyphicon-trash" aria-hidden="true" /></Button></td>
        </tr>
    );
};

export default ItemRow;