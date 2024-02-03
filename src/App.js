import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import Courses from './components/Courses'
import CourseItem from './components/CourseItem'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Courses} />
    <Route exact path="/courses/:id" component={CourseItem} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
