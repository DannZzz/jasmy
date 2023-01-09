import {
  Divider,
  Drawer,
  Input,
  Space,
  message,
  Upload,
  Button,
  Avatar,
} from 'antd'
import { useEffect, useReducer, useState } from 'react'
import type { UploadProps } from 'antd'
import Themed from '../../shared/Themed/Themed'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { RiCheckFill, RiCloseLine, RiEditBoxFill } from 'react-icons/ri'
import { TiArrowLeftThick } from 'react-icons/ti'
import useTheme from '../../hooks/useTheme'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNavigationBar } from '../../features/theme/theme'
import { useNavigate } from 'react-router-dom'
import { selectAuth } from '../../features/auth/auth'
import checkUsername from '../../utils/checkUsername'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload/interface'
import './Edit.scss'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const Edit = () => {
  const dispatch = useAppDispatch()
  const { username, avatarUrl } = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const theme = useTheme()
  const [color, setColor] = useState<string>('#ffffff')
  const [background, setBackground] = useState<string>('#000000')
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const [tempUsername, setTempUsername] = useState<string>(username || '')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(avatarUrl)

  useEffect(() => {
    dispatch(setNavigationBar(false))
  }, [])

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  function setColors(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'text') {
      setColor(e.target.value)
    } else {
      setBackground(e.target.value)
    }
  }
  return (
    <div style={{ color, background }} className="edit">
      <TiArrowLeftThick
        style={{ color: `darken(${color}, 50%)` }}
        onClick={() => {
          dispatch(setNavigationBar(true))
          navigate('/')
        }}
        className="back-button"
        size={50}
      />
      <RiEditBoxFill
        style={{ color: `darken(${color}, 50%)` }}
        onClick={() => setShowDrawer(true)}
        display={showDrawer ? 'none' : ''}
        className="edit-toggle"
        size={40}
      />
      <Drawer
        closeIcon={
          <RiCloseLine
            style={theme}
            size={30}
            className="drawer-close-button"
          />
        }
        style={theme}
        placement="left"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <Themed
          element={
            <Space
              size={20}
              align="center"
              direction="vertical"
              className="editing"
            >
              <div className="container">
                <span className="title">Username</span>
                <div className="input">
                  <Input
                    minLength={4}
                    maxLength={16}
                    value={tempUsername}
                    placeholder="username"
                    onChange={(e) => {
                      const text = e.target.value
                      if (text === '' || checkUsername(text))
                        setTempUsername(text)
                    }}
                  />
                </div>
              </div>
              <Divider />
              <div className="container">
                <span className="title">Image</span>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  customRequest={({ onSuccess }) => {
                    onSuccess('ok')
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <Divider />

              <div className="container">
                <span className="title">Colors</span>
                <div className="colors">
                  <div className="color-item background">
                    <span>Background</span>
                    <input
                      name="background"
                      type="color"
                      value={background}
                      onChange={setColors}
                    />
                  </div>
                  <div className="color-item text">
                    <span>Text</span>
                    <input
                      name="text"
                      value={color}
                      type="color"
                      onChange={setColors}
                    />
                  </div>
                </div>
              </div>
            </Space>
          }
        />
      </Drawer>
      <Space align="center" direction="vertical">
        <Avatar src={imageUrl} size={110} />
        <h3>{tempUsername}</h3>
        <div className="social-buttons"></div>
      </Space>
    </div>
  )
}

export default Edit
