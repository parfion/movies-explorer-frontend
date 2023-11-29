import './AboutMe.css';
import { Link } from 'react-router-dom';
import photo from '../../images/photo.png'

function AboutMe(params) {
  return(
    <div className='about-me'>
      <div className='about-me__content'>
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__block'>
          <div className='about-me__info'>
            <div>
              <h2 className='about-me__info-title'>Александр</h2>
              <h3 className='about-me__info-subtitle'>Фронтенд-разработчик, 31 год</h3>
              <p className='about-me__info-bio'>Я живу в Ростове-на-Дону, имею высшее инженерное образование. 
              Увлекаюсь кинематографом и путешествиями. После окончания курса по веб-разработке, планирую и дальше
              развиваться в этой сфере.</p>
            </div>
            <Link className="about-me__link" to={'https://github.com/parfion'} target='_blank'>Github</Link>
          </div>
          <img className='about-me__photo' alt='Фото' src={photo} />
        </div>
      </div>
    </div>
  )
};

export default AboutMe;