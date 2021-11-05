import React from 'react';

export class ItemBrandForm extends React.Component {
    state = {
        brands: []
    }

    componentDidMount() {
        this.loadBrandName();
    }

    loadBrandName() {
        fetch('/api/brands').then((res) => {
            if(res.ok) {
                res.json().then((data) => {
                    data['brands'].unshift(' ')
                    this.setState({
                        brands: data['brands']
                    });
                });
            } else {
                res.json().then((err) => {
                    alert(`Failed to fetch issues: ${err.message}`);
                })
            }
        });
    }

    render() {
        const { brands } = this.state;
        const { handleChange, targetBrand } = this.props;

        return (
            <div className="form-group" onChange={() => handleChange}>
                <label>Brand:</label>
                <option value=""></option>
                <select id="brand" className="form-control">
                    {
                        brands.map((brand) => {
                            return (
                                <option value={brand} selected={targetBrand === brand}>{brand}</option>
                            )
                        })
                    }          
                </select>
            </div>
        )
    }
}