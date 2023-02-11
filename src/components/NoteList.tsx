import React, { useState } from 'react'
import { Button, Card, Col, Row, Stack } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { Note, Tag } from '../App';
import style from './NoteList.module.css';
import Badge from 'react-bootstrap/esm/Badge';

type simplifiedNote = {
    id: string,
    title: string,
    tags: Tag[],
}

type NoteListProps = {
    availableTags: Tag[],
    notes: simplifiedNote[],
}

function NoteList({ availableTags, notes }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');

    const filteredNotes = notes && notes.filter((note) => {
        return (
            (note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 || selectedTags.every(tag => {
                return note.tags.some(notetag => notetag.id === tag.id);
            }))
        )
    });


    console.log({filteredNotes});

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col><h1>Note</h1></Col>
                <Col xs='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to="/new">
                            <Button type="button" variant='primary'>Create</Button>
                        </Link>
                        <Button type="button" variant='outline-secondary'>Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className='mb-4'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                isMulti
                                options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}
                                onChange={(selectOptions) => {
                                    setSelectedTags(
                                        selectOptions.map(option => {
                                            return { id: option.value, label: option.label }
                                        })
                                    )
                                }}
                                value={selectedTags.map(tag => ({ label: tag.label, value: tag.id }))}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

function NoteCard({id, title, tags}: simplifiedNote) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${style.card}`}>
            <Card.Body>
                <Stack gap={1} className='align-items-center justify-content-center'>
                    <span className='fs-5'>{title}</span>
                    <Stack gap={1} direction='horizontal' className='justify-content-center align-items-center flex-wrap'>
                        {tags.map(tag => (
                            <Badge key={tag.id} className='text-truncate'>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    );
}

export default NoteList