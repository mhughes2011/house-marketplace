import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {toast} from 'react-toastify'

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

function SignIn() {
  const [showPass, setShowPass] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
      // e.target.id allows you to have the form automatically update whichever id for input you want as long as it matches the formData state label
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
  
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
  
      if(userCredentials.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad User Creds')
    }

  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} />

            <div className="passwordInputDiv">
              <input type={showPass ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />

              <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPass((prevState) => !prevState)} />
            </div>

            <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>

            <div className="signInBar">
              <p className="signInText">
                Sign In
              </p>
              <button className="signInButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* Google OAuth Component */}

          <Link to='/sign-up' className='registerLink'>
            Don't Have an Account? Create One!
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignIn