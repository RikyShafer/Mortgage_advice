import React, { useEffect, useState } from 'react';
import './about.css';
import ContactAdd from '../contact/registeration/ContactAdd';

const About = () => {
    const [satisfiedCustomers, setSatisfiedCustomers] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            // Update the state by calling setSatisfiedCustomers with the new value
            setSatisfiedCustomers(prevCount => {
                if (prevCount === 100) {
                    clearInterval(interval); // Clear interval if count reaches 100
                    return prevCount;
                } else {
                    return prevCount + 1; // Increment by 1 if count < 100
                }
            });
        }, 70); // Adjust the interval duration (milliseconds) as needed

        // Clear the interval when component unmounts or when useEffect runs again
        return () => clearInterval(interval);
    }, []);

    
    const scrollToOurStory = () => {
        const ourStoryDiv = document.querySelector('.Our-story');
        ourStoryDiv.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="about">
            <div className='businesspersonContainer'>
                <div className="businesspersonImgContainer">
                    <img className='businesspersonImg' src='./businessperson2.jpg' alt='' />
                </div>
                <div className="triangleMask">אז מי אנחנו?</div>
                <button className='read-more' onClick={scrollToOurStory} >
                    <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >

                        <circle cx="20" cy="20" r="18" stroke="#000000" stroke-width="1" />

                        <svg x="7" y="7" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 25.6562C6.02131 25.6562 0.34375 19.9787 0.34375 13C0.34375 6.02131 6.02131 0.34375 13 0.34375C19.9787 0.34375 25.6562 6.02131 25.6562 13C25.6562 14.0124 25.5355 15.0211 25.2974 15.998C25.2399 16.2338 25.0022 16.3784 24.7664 16.3209C24.5307 16.2635 24.3861 16.0257 24.4435 15.7899C24.665 14.881 24.7773 13.9424 24.7773 13C24.7773 6.50594 19.4941 1.22266 13 1.22266C6.50594 1.22266 1.22266 6.50594 1.22266 13C1.22266 19.4941 6.50594 24.7773 13 24.7773C17.7 24.7773 21.9453 21.9839 23.8156 17.6607C23.912 17.4379 24.1707 17.3355 24.3934 17.4319C24.6162 17.5282 24.7186 17.7869 24.6222 18.0096C22.6128 22.6548 18.0507 25.6562 13 25.6562Z" fill="#000000" />
                        </svg>

                        <svg x="11" y="13" width="18" height="15" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.2349 0.307674C15.0005 0.179959 14.7266 0.1901 14.5023 0.33483L7.80772 4.6539L1.12045 0.123784C0.899901 -0.0256194 0.616734 -0.0408621 0.381465 0.083951C0.146165 0.208764 0 0.451762 0 0.718097V5.60212C0 6.32754 0.358555 7.0035 0.959131 7.41035L7.67613 11.9606C7.71489 11.9868 7.75974 12 7.80464 12C7.8478 12 7.89099 11.9878 7.92884 11.9634L14.6092 7.6535C15.2354 7.2495 15.6093 6.56342 15.6093 5.81824V0.938032C15.6093 0.671055 15.4693 0.435419 15.2349 0.307674ZM15.1511 5.81824C15.1511 6.40708 14.8557 6.94925 14.3608 7.2685L7.80772 11.4963L1.21612 7.03103C0.741517 6.70952 0.458198 6.17539 0.458198 5.60215V0.718097C0.458198 0.620287 0.50976 0.534543 0.596177 0.488723C0.635123 0.468043 0.67685 0.45781 0.718332 0.45781C0.768826 0.45781 0.819014 0.473022 0.863459 0.503141L7.67613 5.1182C7.75216 5.1697 7.85165 5.1708 7.92881 5.12104L14.7507 0.719838C14.8318 0.667481 14.9308 0.663785 15.0157 0.710033C15.1005 0.756219 15.1511 0.841474 15.1511 0.938032V5.81824Z" fill="#000000" />
                            <path d="M1.20627 3.23047C1.07975 3.23047 0.977173 3.33304 0.977173 3.45957V5.66176C0.977173 5.78828 1.07975 5.89086 1.20627 5.89086C1.3328 5.89086 1.43537 5.78828 1.43537 5.66176V3.45957C1.43537 3.33304 1.3328 3.23047 1.20627 3.23047Z" fill="#000000" />
                            <path d="M1.20627 1.46289C1.07975 1.46289 0.977173 1.56547 0.977173 1.69199V2.49228C0.977173 2.6188 1.07975 2.72138 1.20627 2.72138C1.3328 2.72138 1.43537 2.6188 1.43537 2.49228V1.69199C1.43537 1.56544 1.3328 1.46289 1.20627 1.46289Z" fill="#000000" />
                            <path d="M11.1008 3.80907L10.4225 4.24665C10.3162 4.31525 10.2856 4.45702 10.3542 4.56335C10.3981 4.63126 10.4717 4.66828 10.547 4.66828C10.5895 4.66828 10.6326 4.65643 10.671 4.63165L11.3492 4.19407C11.4555 4.12547 11.4861 3.9837 11.4175 3.87737C11.3489 3.77107 11.2071 3.74049 11.1008 3.80907Z" fill="#000000" />
                            <path d="M13.831 2.04833L11.8342 3.33663C11.7279 3.40524 11.6973 3.54704 11.7659 3.65334C11.8097 3.72124 11.8834 3.75827 11.9586 3.75827C12.0011 3.75827 12.0442 3.74641 12.0826 3.72164L14.0794 2.43334C14.1857 2.36473 14.2163 2.22294 14.1477 2.11663C14.0791 2.0103 13.9373 1.97975 13.831 2.04833Z" fill="#000000" />
                        </svg>
                    </svg>

                </button>
            </div>
            <div className='Our-story'>
    <div className='Our-story1'>
        הסיפור שלנו
    </div>
    <div className='Our-story2'>
        <p>
            המשרד שלנו הוקם מתוך רצון לסייע לאנשים להגשים את החלום של רכישת דירה בתנאים הטובים ביותר. 
            לאחר שנים של עבודה בתחום הפיננסי והיכרות עמוקה עם שוק המשכנתאות, הבנו שיש צורך בגישה אישית, 
            מקצועית וממוקדת לקוח – וכך נולד המשרד.
        </p>
    </div>
    <div className='Our-story3'>
        <p>
            מאז פתיחתנו, ליווינו בהצלחה עשרות לקוחות בתהליך המשכנתא, תוך מתן ייעוץ המותאם באופן אישי לצרכים של כל אחד ואחת. 
            אנו מאמינים שלקוחותינו זכאים לשירות הטוב ביותר, ולכן אנו מחויבים להיות תמיד זמינים, 
            לעדכן ולהכווין כל לקוח בכל שלב בתהליך.
        </p>
    </div>
</div>
            <div className='Why-choose-us'>
                <div className='Why-choose-us1'>
                    למה כדאי לבחור  דווקא בנו?
                </div>
                <div className='Why-choose-us2'>
                    <p>    לקיחת משכנתא היא עסקה מורכבת, גדולה ומלאה בסיכונים. ישנם עשרות מסלולים שונים, תנאים, ריביות, אותיות קטנות – קל ללכת לאיבוד ולהגיע להחלטות שגויות שיעלו לכם ביוקר לאורך שנים רבות.
                    </p>
                    <p> כאן אני נכנס לתמונה. כיועץ משכנתאות מוסמך בעל ניסיון רב, אני כאן כדי להקל עליכם את התהליך, לחסוך לכם זמן, כסף ועוגמת נפש.
                    </p>
                    <p>אני אעזור לכם להבין את כל האפשרויות העומדות בפניכם, לבחור את מסלול המשכנתא המתאים ביותר לצרכים ולתנאים האישיים שלכם, ולנהל משא ומתן מול הבנקים כדי להשיג עבורכם את התנאים הטובים ביותר.
                    </p>
                    <p> אני זמין עבורכם לכל שאלה ובכל שלב בתהליך, ותמיד אשים את הצרכים שלכם בראש סדר העדיפויות.
                    </p>
                    <p>עם ידע נרחב, ניסיון רב ומקצועיות ללא פשרות, אני אעזור לכם להפוך את תהליך לקיחת המשכנתא לחוויה נעימה וקלה, שתוביל אתכם לעתיד כלכלי יציב ובטוח.
                    </p>

                    <h1 >
                        אל תתפשרו על פחות מהטוב ביותר – צרו קשר עוד היום ותתחילו את התהליך בדרך הנכונה!</h1>
                </div>
            </div>
            <div className='Satisfied-customers' id='satisfiedCustomers'>
                {satisfiedCustomers}    לקוחות מרוצים
            </div>
            <div className='we-are-working'>
                <h1> אנחנו עובדים עם כל הבנקים</h1>
                <img className='we-are-workingImg' src='./Rectangle 109.png' alt='' />
                <img className='we-are-workingImg' src='./Rectangle 110.png' alt='' />
                <img className='we-are-workingImg' src='./Rectangle 111.png' alt='' />
                <img className='we-are-workingImg' src='./Rectangle 112.png' alt='' />
                <img className='we-are-workingImg' src='./Rectangle 113.png' alt='' />
                <img className='we-are-workingImg' src='./Rectangle 114.png' alt='' />

                <button className='Homepage-button-White' onClick={openModal}> אני רוצה ליצור קשר
                </button>
            
                    {showModal && <ContactAdd onClose={closeModal} />}
            </div>
        </div>
    );
};

export default About;
