import React from 'react'
import { useNote } from './NoteLayout';
import { Button, Card, Col, Row, Stack, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function Note() {
    const note = useNote();

    return (
        <>
            <Row className='align-items-center mb-3'>
                <Col className='align-items-center'>
                    <h1>{note.title}</h1>
                    <Stack gap={1} direction='horizontal' className='align-items-center flex-wrap'>
                        {note.tags.map(tag => (
                            <Badge key={tag.id} className='text-truncate'>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                </Col>
                <Col xs='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to={`/${note.id}/edit`}>
                            <Button type="button" variant='primary'>Edit</Button>
                        </Link>
                        <Button type="button" variant='outline-secondary text-danger'>Delete</Button>
                        <Link to='..'>
                            <Button type="button" variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}

export default Note