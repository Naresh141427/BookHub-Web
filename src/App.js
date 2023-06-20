import {Route, Switch} from 'react-router-dom'

import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Shelf from './components/Shelf'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import BookItemDetails from './components/BookItemDetails'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Shelf} />
    <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
