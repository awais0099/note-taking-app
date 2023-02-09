import NoteForm from "./NoteForm";
import { NoteData } from "../App";

type NewNotePropsType = {
	onSubmit: (data: NoteData) => void
}

function NewNote({onSubmit}: NewNotePropsType) {
	return (
		<>
			<h1>NewNote</h1>
			<NoteForm onSubmit={onSubmit} />
		</>
	)
}

export default NewNote;