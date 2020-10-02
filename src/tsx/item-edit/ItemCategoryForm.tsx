import React from 'react';

interface Props {
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

export default class ItemCategoryForm extends React.Component<Props> {
    render() {
        return (
            <div className="form-group" onChange={this.props.handleChange}>
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
}