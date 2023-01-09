import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import BesanSpan from '../../shared/BesanSpan/BesanSpan'
import LogoText from '../../shared/LogoText/LogoText'
import { SocialIcon } from 'react-social-icons'
import './Navigator.scss'

const Navigator = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <div className="navigator" style={{ background: `${theme.background}BF` }}>
      <LogoText onClick={() => navigate('/')} className="logo" size={30} />
      <Space wrap>
        <Button onClick={() => navigate('/g/auth')} type="primary" size="large">
          <BesanSpan>Log In</BesanSpan>
        </Button>
      </Space>
    </div>
  )
}

export default Navigator
