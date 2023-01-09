import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {
  GoogleLoginButton,
  InstagramLoginButton,
} from 'react-social-login-buttons'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchGoogleProfileFromStorage } from '../../features/auth/auth'
import BesanSpan from '../../shared/BesanSpan/BesanSpan'
import './Auth.scss'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const instaUsername = useAppSelector((state) => state.auth.instaUsername)

  const loginGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      localStorage.setItem('GOOGLE_TRY', credentialResponse.access_token)
      dispatch(
        fetchGoogleProfileFromStorage({
          cb: () => navigate('/'),
          username: instaUsername,
        })
      )
    },
  })

  return (
    <div className="auth">
      <div className="auth-container">
        <BesanSpan style={{ fontSize: 25 }}>Log in for free</BesanSpan>
        <div className="social-buttons">
          <GoogleLoginButton onClick={() => loginGoogle()} />
          <InstagramLoginButton />
        </div>
      </div>
    </div>
  )
}

export default Auth
