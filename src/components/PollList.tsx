"use client"

import { useAccount } from "jazz-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface Poll {
  id: string
  question: string
}

export default function PollList() {
  const { me } = useAccount({
    root: {
      polls: [{}],
    }
  })

  if (!me) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Available Polls</h2>
      {me.root.polls.length === 0 ? (
        <p>No polls available. Create one!</p>
      ) : (
        <ul className="space-y-2">
          {me.root.polls.map((poll) => (
            <li key={poll.id} className="border-b pb-2">
              <Link to={`/results/${poll.id}`} className="text-blue-500 hover:text-blue-700">
                {poll.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

