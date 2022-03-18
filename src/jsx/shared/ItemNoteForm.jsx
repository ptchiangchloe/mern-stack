import React from 'react';

export const ItemNoteForm = (props) => {
    const { note, handleChange } = props;
    return (
        <div className="form-group">
            <label htmlFor="category-select">Note</label>
            <textarea 
                className="form-control" 
                type="text" 
                name="note" 
                value={note} 
                onChange={handleChange} 
                rows="3"
            />
        </div>
    )
}