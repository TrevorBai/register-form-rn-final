import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../store/actions/index'
import axios from 'axios'

const WelcomePage = props => {

  const newUser = useSelector(state => state.newUser)

  const dispatch = useDispatch()
  const onRegisterUserInit = () => dispatch(userActions.registerUserInit())

  useEffect(() => {
    onRegisterUserInit()
  }, [onRegisterUserInit])

  return (
    <View style={{ 'marginTop': 20, 'textAlign': 'center' }}>
      <Text>Dear {newUser.name},{"\n"}{"\n"}Welcome to Union Strategies. You will receive our latest news at {newUser.email}, please check it regularly.{"\n"}{"\n"}Welcome again!</Text>
      <View style={{ alignItems: 'center' }}>
        <Image source={{ uri: newUser.imageUri }} style={{ width: 200, height: 200, marginVertical: 30 }} />
      </View>
      <View style={{ 'marginTop': 20 }}> 
        <Button
          title="Home"
          onPress={() => props.history.replace('/')}
        />
      </View>
    </View>
  )
}

export default WelcomePage