import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: data
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (event) => {
    event.preventDefault()

    let newToy = [{
        name: event.target[0].value,
        image: event.target[1].value,
        likes: 0
    }]

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type':'application:json',
        'Accept':'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
    
    let updatedToys = [...this.state.toys, newToy]

    this.setState ({
      toys: updatedToys
    })
  }

  donateToGoodWill = (id, event) => {

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())

    let updatedToys = this.state.toys.filter ((toy) =>
      toy.id !== id
    )

    this.setState ({
      toys: updatedToys
    })

  }

  likeToy = (id, event) => {

    let toy = this.state.toys.filter ((toy) =>
      toy.id === id
    )

    let data = {
      likes: toy[0].likes + 1
    }
    
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application:json',
        'Accept':'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())

    let updatedToys = this.state.toys.map ((toy) => {
      if (toy.id === id) {
        toy.likes +=1
        return toy
      } else {
        return toy
      }
    })

    this.setState ({
      toys: updatedToys
    })

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateToGoodWill={this.donateToGoodWill} likeToy={this.likeToy}/>
      </>
    );
  }

}

export default App;
