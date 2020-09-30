import * as React from 'react';
import ItemRow from './ItemRow';

type TableProps = {
    items: any,
}

const ItemTable: React.FC<TableProps> = ({ items }) => (
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Color</th>
                <th>price</th>
                <th>Purchase Date</th>
                <th>Note</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {
                items.map((item: {_id: string}) => <ItemRow key={item._id} item={item} />)
            }
        </tbody>
    </table>
);

export default ItemTable;
