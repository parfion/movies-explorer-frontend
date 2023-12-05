import './Footer.css';
import { Link } from 'react-router-dom';

function Footer (params) {
  return(
    <footer className='footer'>
      <div className='footer__content'>
        <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className='footer__info'>
          <p className='footer__year'>&copy; 2023</p>
          <div className='footer__links'>
            <Link className='footer__link' to={'https://practicum.yandex.ru/'} target='_blank'>Яндекс.Практикум</Link>
            <Link className='footer__link' to={'https://github.com/parfion'} target='_blank'>Github</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;