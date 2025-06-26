import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './component/Nav'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AllRecipes from './pages/AllRecipe'
import AddRecipe from './pages/Addrecepie'
import PrivateRoute from './pages/PrivateRoute'
import RecipeDetails from './pages/RecipeDetails'
import EditRecipe from './pages/EditRecipe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/recipes' element={<PrivateRoute>
            <AllRecipes/>
          </PrivateRoute>}></Route>
          <Route path='/add' element={<PrivateRoute>
            <AddRecipe/>
          </PrivateRoute>}></Route>
          <Route path="/recipes/:id" element={<PrivateRoute><RecipeDetails /></PrivateRoute>} />
          <Route path="/recipes/edit/:id" element={<PrivateRoute><EditRecipe/></PrivateRoute>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
