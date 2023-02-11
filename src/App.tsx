import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NewNote from './components/NewNote';
import { FormEvent, useMemo } from 'react';
import {useLocalStorage} from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';
import NoteList from './components/NoteList';
import { NoteLayout } from './components/NoteLayout';
import Note from './components/Note';
import EditNote from './components/EditNote';


export type Tag = {
  id: string,
  label: string,
}


export type Note = {
  id: string,
} & NoteData;

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type RawNote = {
  id: string,
} & RawNoteData;

export type RawNoteData = {
  title: string,
  markdown: string,
  tagsId: string[] 
}


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
    console.log("create note",tags);
    setNotes((prevNotes) => {
      return [...prevNotes, {id: uuidV4(), ...data, tagsId: tags.map(tag => tag.id)}]
    })
  }

  function onAddTag(data: Tag) {
    console.log('add tag from app file');
    // console.log({data});
    setTags((prevTags) => {
      return [...prevTags, data]
    })
  }

  function onUpdate(id: string, {tags, ...data}: NoteData) {
    console.log('update');
    const NoteIndex = notes.findIndex((note) => note.id === id);
    const update = notes[NoteIndex];
    console.log({data})
    update.title = data.title;
    update.markdown = data.markdown;
    update.tagsId = tags.map(tag => tag.id)
    notes[NoteIndex] = update;
    setNotes([...notes]);
  }

  console.log({tags});

  return (
    <Container className="App">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTags} />} />
        <Route
          path="/new"
          element={<NewNote onSubmit={onCreateNote} onAddTag={onAddTag} tags={tags} />}
         />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote onSubmit={onUpdate} onAddTag={onAddTag} tags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
