import React from 'react';
import debug from 'debug';
const log = debug('app:CreateBrandLabel');

export default class CreateBrandLabel extends React.Component {
    state = {
        brand: ''
    }

    handleChange(event) {
        this.setState({
            brand: event.target.value
        })
        console.log(this.state.brand)
    }

    toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
    }

    FormatNameToJson(brandName) {
        let res = {};
        let key = brandName.toLowerCase();
        let value = this.toTitleCase(brandName);
        res[key] = value;
        return res;
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const { brand } = this.state;

        console.log(brand)

        let brandJsonFormat = this.FormatNameToJson(brand);

        fetch('/api/add-brand-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(brandJsonFormat),
        }). then((response) => {
            log(response);
            if(response.ok) {
                response.json().then((working) => {
                    alert(`post successfully.${working.message}`)
                })   

                this.setState({
                    brand: ''
                })
                // modal shows brand name added successfully.
            } else {
                response.json().then((error) => {
                    alert(`Failed to add brand name: ${error.message}`);
                });
            }
        }).catch((error)=>{
            alert(`Failed in sending post data to the server: ${error.message}`);
        });
    }

    render() {
        return (
            <div className="modalContainer">
                This is CreateBrandLabel form. Create a label if you are not seeing it in the list.
                <form className="" onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="form-group">
                        <label className="">Brand Name</label>
                        <input value={this.state.brand} onChange={this.handleChange.bind(this)}></input>
                    </div>
                </form>
            </div>
        )
    }
}