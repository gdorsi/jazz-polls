"use client";

import { useAccount } from "jazz-react";
import { Link } from "react-router-dom";
import CreatePoll from "./CreatePoll";
import { duplicatePoll } from "@/schema";

export default function PollList() {
  const { me } = useAccount({
    root: {
      polls: [{}],
    },
  });

  if (!me) {
    return null;
  }

  return (
    <>
      <div className="bg-white shadow-md rounded p-6 mb-4">
        <h2 className="text-2xl font-bold mb-4">Available Polls</h2>
        {me.root.polls.length === 0 ? (
          <p>No polls available. Create one!</p>
        ) : (
          <ul className="space-y-2">
            {me.root.polls.map((poll) => (
              <li key={poll.id} className="pb-2 flex gap-2">
                {poll.title}

                <Link
                  to={`/results/${poll.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Results
                </Link>

                <Link
                  to={`/poll/${poll.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Vote
                </Link>

                <button
                  onClick={() => duplicatePoll(poll)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Duplicate
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CreatePoll />
    </>
  );
}
