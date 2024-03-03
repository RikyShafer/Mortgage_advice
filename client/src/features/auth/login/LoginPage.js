
import "./login-page.css"
import { useLoginMutation } from '../authApiSlice'
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { WiDirectionLeft } from "react-icons/wi"

const LoginPage = () => {
  const [login, { error, data, isSuccess }] = useLoginMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      console.log("token", data);
      
      navigate("/")
    }
  }, [isSuccess, data, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const userObject = Object.fromEntries(data.entries())
    console.log(userObject);

    login(userObject)
  }


  return (
    <div className="login-page">
      <div className="login-page-form-img">
        <form onSubmit={handleSubmit} className="login-page-form">
          <h2 className='login-page-form-h2'> להתחברות אנה הכנס את הפרטים שלך...</h2>

          <div className='login-page-form-firstName'>
            <h3 className='login-page-form-h3' >שם פרטי</h3>
            <input
              type='text'
              required
              name='firstName'
              placeholder='הקלידו כאן... ' />
          </div>



          <div className='login-page-form-email'>
            <h3 className='login-page-form-h3'> כתובת מייל </h3>
            <input
              type='email'
              name='email'
              placeholder='הקלידו כאן...' />
          </div>

          <div className='login-page-form-password'>
            <h3 className='login-page-form-h3'>  סיסמא</h3>
            <input
              type='password'
              required
              name='password'
              placeholder='הקלידו כאן...' />
          </div>
          <button type='submit'>  אני רוצה להיכנס {<WiDirectionLeft />}</button>
          <Link to="/signup" className="login-page-form-button">
            אין לך חשבון {<WiDirectionLeft />}
          </Link>
          {error && error.data?.message}
        </form>
        <img className='login-page-img' src='./user.png' alt='' />
      </div>
    </div>)
}

export default LoginPage
