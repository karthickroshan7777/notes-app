const express = require("express");
const Note = require("../models/note");

const router = express.Router();

// Create Note
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = new Note({
            title,
            content
        });

        const savedNote = await note.save();

        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// Get All Notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// Get Single Note
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// Update Note
router.put("/:id", async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// Delete Note
router.delete("/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;