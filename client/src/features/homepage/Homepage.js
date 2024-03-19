import React from 'react';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();

    const goToYouMadeContact = () => {
        navigate(`/signup`);
    };

    return (
        <div className='homepage'>
            <div className='blue-background'>
                <div className='from-blue-moment'>
                    <h2 className='overture1'>מתכננים לקחת משכנתא?</h2>
                    <h2 className='overture1'>אל תעשו את זה בלי ייעוץ מקצועי! </h2>
                    <h3 className='mumble-of-the-opening'> משכנתא היא השקעה גדולה, ולכן חשוב לקחת את ההחלטה בצורה מושכלת.
                        אנחנו כאן כדי לעזור לכם להבין את האפשרויות, להתמקד בצרכים שלכם, ולמצוא את המשכנתא המתאימה ביותר. </h3>
                    <h4 className='Homepage-button-mumble'> אל תתלבט! לחץ עכשו על הכפתור הייעוץ ואנו נחזור אליך . </h4>
                    <button className='Homepage-button' onClick={goToYouMadeContact}> חזרו אליי
                    </button>
                </div>

                <div className='Vector'>
                    <div className='VectorOrange'></div>
                    <div className='BlueBackground'></div>
                    <img className='VectorImg' src='./Vector1.jpg' alt='' />
                </div>
            </div>

            <div className='White-background'>
                <h2 className='overture2'> מהו תהליך ייעוץ משכנתא?  </h2>
                <div className='from-white-moment'>
                    <h4 className='mumble-of-the-opening'> פגישת היכרות </h4>
                    <h5 className='Homepage-button-mumble'>יועץ המשכנתאות יכיר אתכם ואת צרכים הפיננסיים שלכם.  </h5>
                    <h4 className='mumble-of-the-opening'> מחקר ובדיקת אופציות </h4>
                    <h5 className='Homepage-button-mumble'>תאספו את כל המסמכים הנדרשים לצורך הגשת בקשה למשכנתא. יועץ המשכנתאות יבחן עבורכם על האופציות המתאימות בעזרת מערכת מתקדמת ויגיש בשמכם בקשה למשכנתא לבנקים שונים.
                        לאחר קבלת אישור, יועץ המשכנתאות יסביר לכם את תנאי ההלוואות. </h5>
                    <h4 className='mumble-of-the-opening'> בחירת הצעה למשכנתא</h4>
                    <h5 className='Homepage-button-mumble'>בחירת הצעה למשכנתא
                        לאחר הבהרת כל הסעיפים אנו נמליץ לכם על תוכנית המשכנתא המשתלמת ביותר עבורכם, לאחר הבחירה הסופית אתם תחתמו על הסכם משכנתא עם הבנק.
                        כמובן שנלווה אתכם לאורך כל התהליך. </h5>
                    <button className='Homepage-button' onClick={goToYouMadeContact}> חזרו אליי
                    </button>
                </div>
            </div>
            <svg width="100%" height="858" viewBox="0 0 1917 858" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M480.5 0L1917 195V858H0V195L480.5 0Z" fill="#F0B918" fillOpacity="0.4"/>
            </svg>
        </div>
    );
};

export default Homepage;

// import React from 'react'
// import './homepage.css'
// import { useNavigate } from 'react-router-dom';

// const Homepage = () => {

//     const navigate = useNavigate();

//     const goToYouMadeContact = () => {
//         //ללכת למלוי טוםס שאלון 
//         navigate(`/signup`);

//     }
//     return (
//         <div className='homepage'>
//             <div className='blue-background'>
//                 <div className='from-blue-moment'>
//                     <h2 className='overture1'>מתכננים לקחת משכנתא?</h2>
//                     <h2 className='overture1'>מאל תעשו את זה בלי ייעוץ מקצועי! </h2>
//                     <h3 className='mumble-of-the-opening'> משכנתא היא השקעה גדולה, ולכן חשוב לקחת את ההחלטה בצורה מושכלת.
//                         אנחנו כאן כדי לעזור לכם להבין את האפשרויות, להתמקד בצרכים שלכם, ולמצוא את המשכנתא המתאימה ביותר. </h3>
//                     <h4 className='Homepage-button-mumble'> אל תתלבט! לחץ עכשו על הכפתור הייעוץ ואנו נחזור אליך . </h4>
//                     <button className='Homepage-button' onClick={goToYouMadeContact}> חזרו אליי
//                     </button>
//                 </div>



//                 <div className='Vector'>
//                 <div className='VectorOrange'></div>
//                 <div className='BlueBackground'></div>
//                     <img className='VectorImg' src='./Vector.png' alt='Vector Image' />

//                 </div>
//             </div>



//             <div className='White-background'>
//                 <h2 className='overture2'> מהו תהליך ייעוץ משכנתא?  </h2>
//                 <div className='from-white-moment'>
//                     <h4 className='mumble-of-the-opening'> פגישת היכרות </h4>
//                     <h5 className='Homepage-button-mumble'>יועץ המשכנתאות יכיר אתכם ואת צרכים הפיננסיים שלכם.  </h5>
//                     <h4 className='mumble-of-the-opening'> מחקר ובדיקת אופציות </h4>
//                     <h5 className='Homepage-button-mumble'>תאספו את כל המסמכים הנדרשים לצורך הגשת בקשה למשכנתא. יועץ המשכנתאות יבחן עבורכם על האופציות המתאימות בעזרת מערכת מתקדמת ויגיש בשמכם בקשה למשכנתא לבנקים שונים.
//                         לאחר קבלת אישור, יועץ המשכנתאות יסביר לכם את תנאי ההלוואות. </h5>
//                     <h4 className='mumble-of-the-opening'> בחירת הצעה למשכנתא</h4>
//                     <h5 className='Homepage-button-mumble'>בחירת הצעה למשכנתא
//                         לאחר הבהרת כל הסעיפים אנו נמליץ לכם על תוכנית המשכנתא המשתלמת ביותר עבורכם, לאחר הבחירה הסופית אתם תחתמו על הסכם משכנתא עם הבנק.
//                         כמובן שנלווה אתכם לאורך כל התהליך. </h5>
//                     <button className='Homepage-button' onClick={goToYouMadeContact}> חזרו אליי
//                     </button>
//                 </div>
//             </div>
//             <svg width="100%" height="858" viewBox="0 0 1917 858" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M480.5 0L1917 195V858H0V195L480.5 0Z" fill="#F0B918" fill-opacity="0.4"/>
// </svg>
//             {/* <div className='o-background'>

//             </div> */}
//         </div>
//     )
// }

// export default Homepage