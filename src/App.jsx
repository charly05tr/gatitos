import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [gatos, setGatos] = useState("")
  const [loading, setLoading] = useState(true)
  const fetchingGatos = async () => {
    try{
      const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        setGatos(data)
        setLoading(false)
      }
      else {
        console.log(res)
      }
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchingGatos()
  }, [])

  return (
    <div className='flex flex-col justify-center items-center'>
      <button type="button" onClick={()=>{fetchingGatos(); setLoading(true)}} className='bg-blue-400 p-4 h-fit mt-5 w-fit cursor-pointer border-none rounded-lg font-semibold shadow-lg'>Cargar mas gatitos</button>
    <div className='w-full p-10 grid grid-cols-[auto_auto_auto] gap-2 h-[dvh100]'>
    {
      (!loading && gatos)?gatos.map(gato => (
        <img key={gato.id} src={gato.url} width={gato.width} height={gato.height} className='fit rounded-lg shadow'></img>
      )):<div className='absolute z-10 min-h-[dvh100]'>Loading...</div>
    }

    </div>
    </div>
  )
}

export default App
