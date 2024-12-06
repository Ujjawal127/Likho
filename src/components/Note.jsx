import React from 'react';

const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <span>{note}</span>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Note;
