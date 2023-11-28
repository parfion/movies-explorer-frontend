import './Techs.css';

function Techs(params) {
  return(
    <div className="techs">
      <div className="techs__content">
        <h2 className="techs__title">Технологии</h2>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <p className='techs__info'>На курсе веб-разработки мы освоили технологии, 
        которые применили в дипломном проекте.</p>
        <div className='techs__used'>
          <div className='techs__used-container'>
            <p className='techs__used-name'>HTML</p>
          </div>
          <div className='techs__used-container'>
            <p className='techs__used-name'>CSS</p>
          </div>
          <div className='techs__used-container'>
            <p className='techs__used-name'>JS</p>
          </div>
          <div className='techs__used-container'>
            <p className='techs__used-name'>React</p>
          </div>
          <div className='techs__used-container'>
            <p className='techs__used-name'>Git</p>
          </div>
          <div className='techs__used-container'>
            <p className='techs__used-name'>Express.js</p>
          </div>
          <div className='techs__used-container'>
            <p className='techs__used-name'>mongoDB</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Techs;