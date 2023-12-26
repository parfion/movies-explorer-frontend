/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Preloader from '../Preloader/Preloader';

function Profile ({ editUser, logout, messageEditUser, isLoading }) {
  
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [edit, setEdit] = useState(false);
  const [formValid, setFormValid] = useState(false);

  // валидация
  const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

  const isEmailValid = ({email}) => {
    return Boolean(emailRegex.test(email));
  };

  const isNameValid = ({name}) => {
      return Boolean(typeof name === 'string' && name.length >= 2);
  };

  const validateForm = ({name, email}) => {
      const isEmail = isEmailValid({email});
      const isName = isNameValid({name})
      return Boolean(isEmail && isName);
  };

  useEffect(() => {
    const isFormValid = Boolean(validateForm({name, email}));
    setFormValid(isFormValid);
  }, [name, email]);

  const disabledSubmit = validateForm({name, email}) && (name !== currentUser.name || email !== currentUser.email);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    editUser({name, email});
    setEdit(false);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  return (
    <main>
      <form className='profile' onSubmit={handleEditUser}>
      {!currentUser.name ? <Preloader /> : 
        <div className='profile__content'>
          <h1 className='profile__greet'>Привет, {currentUser.name}!</h1>
          <div className='profile__info'>
            <div className='profile__info-name'>
              <p className='profile__info-text'>Имя</p>
              <input 
                className='profile__info-data' 
                type='text' 
                onChange={changeName} 
                value={name || ''} 
                minLength={2} 
                maxLength={80}
                required 
                disabled={isLoading}
              />
            </div>
            <div className='profile__info-email'>
              <p className='profile__info-text'>E-mail</p>
              <input 
                className='profile__info-data' 
                type='email' 
                onChange={changeEmail} 
                value={email || ''} 
                minLength={6}
                maxLength={80} 
                required 
                disabled={isLoading}
              />
            </div>
            <span className='register__form-error profile__measage'>{messageEditUser}</span>
          </div>
          
          <button className='profile__edit' onClick={handleEdit} disabled={!disabledSubmit || isLoading}>Редактировать</button>
          <Link className='profile__exit' to='/' onClick={handleLogout}>Выйти из аккаунта</Link>
        </div>}
      </form>
    </main>
  )
};

export default Profile;