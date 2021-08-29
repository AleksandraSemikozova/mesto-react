import React from 'react';
import { useEffect } from 'react';
import api from '../utils/api.js';
// import profileAvatar from '../images/profile-avatar.jpg';
import Card from './Card.js';

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick }) {
  //   const { onEditAvatar, onAddPlace, onEditProfile, onCardClick } = props;

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [cards, setCards] = React.useState([]);

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
            src={userAvatar}
            alt="Аватар профиля"
          />
          <div onClick={onEditAvatar} className="profile__avatar-edit"></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать профиль"
            className="profile__edit-btn btn"
          ></button>
          <p className="profile__subtitle">{userDescription} </p>
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
