import { useState, useEffect } from 'react'
import BoardsPage from "./components/Boards/BoardsPage"
import NotesPage from './components/Notes/NotesPage'
import AuthPage from './components/Auth/AuthPage'
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

function App() {
  const [route, setRoute] = useState(localStorage.getItem('profile'))

  useEffect(() => {
    const data = localStorage.getItem('profile')
    setRoute(data)
  }, [])

  return (
    <>
      {
        route ?
          <Router history={history}>
            <Switch Switch >
              <Route path="/boards" exact>
                <BoardsPage />
              </Route>
              <Route path="/boards/:id">
                <NotesPage />
              </Route>
              <Redirect to="/boards" />
            </Switch >
          </Router >
          :
          <Router history={history}>
            <Switch Switch >
              <Route path="/auth" exact>
                <AuthPage />
              </Route>
              <Redirect to="/auth" />
            </Switch >
          </Router >
      }
    </>
  );
}

export default App;
