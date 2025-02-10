import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import CreatePoll from "./components/CreatePoll"
import PollList from "./components/PollList"
import Poll from "./components/Poll"
import Results from "./components/Results"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
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

