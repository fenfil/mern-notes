import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Container, ListGroupItemText, Button, Row, Col, ModalHeader, ModalBody, Modal, Form, FormGroup, Label, Input } from 'reactstrap';

export default class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      modal: false
    };
  }

  componentDidMount() {
    fetch('/api/notes')
      .then(res => res.json())
      .then(notes => {
        console.log(notes);
        this.setState({notes: notes});
      })
      .catch(err => console.log(err));
  }

  toggle = () => {
    this.setState({modal: !this.state.modal});
  }

  hideItem(_id) {
    this.setState(old => {
      const newState = {...old};
      newState.notes.find(e => e._id === _id).classes = 'hide-note';
      return newState;
    });

    setTimeout((() => {
      console.log(this);
      this.setState({
        notes: this.state.notes.filter(item => item._id !== _id),
      });
    }), 200);
  }

  showItem(note) {
    note.classes = 'show-note';
    this.setState({
      notes: this.state.notes.concat(note),
      modal: !this.state.modal
    });
  }

  removeNote = _id => {
    fetch(`/api/notes/${_id}`, { method: 'DELETE' })
      .then(res => {console.log(res); return res.json();})
      .then(res => {
        if (res.success === true) {
          this.hideItem(_id);
        } else {
          console.log('happened error while deleting');
        }
      })
      .catch(err => console.log(err));
  }

  addNote = () => {
    let body = document.getElementById('body');
    if (body.value) {
      let newNote = {
        body: body.value
      };

      fetch(`/api/notes`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote)
      })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        if (res.success === true) {
          this.showItem(res.note)
          body.value = '';
        } else {
          console.log('happened error while adding');
        }
      })
      .catch(err => console.log(err));
    } else {
      alert('no empty required');
    }
  }

  render() {
    const { notes, modal} = this.state;
    notes.forEach(e => {
      if (!e.classes) {
        e.classes = ''
      }
    });
    return (
      <Container>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader>Add new Note</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Body</Label>
                <Input id="body"/>
              </FormGroup>
              <Button onClick={this.addNote}>Add</Button>
            </Form>
          </ModalBody>
        </Modal>

        <ListGroup flush className="notes-list">
          {notes.map(note =>
            <ListGroupItem key={note._id} className={note.classes}>
              <Row>
                <Col sm="11">
                  <ListGroupItemText>{note.body}</ListGroupItemText>
                </Col>
                <Col sm="1" className="justify-content-center align-items-center d-flex flex-column">
                  <Button outline color="secondary" size="sm" onClick={this.removeNote.bind(this, note._id)}>&times;</Button>
                </Col>
              </Row>
            </ListGroupItem>
          )}
        </ListGroup>
        <Button className="mt-3" onClick={this.toggle}>Add note</Button>
      </Container>
    );
  }
}