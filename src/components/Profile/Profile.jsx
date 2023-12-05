import { Link } from 'react-router-dom';
import './Profile.css';
import { useState } from 'react';

function Profile (params) {
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');

  const changeName = (e) => {
    setName(e.target.value)
  };

  const changeEmail = (e) => {
    setEmail(e.target.value)
  };

  return (
    <section className='profile'>
      <div className='profile__content'>
        <h2 className='profile__greet'>Привет, Виталий!</h2>
        <div className='profile__info'>
          <div className='profile__info-name'>
            <p className='profile__info-text'>Имя</p>
            <input className='profile__info-data' type='text' onChange={changeName} value={name || ''}></input>
          </div>
          <div className='profile__info-email'>
            <p className='profile__info-text'>E-mail</p>
            <input className='profile__info-data' type='text' onChange={changeEmail} value={email || ''}></input>
          </div>
        </div>
        <button className='profile__edit'>Редактировать</button>
        <Link className='profile__exit' to='#'>Выйти из аккаунта</Link>
      </div>
    </section>
  )
};

export default Profile;