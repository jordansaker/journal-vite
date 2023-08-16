import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const NewEntry = ({ addEntry }) => {
  const params = useParams()
  const [entryText, setEntryText] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    addEntry(params.category, entryText)
  }
  
  return (
    <>
      <h3>New Entry in {params.category} Category</h3>
      <form className='container' onSubmit={handleSubmit}>
        <div>
          <textarea className='form-control'rows={8} value={entryText} onChange={e => setEntryText(e.target.value)}></textarea>
        </div>
        <button className='btn btn-primary mt-3'>Create Entry</button>
      </form>
    </>
  )
}

export default NewEntry