import React, { Component } from 'react';
import Note from './components/Note';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.textInput.current.focus();
  }
  constructor(props){
    super(props);
    this.state = {
      noteText: '',
      notes: []
    }
    this.textInput = React.createRef(); //crating a ref so we can 'reference' it to '.focus' anywhere
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
    this.textInput.current.focus();
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
          ref={this.textInput}/>
      </div>
    );
  }
}

export default App;
