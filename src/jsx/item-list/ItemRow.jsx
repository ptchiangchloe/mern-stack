/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link } from 'react-router-dom';
import DeleteItem from './DeleteItem';

import { categories, colors, sizes } from '../ItemMeta';

const ItemRow = ({ item, deleteItem }) => {
    const categoryKey = item.category ? item.category.toLowerCase() : '';
    const colorKey = item.color ? item.color.toLowerCase() : '';

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
                <DeleteItem deleteItem={deleteItem} itemId={item._id} />
            </td>
        </tr>
    );
};

export default ItemRow;
