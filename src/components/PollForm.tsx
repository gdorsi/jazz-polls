import { createOption, Option, Poll, resetPollDraft } from "@/schema"
import { useAccount } from "jazz-react"
import { DeeplyLoaded } from "jazz-tools"
import type React from "react"
import { useNavigate } from "react-router-dom"

export default function PollForm({ poll, isCreate }: { poll: DeeplyLoaded<Poll, { options: [{}] }>, isCreate: boolean }) {
  const { me } = useAccount({
    root: {
      polls: [],
    }
  })

  const navigate = useNavigate()

 
  const canAddOption = poll.options.at(-1)?.text !== ""

  const handleAddOption = () => {
    if (!canAddOption) {
      return;
    }

    poll.options.push(createOption(""))
  }

  const handleOptionChange = (option: Option, value: string) => {
    option.text = value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isCreate && me) {
      me.root.polls.push(poll)
      await resetPollDraft()
    }

    navigate("/")
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">{isCreate ? "Create a New Poll" : "Edit Poll"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
            Question
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="question"
            type="text"
            placeholder="Enter your question"
            value={poll.title}
            onChange={(e) => poll.title = e.target.value}
            required
          />
        </div>
        {poll.options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-${index}`}>
              Option {index + 1}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`option-${index}`}
              type="text"
              placeholder={`Enter option ${index + 1}`}
              value={option.text}
              onChange={(e) => handleOptionChange(option, e.target.value)}
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleAddOption}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!canAddOption}
          >
            Add Option
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isCreate ? "Create Poll" : "Go back to the list"}
          </button>
        </div>
      </form>
    </div>
  )
}

