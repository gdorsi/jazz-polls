import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import CreatePoll from "./components/CreatePoll"
import PollList from "./components/PollList"
import Poll from "./components/Poll"
import Results from "./components/Results"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-gray-800">Poll App</span>
                </Link>
                <div className="ml-6 flex space-x-8">
                  <Link to="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                    Polls
                  </Link>
                  <Link
                    to="/create"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Create Poll
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<PollList />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route path="/poll/:id" element={<Poll />} />
            <Route path="/results/:id" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

