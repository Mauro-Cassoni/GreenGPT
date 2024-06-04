import './App.scss'
import InputArea from './components/InputArea'
import MessageList from './components/MessageList'
import Navbar from './components/Navbar'
import { ResponseProvider } from './context/ResponseContext'

function App() {

  return (
    <>
      <Navbar className='min-h-10 h-[7vh]'></Navbar>
      <main className='flex flex-col items-center justify-center gap-2'>
        <ResponseProvider>
          <div className='w-[90vw] h-[81vh] overflow-hidden py-4'>
            <MessageList />
          </div>

          <div className='w-[90vw] h-[11vh] flex items-center'>
            <InputArea />
          </div>
        </ResponseProvider>
      </main>
    </>
  )
}

export default App
