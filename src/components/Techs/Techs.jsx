import './Techs.css';

function Techs(params) {
  
  return(
    <main>
      <section className="techs">
        <div className="techs__content">
          <h2 className="techs__title">Технологии</h2>
          <h3 className='techs__subtitle'>7 технологий</h3>
          <p className='techs__info'>На курсе веб-разработки мы освоили технологии, 
          которые применили в дипломном проекте.</p>
          <ul className='techs__used'>
            <li className='techs__used-container'>
              <p className='techs__used-name'>HTML</p>
            </li>
            <li className='techs__used-container'>
              <p className='techs__used-name'>CSS</p>
            </li>
            <li className='techs__used-container'>
              <p className='techs__used-name'>JS</p>
            </li>
            <li className='techs__used-container'>
              <p className='techs__used-name'>React</p>
            </li>
            <li className='techs__used-container'>
              <p className='techs__used-name'>Git</p>
            </li>
            <li className='techs__used-container'>
              <p className='techs__used-name'>Express.js</p>
            </li>
            <li className='techs__used-container'>
              <p className='techs__used-name'>mongoDB</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
};

export default Techs;