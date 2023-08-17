import React, { useEffect, useReducer } from 'react'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'

// const seedEntries = [
//   { catgeory: 'Food', content: "Pizza!!!"},
//   { catgeory: 'Coding', content: "Coding is fun!"},
//   { catgeory: 'Gaming', content: "Skyrim is for the Nords!"},
// ]

function reducer (currentState, action) {
   switch (action.type) {
    case 'setEntries':
      return {
        ...currentState,
        entries: action.entries
      }
    case 'addEntry':
      return {
        ...currentState,
        entries: [...currentState.entries, action.entry]
      }
    default:
      return currentState
   }
}

const initialState = {
  entries: [],
  categories: []
}

const App = () => {
  const navigate = useNavigate()

  const [store, dispatch] = useReducer(reducer, initialState)
  const { entries } = store
  
  function ShowEntryWrapper() {
    const { id } = useParams()
    return <ShowEntry entry={entries[id]} />
  }

  async function addEntry(category, content) {
    const newEntry = {
      category: category,
      content: content
    }

  const returnedEntry = await fetch(`${import.meta.env.VITE_API_URL}/entries`, { 
    method: 'POST',
    body: JSON.stringify(newEntry),
    headers: {
      'Content-Type' : "application/json"
      },
    })
    const parsedData = await returnedEntry.json()
    dispatch({
      type: 'addEntry',
      entry: parsedData
    })
    const id = entries.length
    navigate(`/entry/${id}`)
  }

  useEffect(() => {
    (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/entries`)
    const data = await res.json()
    dispatch({
      type: 'setEntries',
      entries: data
    })
    })()
  }, [])

  return (
    <>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home entries={entries} />} />
          <Route path='/categroy' element={<CategorySelection />} />
          <Route path='/entry'>
            <Route path=':id' element={<ShowEntryWrapper />} />
            <Route path='new/:category' element={<NewEntry addEntry={addEntry} />} />
          </Route>
          <Route path='*' element={<h3>Page not found</h3>} />
        </Routes>
      {/* <Home />
      <CategorySelection />
      <NewEntry /> */}
    </>
  )
}

export default App