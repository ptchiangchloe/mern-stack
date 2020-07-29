import React from 'react';
import PropTypes from 'prop-types';

export default class NumInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
        };
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prevProp) {
        if(prevProp.value !== this.props.value) {
            this.setState({
                value: this.props.value,
            });
        }
    }

    onBlur(e) {
        console.log(typeof this.state.value);
        this.props.onChange(e, this.unformat(this.state.value));
    }

    onChange(e) {
        console.log(typeof e.target.value);
        if (e.target.value.match(/^\d*$/)) {
            this.setState({
                value: e.target.value,
            });
        }
    }

    unformat(str) {
        const val = parseInt(str, 10);
        return isNaN(val) ? null : val;
    }

    render() {
        return (
            <input
                type="text"
                {...this.props}
                value={this.state.value}
                onBlur={this.onBlur}
                onChange={this.onChange}
            />
        );
    }
}

NumInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};
