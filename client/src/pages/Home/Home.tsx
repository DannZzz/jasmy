import { useState } from 'react'
import BesanSpan from '../../shared/BesanSpan/BesanSpan'
import { Button, Input } from 'antd'
import { BsInstagram } from 'react-icons/bs'
import './Home.scss'
import { useAppDispatch } from '../../app/hooks'
import { setIG } from '../../features/auth/auth'
import { useNavigate } from 'react-router-dom'
import checkUsername from '../../utils/checkUsername'

const Home = () => {
  const [instaUsername, setInstaUsername] = useState<string>('')
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  function handleMagicSignup() {
    if (instaUsername !== '') {
      dispatch(setIG(instaUsername))
      navigate('/g/auth')
    }
  }

  return (
    <div className="home">
      <div className="first-text">
        <BesanSpan>Create your page</BesanSpan>
        <BesanSpan>Share products you love </BesanSpan>
        <BesanSpan>For Free</BesanSpan>
      </div>
      <div className="magic-signup">
        <Input
          value={instaUsername}
          style={{ fontSize: 30 }}
          allowClear
          onChange={(e) => {
            if (e.target.value === '' || checkUsername(e.target.value))
              setInstaUsername(e.target.value)
          }}
          prefix={
            <>
              <BsInstagram /> <span>@</span>
            </>
          }
          placeholder="username"
        />
        <Button onClick={handleMagicSignup} type="primary" size="large">
          <BesanSpan>Magic Sign up</BesanSpan>
        </Button>
      </div>
    </div>
  )
}

export default Home
