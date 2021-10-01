import * as React from 'react';
import ItemRow from './ItemRow';
import '../../scss/ItemTable.scss';

const itemListHeader = ['ID', 'BRAND', 'CATEGORY', 'COLOR', 'SIZE', 'PURCHASE DATE', 'NOTE', '']

const ItemTable = ({ items, deleteItem }) => (
    <div className="itemlist-container">
        <table className="table">
            <thead>
                <tr>
                    {
                        itemListHeader.map((colName, index) => {
                            return (
                                <th key={index}>{colName}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item) => <ItemRow key={item._id} item={item} deleteItem={deleteItem} />)
                }
            </tbody>
        </table>
    </div>
);

export default ItemTable;
