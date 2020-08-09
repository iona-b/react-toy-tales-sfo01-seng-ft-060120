import React, { Component } from 'react';

class ToyCard extends Component {

  render() {

    let {id, name, likes, image} = this.props.toy

    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button
          className="like-btn"
          onClick={(event) => this.props.likeToy(id, event)}
        >
          Like {'<3'}
        </button>
        <button
          className="del-btn"
          onClick={(event) => this.props.donateToGoodWill(id, event)}
        >
          Donate to GoodWill
        </button>
      </div>
    );
  }

}

export default ToyCard;
