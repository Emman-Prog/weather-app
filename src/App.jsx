import { useState, useEffect } from 'react'
import axios from 'axios';
import WeatherWidget from './components/weather/WeatherWidget'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [location, setLocation] = useState('laguna');

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setLocation(inputValue)
  }

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-4 my-8">
        <form onSubmit={handleFormSubmit} className="text-center">
          <input className="border-2 border-black rounded-sm mr-2 py-2 px-4" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button className="py-2 px-4 inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" type="submit">Update Location</button>
        </form>
        <WeatherWidget location={location} />
      </div>
    </>
  )
}

export default App
