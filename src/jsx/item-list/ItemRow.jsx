import * as React from 'react';
import { Link } from 'react-router-dom';
import { categories, colors, sizes } from '../ItemMeta';

const ItemRow = ({ item }) => {

    let categoryKey = item.category.toLowerCase();
    let colorKey = item.color.toLowerCase();

    return (
        <tr>
            <td>
                <Link to={`/items/${item._id}`}>
                    {item._id.substr(-4)}
                </Link>
            </td>
            <td>{item.brand}</td>
            <td>{categories[categoryKey]}</td>
            <td>{colors[colorKey]}</td>
            <td>{sizes[item.size]}</td>
            <td>{item.purchaseDate}</td>
            <td>{item.note}</td>
            <td>
                <button size="sm">
                    <span className="fa fa-trash" aria-hidden="true" />
                </button>
            </td>
        </tr>
    );
};

export default ItemRow;