import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__remove-btn ${
    isOwn ? 'element__remove-btn' : 'element__remove-btn_hidden'
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked ? '`element__like-btn_active' : ''
  }`;

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
