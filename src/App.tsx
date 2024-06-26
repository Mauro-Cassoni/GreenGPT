import './App.scss'
import InputArea from './components/InputArea'
import MessageList from './components/MessageList'
import Navbar from './components/Navbar'
import { ResponseProvider } from './context/ResponseContext'

function App() {
  return (
    <>
      <Navbar className='min-h-10 h-[7svh] '></Navbar>
      <main className='flex flex-col items-center justify-center'>
        <ResponseProvider>
          <div className='w-[90svw] h-[81svh] max-w-[900px] overflow-hidden flex flex-col'>
            <MessageList />
          </div>
          <div className='w-[90svw] min-h-20 h-[11svh] max-w-[900px] flex'>
            <InputArea />
          </div>
        </ResponseProvider>
      </main>
    </>
  )
}

export default App
