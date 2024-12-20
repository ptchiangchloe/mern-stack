import React from 'react';
import PropTypes from 'prop-types';

export default class DateInput extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: '',
            focused: false,
            valid: true,
        };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        const { value } = this.props;
        if (newProps.value !== value) {
            this.setState({
                value: this.editFormat(newProps.value),
            });
        }
    }

    onFocus() {
        this.setState({ focused: true });
    }

    onBlur(e) {
        const value = this.unformat(this.state.value);
        const valid = this.state.value === '' || value != null;
        if (valid !== this.state.valid && this.props.onValidityChange) {
            this.props.onValidityChange(e, valid);
        }
        this.setState({ focused: false, valid });
        if (valid) this.onChange(e, value);
    }

    onChange(e) {
        if (e.target.value.match(/^[\d-]*$/)) {
            this.setState({
                value: e.target.value,
            });
        }
    }

    displayFormat(date) {
        if (date === '') return '';
        if (date != null) {
            return date.toUTCString().substr(0, 17);
        }
        return '';
    }

    editFormat(date) {
        return (date != null) ? date.toISOString().substr(0, 10) : '';
    }

    unformat(str) {
        const val = new Date(str);
        return isNaN(val.getTime()) ? null : val;
    }

    render() {
        const className = (!this.state.valid && !this.state.focused) ? 'invalid' : null;
        const value = (this.state.focused || !this.state.valid) ? this.state.value : this.displayFormat(this.props.value);
        return (
            <input
                type="text"
                size={this.props.size}
                name={this.props.name}
                className={className}
                value={value}
                // placeholder={this.state.focused ? 'yyyy-mm-dd' : null}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
            />
        );
    }
}

DateInput.propTypes = {
    size: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onValidityChange: PropTypes.func,
    name: PropTypes.string.isRequired,
};

DateInput.defaultProps = {
    size: 40,
};
