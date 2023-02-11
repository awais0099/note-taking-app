import React from 'react'
import { Note, Tag } from '../App'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom';

type NoteLayoutProps = {
    notes: Note[]
}

function NoteLayout({notes}: NoteLayoutProps) {
    const {id} = useParams();
    const note = notes.find(note => note.id === id);
    
    if (note == null) return <Navigate to="/" replace /> 
    return (
        <>
            <Outlet context={note} />
        </>
    )
}

function useNote() {
    return useOutletContext<Note>()
}
export {NoteLayout, useNote}