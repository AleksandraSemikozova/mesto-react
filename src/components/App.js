import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);

    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name="popup-profile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <label className="popup__input-label">
              <input
                type="text"
                id="name-item"
                className="popup__item popup__item_type_user-name"
                name="username"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="popup__item-error name-item-error"></span>
            </label>

            <label className="popup__input-label">
              <input
                type="text"
                id="user-job"
                className="popup__item popup__item_type_user-job"
                name="job"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="popup__item-error user-job-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="popup-add-img"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <label className="popup__input-label">
              <input
                type="text"
                id="img-name"
                className="popup__item popup__item_type_img-name"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="popup__item-error img-name-error"></span>
            </label>

            <label className="popup__input-label">
              <input
                type="url"
                id="img-link"
                className="popup__item popup__item_type_img-link"
                name="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__item-error img-link-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="popup-update-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <label className="popup__input-label">
              <input
                type="url"
                id="avatar-link"
                className="popup__item popup__item_type_avatar-link"
                name="link"
                placeholder="Ссылка на аватар"
                required
              />
              <span className="popup__item-error avatar-link-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          title="Вы уверены?"
          name="popup-delete-img"
          buttonText="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>

      {/* <section className="popup popup_content_addimg">
        <div className="popup__container">
          <button
            type="button"
            aria-label="Закрыть"
            className="popup__close-icon btn"
          ></button>
          <form
            action="#"
            name="popup-add-img"
            className="popup__form popup__form_img"
            novalidate
          >
            <h2 className="popup__title">Новое место</h2>
            
            <button
              type="submit"
              aria-label="Сохранить изменения"
              className="popup__btn btn"
            >
              Создать
            </button>
          </form>
        </div>
  </section> */}

      {/* <section className="popup popup_content_delete-img">
        <div className="popup__container">
          <button
            type="button"
            aria-label="Закрыть"
            className="popup__close-icon btn"
          ></button>

          <form
            action="#"
            name="popup-delete-img"
            className="popup__form popup__form_delete-img"
            novalidate
          >
            <h2 className="popup__title">Вы уверены?</h2>
            <button
              type="submit"
              aria-label="Удалить"
              className="popup__btn btn"
            >
              Да
            </button>
          </form>
        </div>
      </section> */}

      {/* <section className="popup popup_content_update-avatar">
        <div className="popup__container">
          <button
            type="button"
            aria-label="Закрыть"
            className="popup__close-icon btn"
          ></button>
          <form
            action="#"
            name="popup-update-avatar"
            className="popup__form popup__form_update-avatar"
            novalidate
          >
            <h2 className="popup__title">Обновить аватар</h2>
            
            <button
              type="submit"
              aria-label="Сохранить изменения"
              className="popup__btn btn"
            >
              Сохранить
            </button>
          </form>
        </div>
      </section> */}
    </div>
  );
}

export default App;
