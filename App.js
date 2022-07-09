import 'react-native-gesture-handler'
import React from 'react'
import Navigators from './src/navigators'
import AuthProvider from './src/providers/AuthProvider'



const App = () => {
  return (
    <AuthProvider>
      <Navigators/>
    </AuthProvider>
  )
}

export default App