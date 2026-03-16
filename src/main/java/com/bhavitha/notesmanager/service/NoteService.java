package com.bhavitha.notesmanager.service;

import com.bhavitha.notesmanager.model.Note;
import com.bhavitha.notesmanager.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository repo;

    public NoteService(NoteRepository repo) {
        this.repo = repo;
    }

    public List<Note> getAllNotes() {
        return repo.findAll();
    }

    public Note saveNote(Note note) {
        return repo.save(note);
    }

    public void deleteNote(Long id) {
        repo.deleteById(id);
    }
}
