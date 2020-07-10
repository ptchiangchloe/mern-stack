import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';

export default class IssueEdit extends React.Component { // eslint-disable-line
    render() {
        const { match } = this.props;
        return (
            <div>
                <div>
                    {`This is a placeholder for editing issue ${match.params.id}.`}
                </div>
                <Link to="/issues">Back to issue list</Link>
            </div>
        );
    }
}

IssueEdit.propTypes = {
    match: shape({
        params: shape({
            id: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
