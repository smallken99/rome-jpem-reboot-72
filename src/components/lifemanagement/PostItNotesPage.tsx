import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react'; // Icon for remove button

interface NoteItem {
  id: number;
  text: string;
  color: string; // Hex color string
}

const predefinedColors = [
  '#FFFFE0', // Light Yellow
  '#E0FFFF', // Light Cyan
  '#FFE0E0', // Light Pink
  '#E0FFE0', // Light Green
  '#F0E6FF', // Light Purple
];

const PostItNotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [newNoteColor, setNewNoteColor] = useState<string>(predefinedColors[0]);

  const addNote = () => {
    if (newNoteText.trim() === '') return;
    const newNote: NoteItem = {
      id: Date.now(), // Simple ID generation
      text: newNoteText,
      color: newNoteColor,
    };
    setNotes([...notes, newNote]);
    setNewNoteText('');
    // Optionally reset color or keep the selected one for the next note
    // setNewNoteColor(predefinedColors[0]);
  };

  const updateNoteText = (id: number, text: string) => {
    setNotes(
      notes.map(note => (note.id === id ? { ...note, text } : note))
    );
  };

  const removeNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center font-cinzel text-rome-terracotta">便利貼 (Post-it Notes)</h1>

      <div className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Add New Note</h2>
        <Textarea
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Write your note here..."
          className="mb-4 h-32 border-gray-300 dark:border-gray-600 focus:border-rome-terracotta dark:focus:border-rome-terracotta"
        />
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="noteColor" className="text-sm font-medium text-gray-700 dark:text-gray-300">Color:</label>
          <div className="flex gap-2">
            {predefinedColors.map(color => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full border-2 ${newNoteColor === color ? 'border-rome-terracotta ring-2 ring-rome-terracotta' : 'border-gray-300 dark:border-gray-600'}`}
                style={{ backgroundColor: color }}
                onClick={() => setNewNoteColor(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
          {/* Fallback or custom color input if needed:
          <Input
            type="color"
            id="noteColor"
            value={newNoteColor}
            onChange={(e) => setNewNoteColor(e.target.value)}
            className="w-24 h-10 p-1 border-gray-300 dark:border-gray-600"
          /> */}
        </div>
        <Button onClick={addNote} className="w-full bg-rome-terracotta hover:bg-rome-terracotta/90">
          Add Note
        </Button>
      </div>

      {notes.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">No notes yet. Add some!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map(note => (
          <div
            key={note.id}
            className="p-4 rounded-lg shadow-lg flex flex-col h-64" // Fixed height for notes
            style={{ backgroundColor: note.color }}
          >
            <Textarea
              value={note.text}
              onChange={(e) => updateNoteText(note.id, e.target.value)}
              className="flex-grow bg-transparent border-none resize-none focus:ring-0 p-2 text-gray-800 placeholder-gray-600"
              placeholder="Your note..."
            />
            <div className="mt-2 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeNote(note.id)}
                className="text-gray-600 hover:text-red-600 hover:bg-black/10 dark:hover:bg-white/10"
                aria-label="Remove note"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostItNotesPage;
