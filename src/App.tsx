import './App.scss'
import InputArea from './components/InputArea'
import MessageList from './components/MessageList'
import Navbar from './components/Navbar'
import { ResponseProvider } from './context/ResponseContext'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <main className='flex justify-center'>
        <ResponseProvider>
          <div className='w-[90vw] '>
            <MessageList />
          </div>
          <InputArea />
        </ResponseProvider>
      </main>
    </>
  )
}

export default App
