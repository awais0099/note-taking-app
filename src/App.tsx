import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NewNote from './components/NewNote';
import { FormEvent, useMemo } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';

export type Tag = {
  id: string,
  label: string,
}

export type RawNoteData = {
  title: string,
  markdown: string,
  tagsId: string[] 
}

export type RawNote = {
  id: string,
} & RawNoteData;

export type Note = {
  id: string,
} & NoteData;

export type NoteData = {title: string, markdown: string, tags: Tag[]}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);



  const notesWithTags = useMemo(() => {
    return notes.map(note => {
       return {...note, tags: tags.filter(tag => note.tagsId.includes(tag.id))}
    })
  }, [notes, tags]);

  function onCreateNote({ tags, ...data}: NoteData) {
    console.log('on create from app file');
    setNotes((prevNotes) => {
      return [...prevNotes, {id: uuidV4(), ...data, tagsId: tags.map(tag => tag.id)}]
    })
  }

  function onAddTag(data: Tag) {
    console.log('add tag from app file');
    console.log({data});
    setTags((prevTags) => {
      return [...prevTags, data]
    })
  }


  return (
    <Container className="App">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route
          path="/new"
          element={<NewNote onSubmit={onCreateNote} onAddTag={onAddTag} tags={tags} />}
         />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
