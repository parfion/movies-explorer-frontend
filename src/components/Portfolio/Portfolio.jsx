import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio (params) {
  return(
    <div className='portfolio'>
      <div className='portfolio__content'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <div className='portfolio__links'>
          <Link className='portfolio__link' to={'https://github.com/parfion/how-to-learn'} target='_blank'>
            <p className='portfolio__link-text'>Статичный сайт</p>
            <p className='portfolio__link-img'>↗</p>
          </Link>
          <Link className='portfolio__link' to={'https://github.com/parfion/russian-travel'} target='_blank'>
            <p className='portfolio__link-text'>Адаптивный сайт</p>
            <p className='portfolio__link-img'>↗</p>
          </Link>
          <Link className='portfolio__link' to={'https://github.com/parfionalexander/react-mesto-auth'} target='_blank'>
            <p className='portfolio__link-text'>Одностраничное приложение</p>
            <p className='portfolio__link-img'>↗</p>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Portfolio;