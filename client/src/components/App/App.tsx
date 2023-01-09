import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Themed from '../../shared/Themed/Themed'
import Navigator from '../Navigator/Navigator'
import { ConfigProvider } from 'antd'
import './App.scss'
import useTheme from '../../hooks/useTheme'
import { ClipLoader } from 'react-spinners'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchGoogleProfileFromStorage,
  selectAuth,
} from '../../features/auth/auth'
import NavigatorAuth from '../Navigator/NavigatorAuth'

const Home = React.lazy(() => import('../../pages/Home/Home'))
const Auth = React.lazy(() => import('../../pages/Auth/Auth'))

const Edit = React.lazy(() => import('../../pages/Edit/Edit'))
function App() {
  const theme = useTheme()
  const showNavigation = useAppSelector((state) => state.theme.showNavigation)
  const dispatch = useAppDispatch()
  const { authorizated } = useAppSelector(selectAuth)
  const [loading, setLoading] = useState<boolean>(true)

  // useGoogleOneTapLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  // })

  const Protected = ({ children }) => {
    if (!authorizated) return <Navigate to="/g/auth/" />
    return children
  }

  useEffect(() => {
    dispatch(
      fetchGoogleProfileFromStorage({
        cb: () => {
          setLoading(false)
        },
      })
    )

    // setTimeout(() => {
    //   setLoading(false)
    // }, 5000)
  }, [])

  if (loading)
    return (
      <Themed
        element={
          <div className="loader">
            <ClipLoader
              color={theme.color}
              speedMultiplier={0.5}
              size={'8em'}
            />
          </div>
        }
      />
    )

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.componentPrimaryColor,
          colorTextLightSolid: theme.color,
          colorPrimaryHover: theme.colorHover,
          colorPrimaryActive: theme.componentPrimaryColor,
          colorText: theme.color,
          colorBgContainer: theme.componentPrimaryColor,
          colorBgBase: theme.componentPrimaryColor,
          // colorPrimaryBorder: theme.componentPrimaryColor,
        },
      }}
    >
      <Themed
        element={
          <div className="App">
            <BrowserRouter>
              {showNavigation &&
                (authorizated ? <NavigatorAuth /> : <Navigator />)}
              <Routes>
                <Route
                  path="/"
                  element={
                    <Suspense>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="/g/auth"
                  element={
                    <Suspense>
                      <Auth />
                    </Suspense>
                  }
                />
                <Route
                  path="/g/edit"
                  element={
                    <Suspense>
                      <Protected>{<Edit />}</Protected>
                    </Suspense>
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>
        }
      />
    </ConfigProvider>
  )
}

export default App
