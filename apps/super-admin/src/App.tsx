import { useState } from 'react'
import './App.css'
import { Button } from '@clife/ui/components/button'
import { ThemeToggle } from './components/theme-toggle'
import { useAuth } from './hooks/useAuthContext'
import { AccessControlProvider } from '@clife/rbac/AccessControlContext'

function App() {
  const [count, setCount] = useState(0)
  const { user } = useAuth();

  return (
    <AccessControlProvider user={user} >
      <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
        <div className="flex space-x-8 mb-8">
          <ThemeToggle />
        </div>
        <h1 className="text-xl font-extrabold mb-4">Vite + React</h1>
        <div className="rounded-xl shadow-md px-8 py-6 mb-6 flex flex-col items-center">
          <p className=" mb-2">
            Edit <code className="px-1 rounded text-sm">src/App.tsx</code> and save to test HMR
          </p>
          <Button
            className="mt-4 px-6 py-2 font-semibold rounded shadow transition"
            onClick={() => setCount((count) => count + 1)}
            variant={"outline"}
          >
            count is {count}
          </Button>
        </div>
        <p className="text-sm">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </AccessControlProvider>
  )
}

export default App
