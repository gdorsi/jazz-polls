import { useAccount } from "jazz-react"
import PollForm from "./PollForm"

export default function CreatePoll() {
  const { me } = useAccount({
    resolve: {
      root: {
        pollDraft: {
          options: {
            $each: true,
          },
        },
      },
    },
  })

  const pollDraft = me?.root.pollDraft

  if (!pollDraft) {
    return null;
  }

  return <PollForm poll={pollDraft} isCreate={true} />
}

