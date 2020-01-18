import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter, Switch, Route } from 'react-router-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import RegForm from './components/RegForm'
import WelcomePage from './components/WelcomePage'
import userReducer from './store/reducers/user'

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose

const store = createStore(
  userReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const App = () => {
  return (
    <Provider store={store}>
      <NativeRouter> 
        <View style={styles.screen}>
          <Switch>
            <Route path="/" exact component={RegForm} />
            <Route path="/welcome" component={WelcomePage} />
          </Switch>
        </View>
      </NativeRouter>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
})
