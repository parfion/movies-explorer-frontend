import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound (params) {
  return (
    <section>
      <div className='not-found register'>
        <div className='register__content'>
          <h2 className='not-found__title'>404</h2>
          <p className='not-found__subtitle'>Страница не найдена</p>
          <Link className='not-found__link register__link' to='#'>Назад</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound;