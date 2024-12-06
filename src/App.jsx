import React, { useState, useEffect } from 'react';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Load notes from Chrome storage
    chrome.storage.sync.get('notes', (result) => {
      if (result.notes) setNotes(result.notes);
    });
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return;
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setNewNote('');
    saveNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const saveNotes = (updatedNotes) => {
    chrome.storage.sync.set({ notes: updatedNotes });
  };

  const exportNotes = () => {
    const blob = new Blob([notes.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'notes.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>LIKHO</h2>
      <textarea
        placeholder="Write your note here..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <div>
        <button onClick={addNote}>Add Note</button>
        <button onClick={exportNotes}>Export Notes</button>
      </div>
      <div>
        {notes.map((note, index) => (
          <Note key={index} note={note} onDelete={() => deleteNote(index)} />
        ))}
      </div>
    </div>
  );
};

export default App;
