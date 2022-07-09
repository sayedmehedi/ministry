import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Underline = ({width}) => {
  return (
    <LinearGradient
    colors={['#11998E', '#0077B6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      style={{
       height:2,
       width:width,
      }}/>
    
  )
}

export default Underline