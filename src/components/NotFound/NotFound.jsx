import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';

function NotFound (params) {
  
  const navigate = useNavigate();

  return (
    <main>
      <section>
        <div className='not-found register'>
          <div className='register__content'>
            <h1 className='not-found__title'>404</h1>
            <p className='not-found__subtitle'>Страница не найдена</p>
            <Link className='not-found__link register__link' onClick={() => navigate(-1)}>Назад</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default NotFound;