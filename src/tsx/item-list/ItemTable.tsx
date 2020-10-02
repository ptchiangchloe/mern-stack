import * as React from 'react';
import ItemRow from './ItemRow';
import '../../scss/ItemTable.scss';

type TableProps = {
    items: any,
}

const itemListHeader = ['ID', 'BRAND', 'CATEGORY', 'COLOR', 'SIZE', 'PURCHASE DATE', 'NOTE', '']

const ItemTable: React.FC<TableProps> = ({ items }) => (
    <div className="itemlist-container">
        <table className="table">
            <thead>
                <tr>
                    {
                        itemListHeader.map(colName => {
                            return (
                                <th>{colName}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item: {_id: string}) => <ItemRow key={item._id} item={item} />)
                }
            </tbody>
        </table>
    </div>
);

export default ItemTable;
