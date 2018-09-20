import React, { Component } from 'react';
import Note from './components/Note';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      noteText: '',
      notes: []
    }
  }
  updateNoteText(event) {
    this.setState({noteText: event.target.value})
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.addNote();
    }
  }
  addNote() {
    if (this.state.noteText === ''){return}
    let notesArr = this.state.notes;
    notesArr.push(this.state.noteText);
    this.setState({noteText: ''});
    this.textInput.focus();
  }
  deleteNote(index) {
    let notesArr = this.state.notes;
    notesArr.splice(index, 1);
    this.setState({notes: notesArr});
  }
  render() {
    let notes = this.state.notes.map((v,k) => {
      return <Note key={k} text={v}
                deleteMethod={() => this.deleteNote(k)}/>
    })
    return (
      <div className="container">
        <div className="header">React Todo App</div>
        {notes}
        <div className="btn" onClick={this.addNote.bind(this)}>+</div>
        <input type="text" className="text-input" 
          value={this.state.noteText}
          onChange={noteText => this.updateNoteText(noteText)}
          onKeyPress={this.handleKeyPress.bind(this)}
          ref={((input) => {this.textInput = input})}/>
      </div>
    );
  }
}

export default App;
