import React from 'react'
import './homepage.css'
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const navigate = useNavigate();

    const goToYouMadeContact = () => {
        //ללכת למלוי טוםס שאלון 
        navigate(`/signup`);

    }
    return (
        <div className='homepage'>
            <h2  className='overture'>מתכננים לקחת משכנתא?</h2>
            <h2 className='overture'>מאל תעשו את זה בלי ייעוץ מקצועי! </h2>
            <h3 className='mumble-of-the-opening'> משכנתא היא השקעה גדולה, ולכן חשוב לקחת את ההחלטה בצורה מושכלת.
                אנחנו כאן כדי לעזור לכם להבין את האפשרויות, להתמקד בצרכים שלכם, ולמצוא את המשכנתא המתאימה ביותר. </h3>
            <h4 className='Homepage-button-mumble'> אל תתלבט! לחץ עכשו על הכפתור הייעוץ ואנו נחזור אליך . </h4>
            <button className='Homepage-button' onClick={goToYouMadeContact}> חזרו אליי
            </button>

            {/* <div className='Vector'> 
            <img className='VectorImg'
            src='./Vector.png'
            alt=''>  </img>

            <div className='BlueBackground'> </div>
            <div className='YellowBackground'> </div>

 </div> */}

<div className='Vector'> 
    <img className='VectorImg' src='./Vector.png' alt='' />
    <div className='BlueBackground'></div>
    <div className='YellowBackground'></div>
</div>
        </div>
    )
}

export default Homepage