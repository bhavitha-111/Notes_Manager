package com.bhavitha.notesmanager.repository;

import com.bhavitha.notesmanager.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

}
