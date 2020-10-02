import React from 'react';

interface MyProps {
    handleChange: any
}

const categories = {
    outerwear: 'Outerwear and Blazers',
    sweatshirts: 'Sweatshirts and Sweatpants',
    activewear:'Activewear',
    sweaters: 'Sweaters',
    shirts: 'Shirts',
    tshirts: 'T-shirts',
    jeans: 'Jeans',
    pants: 'Pants',
    shorts: 'Shorts',
    underwear: 'Underwear',
    socks: 'Socks',
    accessories: 'Accessories',
    shoes: 'Shoes'
}

export const ItemCategoryForm: React.FC<MyProps> = (props) => {
    return (
        <div className="form-group" onChange={props.handleChange}>
            <label>CATEGORY:</label>
            <select id="category" className="form-control">
                {
                    Object.keys(categories).map((category) => {
                        return (
                            <option value={category}>{categories[category]}</option>
                        )
                    })
                }          
            </select>
        </div>
    )
}