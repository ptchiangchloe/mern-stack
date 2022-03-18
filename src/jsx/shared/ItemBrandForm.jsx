import React, { useEffect, useState } from 'react';

export function ItemBrandForm(props)  {
    const [brands, setBrands] = useState([])

    useEffect(() => {
        loadBrandName();
    }, [])

    function loadBrandName() {
        fetch('/api/brands').then((res) => {
            if(res.ok) {
                res.json().then((data) => {
                    data['brands'].unshift(' ')
                    setBrands(data['brands'])
                });
            } else {
                res.json().then((err) => {
                    alert(`Failed to fetch issues: ${err.message}`);
                })
            }
        });
    }

    const { handleChange, targetBrand } = props;

    return (
        <div className="form-group" >
            <label>Brand:</label>
            <select id="brand" className="form-control" onChange={handleChange}>
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