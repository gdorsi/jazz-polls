import { Option, Poll } from "@/schema";
import { useCoState } from "jazz-react";
import { ID } from "jazz-tools";
import { useParams } from "react-router-dom";

export default function PollComponent() {
  const { id } = useParams<{ id: ID<Poll> }>();

  const poll = useCoState(Poll, id, {
    options: [{}],
    votes: [],
  });

  if (!poll) {
    return null;
  }

  const myVote = poll.votes.byMe?.value?.id;

  const handleVote = (option: Option) => {
    poll.votes.push(option);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">{poll.title}</h2>
      {poll.options.map((option, index) => (
        <div key={index} className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="poll-option"
              value={option.id}
              checked={option.id === myVote}
              onChange={() => handleVote(option)}
            />
            <span className="ml-2">{option.text}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
