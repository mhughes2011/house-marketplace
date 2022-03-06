import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'

function SignUp() {
  const [showPass, setShowPass] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const {email, password, name} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
      // e.target.id allows you to have the form automatically update whichever id for input you want as long as it matches the formData state label
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      // This creates a copy of the form data because you don't want to change the state of the app
      const formDataCopy = {...formData}
      // This deletes the password from the form data copy for security reasons.  You can't store passwords in databases
      delete formDataCopy.password
      // Below adds the timestamp to the record in the database
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      console.log(error)
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
            <input type="text" className='nameInput' placeholder='Name' id='name' value={name} onChange={onChange} />
            <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} />

            <div className="passwordInputDiv">
              <input type={showPass ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />

              <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPass((prevState) => !prevState)} />
            </div>

            <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>

            <div className="signUpBar">
              <p className="signUpText">
                Create Account!
              </p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* Google OAuth Component */}

          <Link to='/sign-in' className='registerLink'>
            Already a User? Sign In Instead!
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp