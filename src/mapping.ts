import { BigInt } from "@graphprotocol/graph-ts"
import {
  Scbv2Chapel,
  Approval,
  ApprovalForAll,
  Evole,
  Feed,
  NewLockChoice,
  OwnershipTransferred,
  Reclaim,
  Recovered,
  RewardPaid,
  Transfer,
  UpdateLockChoice
} from "../generated/Scbv2Chapel/Scbv2Chapel"
import { user,food,token } from "../generated/schema"



export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleEvole(event: Evole): void {
  let ID = token.load(event.params.tokenId.toString())
  ID!.evolform = event.params.evolForm
  ID!.race = event.params.race
  ID!.save()
}

export function handleFeed(event: Feed): void {
  let ID = token.load(event.params.tokenId.toString())
  let foods = new food(ID!.foodindex.toString())
  foods.amount = event.params.amount
  foods.Token = event.params.tokenId.toString()
  foods.unlockweek = event.params.unlockWeek
  foods.save()
  ID!.Exp = event.params.exp
  ID!.amount+=foods.amount
  ID!.foodindex=ID!.foodindex+1
  ID!.save()
}

export function handleNewLockChoice(event: NewLockChoice): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleReclaim(event: Reclaim): void {
  let ID = token.load(event.params.tokenId.toString())
  ID!.LastestReclaim = event.params.week
  ID!.save()
}

export function handleRecovered(event: Recovered): void {}

export function handleRewardPaid(event: RewardPaid): void {}

export function handleTransfer(event: Transfer): void {
  let entity = user.load(event.params.to)
  if (entity== null) {
    entity = new user(event.params.to)
  }
  let ID = token.load(event.params.tokenId.toString())
  if (ID== null) {
    let ID = new token(event.params.tokenId.toString())
    ID.evolform = new BigInt(1)
    ID.race = new BigInt(0)
    ID.amount =new BigInt(0)
    ID.foodindex = 0
    ID.Exp = new BigInt(0)
    ID.LastestReclaim =new BigInt(0)
    }
  ID!.User = event.params.to
  ID!.save()
  entity.save()
  }

export function handleUpdateLockChoice(event: UpdateLockChoice): void {}
