import React, { useState, useEffect, useCallback } from 'react'
import { View, TextInput, StyleSheet, Button, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../store/actions/index'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

const RegForm = props => {

  const [username, setUsername] = useState('')

  const [email, setEmail] = useState('')

  const [registerable, setRegisterable] = useState(false)
  const [image, setImage] = useState(null)

  const loading = useSelector(state => state.loading)

  const registered = useSelector(state => state.registered)
  const dispatch = useDispatch()
  const onRegisterUser = (formData) => dispatch(userActions.registerUser(formData))

  const updateRegisterableHandler = useCallback(() => {
    if (username && email && image) setRegisterable(true)
  }, [username, email, image])

  useEffect(() => {
    getPermissionAsync(),
    updateRegisterableHandler(),
    registeredRedirect(registered)
  }, [getPermissionAsync, updateRegisterableHandler, registeredRedirect, registered])

  const onChangeUsernameHandler = username => {
    setUsername(username)
  }

  const onChangeEmailHandler = email => {
    setEmail(email)
  }

  const registerUserHandler = async () => {
    const formData = {
      name: username,
      email,
      imageUri: image
    }
    onRegisterUser(formData)
  }

  const registeredRedirect = (registered) => {
    if (registered) {
      props.history.push('/welcome')
    }
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Your Name"
        style={styles.input}
        onChangeText={onChangeUsernameHandler}
        value={username}
      />
      <TextInput
        placeholder="Your Email"
        onChangeText={onChangeEmailHandler}
        style={styles.input}
        value={email}
      />
      <View style={styles.upload}>
        <Button
          title="Pick an image from camera roll"
          onPress={_pickImage}
        />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      </View>
      <View style={styles.button}>
        <Button
          title="Register"
          onPress={registerUserHandler}
          disabled={!registerable}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  upload: { 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '60%',
    marginVertical: 20,
  },
  button: {
    width: '70%',
    marginTop: 20
  }
})

export default RegForm