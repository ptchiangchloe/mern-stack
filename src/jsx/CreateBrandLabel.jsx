import React from 'react';
import debug from 'debug';
const log = debug('app:CreateBrandLabel');
import '../scss/CreateBrandLabel.scss';


export default class CreateBrandLabel extends React.Component {
    state = {
        brand: ''
    }

    handleChange(event) {
        this.setState({
            brand: event.target.value
        })
    }

    // Turn string into title cased. 
    toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
    }

    FormatNameToJsonFromat(brandName) {
        let res = {};
        let key = brandName.toLowerCase();
        let value = this.toTitleCase(brandName);
        res["brand-name"] = value;
        return res;
    }

    componentDidUpdate() {
        console.log('createBrandLabel component updates.')
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const { brand } = this.state;

        console.log(brand)

        let brandJsonFormat = this.FormatNameToJsonFromat(brand);

        console.log(brandJsonFormat)

        fetch('/api/add_brand', {
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
            console.log(error.message)
            alert(`Failed in sending post data to the server: ${error.message}`);
        });
    }

    render() {
        return (
            <div className="modal-container create-brand-modal">
                <div>
                    <button 
                        className="btn btn-primary" 
                        type="button" 
                        data-toggle="modal" 
                        data-target="#create-brand"
                    >
                        Create a new brand label 
                    </button>
                </div>
                <div className="modal fade" tabIndex="-1" role="dialog" id="create-brand">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create a new brand label</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="" onSubmit={this.handleFormSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label className="brand-name-label">Brand Name</label>
                                        <input value={this.state.brand} onChange={this.handleChange.bind(this)}></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}