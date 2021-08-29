import React from 'react';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__img"
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Удалить"
        className="element__remove-btn btn"
      ></button>
      <div className="element__description">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-group">
          <button
            type="button"
            aria-label="Нравится"
            className="element__like-btn btn"
          ></button>
          <p className="element__like-counter">0</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
