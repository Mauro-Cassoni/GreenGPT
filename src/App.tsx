import './App.scss'
import InputArea from './components/InputArea'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <main className='flex justify-center'>
        <InputArea></InputArea>
      </main>
    </>
  )
}

export default App
