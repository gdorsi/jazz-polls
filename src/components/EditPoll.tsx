import { useCoState } from "jazz-react"
import PollForm from "./PollForm"
import { Poll } from "@/schema";
import { ID } from "jazz-tools";
import { useParams } from "react-router-dom";

export default function EditPoll() {
  const { id } = useParams<{ id: ID<Poll> }>();

  const poll = useCoState(Poll, id, {
    options: [{}],
  });

  if (!poll) {
    return null;
  }

  return <PollForm poll={poll} isCreate={false} />
}
