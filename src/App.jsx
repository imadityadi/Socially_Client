import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'


import './App.css'
import Navbar from './components/Navbar'
import PostDetails from './screens/PostDetails'
import AuthScreen from './screens/AuthScreen'
import Home from './screens/Home'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <Router>
      <Navbar/>
    <Switch>
    <Route  path="/" exact component={() => <Redirect to="/posts" />} />
    <Route  path="/posts" exact component={Home} />
    <Route  path="/posts/search" exact component={Home} />
    <Route  path="/posts/:id" exact component={PostDetails} />
    <Route  path="/auth" exact component={() => user?.result?.name? <Redirect to="/posts"/> : <AuthScreen/> } />
    </Switch>
    </Router>
  )
}

export default App
