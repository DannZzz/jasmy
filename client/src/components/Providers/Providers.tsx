import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { GOOGLE_CLIENT_ID } from '../../config'

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default Providers
