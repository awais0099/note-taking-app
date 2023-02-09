import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NewNote from './components/NewNote';
import { FormEvent } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage';

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

  function onCreateNote(data: NoteData) {
    console.log('on create from app file');
    console.log(data);
  }

  return (
    <Container className="App">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} />} />
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
