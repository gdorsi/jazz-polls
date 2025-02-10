"use client"

import { Option, Poll } from "@/schema";
import { useCoState } from "jazz-react";
import { ID } from "jazz-tools";
import { useParams } from "react-router-dom"


export default function Results() {
  const { id } = useParams<{ id: ID<Poll> }>();

  const poll = useCoState(Poll, id, {
    options: [{}],
    votes: [{}],
  });

  if (!poll) {
    return null;
  }

  const votes = new Map<ID<Option>, number>();
  let totalVotes = 0;

  for (const vote of Object.values(poll.votes.perSession)) {
    votes.set(vote.value.id, (votes.get(vote.value.id) || 0) + 1);
    totalVotes++;
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Results: {poll.title}</h2>
      <div className="space-y-4">
        {poll.options.map((option) => {
          const voteCount = votes.get(option.id) || 0;
          const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
          return (
            <div key={option.id}>
              <div className="flex justify-between mb-1">
                <span>{option.text}</span>
                <span>
                  {voteCount} votes ({percentage.toFixed(2)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-4">Total votes: {totalVotes}</p>
    </div>
  )
}

