import { useAccount, useCoState } from "jazz-react"
import PollForm from "./PollForm"
import { Poll } from "@/schema";
import { ID } from "jazz-tools";
import { useParams } from "react-router-dom";

export default function EditPoll() {
  const { id } = useParams<{ id: ID<Poll> }>();

  const poll = useCoState(Poll, id, {
    resolve: {
      options: {
        $each: true,
      },
    },
  });

  const { me } = useAccount()

  if (!poll) {
    return null;
  }

  if (!me.canWrite(poll)) {
    return <div>You are not authorized to edit this poll</div>;
  }

  return <PollForm poll={poll} isCreate={false} />
}
