import { createOption, Option, resetPollDraft } from "@/schema"
import { useAccount } from "jazz-react"
import type React from "react"

export default function CreatePoll() {
  const { me } = useAccount({
    root: {
      polls: [],
      pollDraft: {
        options: [{}]
      }
    }
  })

  const pollDraft = me?.root.pollDraft

  if (!pollDraft) {
    return null;
  }

  const canAddOption = pollDraft.options.at(-1)?.text !== ""

  const handleAddOption = () => {
    if (!canAddOption) {
      return;
    }

    pollDraft.options.push(createOption(""))
  }

  const handleOptionChange = (option: Option, value: string) => {
    option.text = value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    me.root.polls.push(pollDraft)
    
    await resetPollDraft()
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Poll</h2>
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
            value={pollDraft.title}
            onChange={(e) => pollDraft.title = e.target.value}
            required
          />
        </div>
        {pollDraft.options.map((option, index) => (
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
            Submit Poll
          </button>
        </div>
      </form>
    </div>
  )
}

