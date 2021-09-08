import React from 'react';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
        setCurrentUser(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

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

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
