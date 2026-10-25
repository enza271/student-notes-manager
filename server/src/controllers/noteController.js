const Note = require('../models/Note');

const createNote = async (req, res) => {
  try {
    const { title, subject, content } = req.body;

    if (!title || !subject || !content) {
      return res.status(400).json({
        message: 'Title, subject, and content are required',
      });
    }

    const newNote = await Note.create({
      title: title.trim(),
      subject: subject.trim(),
      content: content.trim(),
    });

    return res.status(201).json({
      message: 'Note created successfully',
      note: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create note',
      error: error.message,
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch notes',
      error: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subject, content } = req.body;

    if (!title || !subject || !content) {
      return res.status(400).json({
        message: 'Title, subject, and content are required',
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        subject: subject.trim(),
        content: content.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    return res.status(200).json({
      message: 'Note updated successfully',
      note: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update note',
      error: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    return res.status(200).json({
      message: 'Note deleted successfully',
      note: deletedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete note',
      error: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
