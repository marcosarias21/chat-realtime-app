import { Button } from '../ui/button'
import { MessagesSquare, OutdentIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="mx-4 mt-2 flex items-center justify-between rounded px-4 py-2 text-gray-700 shadow-md backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="rounded border-black/35 bg-violet-400 p-2 text-white">
          <MessagesSquare />
        </span>
        <p className="text-sm font-bold">Chat</p>
      </div>
      <div>
        <Button
          className="border-0 border-gray-300 shadow-none"
          onClick={() => localStorage.clear()}
        >
          <OutdentIcon />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default Navbar
