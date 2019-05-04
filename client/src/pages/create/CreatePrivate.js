import React from 'react';
import './create.css';

export default class CreatePrivate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      roomCode: 0,
      roomName: "",
      playerName: "",
      readyToSubmit: false
    };

    let socket=io.connect('http://localhost:8080');
    socket.on('connection',() => {
      socket.emit('create-private-room', (message) => {
        this.setState({roomCode: message});
      })
    })

    socket.disconnect();
    
  }
  //STORES ROOM NAME AND PLAYER NAME IN STATE
  handleRoomChange(e){
    this.setState({roomName: e.target.value});
  }
  handleNameChange(e){
    this.setState({playerName: e.target.value});
  }
  submitForm () {
    this.setState({readyToSubmit: true});
  }

  render(){
    return(
      this.state.readyToSubmit 
      ? <WaitingPrivate roomCode={this.state.roomCode} socket={this.socket} roomName = {this.state.roomName} playerName = {this.state.playerName}/>
      : <Form style={{width: '100%'}}>
          <Form.Label>Room Name</Form.Label>
          <Form.Control placeholder="Enter a room name" onChange={this.handleRoomChange.bind(this)}/>
          <Form.Label>Player Name</Form.Label>
          <Form.Control placeholder="Enter your player name" onChange={this.handleNameChange.bind(this)}/>
        </Form>
        <Button onClick={this.submitForm.bind(this)}>Submit</Button>
    )
  }
}