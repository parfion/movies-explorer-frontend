import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio (params) {
  return(
    <section className='portfolio'>
      <div className='portfolio__content'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__links'>
          <li className='portfolio__link'><Link className='portfolio__link portfolio__link-text' to={'https://github.com/parfion/how-to-learn'} target='_blank'>
            <p className='portfolio__link-text'>Статичный сайт</p>
            <p className='portfolio__link-img'>↗</p>
          </Link></li>
          <li className='portfolio__link'><Link className='portfolio__link portfolio__link-text' to={'https://github.com/parfion/russian-travel'} target='_blank'>
            <p className='portfolio__link-text'>Адаптивный сайт</p>
            <p className='portfolio__link-img'>↗</p>
          </Link></li>
          <li className='portfolio__link'><Link className='portfolio__link portfolio__link-text' to={'https://github.com/parfionalexander/react-mesto-auth'} target='_blank'>
            <p className='portfolio__link-text'>Одностраничное приложение</p>
            <p className='portfolio__link-img'>↗</p>
          </Link></li>
        </ul>
      </div>
    </section>
  )
};

export default Portfolio;