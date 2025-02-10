
import { Account, CoFeed, CoList, CoMap, Group, co } from "jazz-tools";

export class Option extends CoMap {
  text = co.string;
}

export class VoteFeed extends CoFeed.Of(co.ref(Option)) {}

export class OptionList extends CoList.Of(co.ref(Option)) {}

export class Poll extends CoMap {
  title = co.string;
  options = co.ref(OptionList);
  votes = co.ref(VoteFeed);
}

export class PollList extends CoList.Of(co.ref(Poll)) {}

export class AccountRoot extends CoMap {
  polls = co.ref(PollList);
  pollDraft = co.ref(Poll);
  version = co.optional.number;
}

export class JazzAccount extends Account {
  root = co.ref(AccountRoot);

  async migrate() {
    if (this.root === undefined) {
      
      this.root = AccountRoot.create({
        polls: PollList.create([]),
        pollDraft: createPollDraft(),
      });
      return;
    }
  }

}

export function createPollDraft() {
  const everyoneReader = Group.create();
  everyoneReader.addMember("everyone", "reader");

  const everyoneWriter = Group.create();
  everyoneWriter.addMember("everyone", "writer");

  return Poll.create({
    title: "",
    options: OptionList.create([], everyoneReader),
    votes: VoteFeed.create([], everyoneWriter),
  }, everyoneReader)
}

export async function resetPollDraft() {
  const { root } = await JazzAccount.getMe().ensureLoaded({
    root: {}
  })

  root.pollDraft = createPollDraft()
}

export function createOption(text: string) {
  const everyoneReader = Group.create();
  everyoneReader.addMember("everyone", "reader");

  return Option.create({
    text,
  }, everyoneReader);
}
