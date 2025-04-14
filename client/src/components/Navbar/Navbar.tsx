import { Button } from '../ui/button'
import { OutdentIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="mx-4 mt-2 flex items-center justify-between rounded border-1 border-gray-300 px-4 py-2 text-gray-700">
      <div>
        <p className="text-xl font-bold">MarChat</p>
      </div>
      <div>
        <Button className="shadow-none">
          <OutdentIcon />
        </Button>
      </div>
    </header>
  )
}

export default Navbar
