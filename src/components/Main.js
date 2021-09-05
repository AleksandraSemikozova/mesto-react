import React from 'react';
import { useEffect } from 'react';
import api from '../utils/api.js';
// import profileAvatar from '../images/profile-avatar.jpg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick }) {
  //   const { onEditAvatar, onAddPlace, onEditProfile, onCardClick } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((element) => element !== card);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={`${currentUser.avatar}`}
            alt="Аватар профиля"
          />
          <div onClick={onEditAvatar} className="profile__avatar-edit"></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать профиль"
            className="profile__edit-btn btn"
          ></button>
          <p className="profile__subtitle">{currentUser.about} </p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить картинку"
          className="profile__add-btn btn"
        ></button>
      </section>

      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
