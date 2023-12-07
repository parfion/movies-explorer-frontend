import './AboutProject.css'

function AboutProject(params) {
  return(
    <section className="about-project">
      <div className="about-project__content">
        <h2 className="about-project__title">О проекте</h2>
        <div className='about-project__block'>
          <div>
            <h3 className='about-project__description'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__description-info'>Составление плана, работу над бэкендом, 
            вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div>
            <h3 className='about-project__description'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__description-info'>У каждого этапа был мягкий и жёсткий дедлайн, 
            которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='about-project__timetable'>
          <div className='about-project__backend'>
            <h4 className='about-project__backend-time'>1 неделя</h4>
            <p className='about-project__timetable-title'>Back-end</p>
          </div>
          <div className='about-project__frontend'>
            <h4 className='about-project__frontend-time'>4 недели</h4>
            <p className='about-project__timetable-title'>Front-end</p>
          </div>
        </div>
      </div>
    </section>
  )
};

export default AboutProject;