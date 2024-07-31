import React, { useEffect } from 'react';
import './contact-us.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogoWhatsapp, BiMap } from 'react-icons/bi';
import { HiMail } from 'react-icons/hi';
import { useContactMutation } from '../contact/contactApiSlice';

const ContactUs = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=7673297@gmail.com&su=Contact%20Us&body=Hello,%20I%20would%20like%20to%20inquire%20about...`
    const phoneNumber = '0522279392';
    const message = 'Hello, I would like to inquire about...'; // Replace with your message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const [addUser, { isError, error, isSuccess, isLoading }] = useContactMutation();
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            navigate("/messageContact");
        }
    }, [isSuccess, navigate]);
    // בתוך הקומפוננטה שלך
useEffect(() => {
    // דוגמה: התאמת עיצוב או ביצוע פעולות נוספות לאחר טעינת הדף
    document.querySelector('.contact-us').style.opacity = 1;
}, []);
    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userObject = Object.fromEntries(formData.entries());
        console.log(userObject);
        addUser(userObject);
    };
    if (isLoading)
        return <h1>Loading...</h1>;
    if (isError)
        return <h1>Error: {JSON.stringify(error)}</h1>;
    return (
        <div className='contact-us'>
            {/* <div className='contact-us-img+text'> */}
            <img
                className='contact-us-img'
                src='./businessman.jpg'
                alt='Businessman'
            />
            <h2 className='contact-us-text'>
                יצירת קשר
            </h2>
            {/* </div> */}

            <div className='contact-us2'>
                <div className='contact-us-text-page'>
                    <h1 className='contact-us-title'> דברו איתנו </h1>
                    <h3 className='contact-us-title1'> מוזמנים ליצור איתנו קשר</h3>


                    <div className='contact-info-row1'>
                        <div className='contact-info-wrapper1'>
                            <div className='contact-info1'>
                                <h1 className='contact-us-address1'>
                                    <BiMap /> כתבתינו:
                                    <NavLink to={"https://www.google.com/maps/place/%D7%9E%D7%A1%D7%99%D7%9C%D7%AA+%D7%99%D7%95%D7%A1%D7%A3+9,+%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F+%D7%A2%D7%99%D7%9C%D7%99%D7%AA%E2%80%AD/@31.9301613,35.0467891,17z/data=!3m1!4b1!4m6!3m5!1s0x1502d2a18aec3c71:0xcece53b5cc888d90!8m2!3d31.9301613!4d35.0442195!16s%2Fg%2F12hr4dw8h?hl=iw&entry=ttu"} target="_blank">  מסילת יוסף 9</NavLink>
                                </h1>
                                <h1 className='contact-us-contactus11'>
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                        <BiLogoWhatsapp /> 0522279392
                                    </a>

                                </h1>
                            </div>
                            <h1 className='contact-us-contactus-mail1'>
                                <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
                                    <HiMail /> 7673297@gmail.com
                                </a>
                            </h1>
                        </div>
                    </div>

                </div>

                <div className='contact-us-text-contact'>
                    <form onSubmit={formSubmit} className='contact-us-register-form'>
                        <h2 className='contact-us-register-h2'> אני רוצה שיחזרו אליי            </h2>
                        <div className='div-register-contact-us'>
                            <div className='contact-us-register-form-firstName'>
                                <h3 className='contact-us-register-h3'>שם פרטי</h3>
                                <input className='contact-us-register-form-input'
                                    type='text'
                                    required
                                    name='name'
                                    placeholder='הקלידו כאן...' />
                            </div>
                            <div className='contact-us-register-form-phone'>
                                <h3 className='contact-us-register-h3'>מספר טלפון</h3>
                                <input className='contact-us-register-form-input'
                                    type='text'
                                    name='phone'
                                    placeholder='הקלידו כאן...' />
                            </div>


                            <div className='contact-us-register-form-email'>
                                <h3 className='contact-us-register-h3'>כתובת מייל</h3>
                                <input className='contact-us-register-form-input'
                                    type='email'
                                    name='email'
                                    placeholder='הקלידו כאן...' />
                            </div>
                            <div className='contact-us-register-form-anotherQuestion'>
                                <h3 className='contact-us-register-h3'>הודעה</h3>
                                <textarea className='contact-us-register-form-input-anotherQuestion'
                                    type='text'
                                    name='message'
                                    placeholder='ההודעה שלי...' />
                            </div>
                        </div>
                        <button className='contact-us-button' type='submit'>קדימה תנו לי הצעה     </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
