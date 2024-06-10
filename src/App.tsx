import './App.scss'
import InputArea from './components/InputArea'
import MessageList from './components/MessageList'
import Navbar from './components/Navbar'
import { ResponseProvider } from './context/ResponseContext'

function App() {

  return (
    <>
      <Navbar className='min-h-10 h-[7vh] '></Navbar>
      <main className='flex flex-col items-center justify-center'>
        <ResponseProvider>
          <div className='w-[90vw] h-[81vh] max-w-[900px] overflow-hidden flex flex-col'>
            <div className='flex-1 custom-scrollbar'>
              <MessageList />
            </div>
          </div>

          <div className='w-[90vw] h-[11vh] max-w-[900px] flex'>
            <InputArea />
          </div>
        </ResponseProvider>
      </main>
    </>
  )
}

export default App
