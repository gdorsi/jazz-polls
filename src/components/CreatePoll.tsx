import { useAccount } from "jazz-react"
import PollForm from "./PollForm"

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

  return <PollForm poll={pollDraft} isCreate={true} />
}

