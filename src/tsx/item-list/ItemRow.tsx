import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { categories, colors, sizes } from '../ItemMeta';

type RowProps = {
    item: any
}

const ItemRow: React.FC<RowProps> = ({ item }) => {
    console.log(item)
    return (
        <tr>
            <td>
                <Link to={`/items/${item._id}`}>
                    {item._id.substr(-4)}
                </Link>
            </td>
            <td>{item.brand}</td>
            <td>{categories[item.category]}</td>
            <td>{colors[item.color]}</td>
            <td>{sizes[item.size]}</td>
            <td>{item.purchaseDate}</td>
            <td>{item.note}</td>
            <td>
                <Button size="sm">
                    <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                </Button>
            </td>
        </tr>
    );
};

export default ItemRow;