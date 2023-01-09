import { Avatar, Dropdown, MenuProps, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout, selectAuth } from '../../features/auth/auth'
import useTheme from '../../hooks/useTheme'
import { BiLogOut } from 'react-icons/bi'
import { FcEditImage } from 'react-icons/fc'
import LogoText from '../../shared/LogoText/LogoText'
import './Navigator.scss'

const NavigatorAuth = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const auth = useAppSelector(selectAuth)

  const items: MenuProps['items'] = [
    {
      onClick: () => {
        dispatch(logout())
        navigate('/')
      },
      icon: <BiLogOut size={20} />,
      label: 'Log out',
      key: 'logout',
    },
  ]

  return (
    <div className="navigator" style={{ background: `${theme.background}BF` }}>
      <LogoText onClick={() => navigate('/')} className="logo" size={30} />

      <Space wrap size={30}>
        <Space
          onClick={() => navigate('/g/edit')}
          className="nav-item"
          align="center"
          direction="vertical"
        >
          <FcEditImage size={50} />
          <span className="sans-serif">Edit Page</span>
        </Space>

        <Dropdown menu={{ items }} trigger={['click']}>
          <Space className="nav-item" align="center" direction="vertical">
            {auth.avatarUrl && <Avatar src={auth.avatarUrl} size={50} />}
            <span className="sans-serif">{auth.username}</span>
          </Space>
        </Dropdown>
      </Space>
    </div>
  )
}

export default NavigatorAuth
