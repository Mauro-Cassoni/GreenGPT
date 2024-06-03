import './App.scss'
import InputArea from './components/InputArea'
import Navbar from './components/Navbar'
import ResponseAPI from './components/ResponseAPI'
import { ResponseProvider } from './context/ResponseContext'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <main className='flex justify-center'>
        <ResponseProvider>

          <InputArea />
          <ResponseAPI />

        </ResponseProvider>
      </main>
    </>
  )
}

export default App
