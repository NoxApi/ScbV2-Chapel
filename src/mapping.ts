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
import { user,food,token,lockchoice } from "../generated/schema"



export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleEvole(event: Evole): void {
  let ID = token.load(event.params.tokenId.toString())
  ID!.evolform = event.params.evolForm
  ID!.race = event.params.race
  ID!.save()
}

export function handleFeed(event: Feed): void {
  let ID = token.load(event.params.tokenId.toString())
  let foods =food.load(event.params.unlockWeek.toString())
  if (foods == null){
    foods= new food(event.params.unlockWeek.toString())
    foods.amount = new BigInt(0)
  }
  foods.amount += event.params.amount
  foods.Token = event.params.tokenId.toString()
  foods.save()
  ID!.Exp = event.params.exp
  ID!.foodindex=ID!.foodindex+1
  ID!.save()
}

export function handleNewLockChoice(event: NewLockChoice): void {
  let lc = new lockchoice(event.params.index.toString())
  lc.week = event.params.week
  lc.multiplier = event.params.multiplier
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleReclaim(event: Reclaim): void {
  let foods = food.load(event.params.week.toString())
  foods!.isclaim = true
  foods!.save()
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
    ID = new token(event.params.tokenId.toString())
    ID.evolform = new BigInt(1)
    ID.race = new BigInt(0)
    ID.amount =new BigInt(0)
    ID.Exp = new BigInt(0)
    ID.LastestReclaim =new BigInt(0)
    }
  ID.User = event.params.to
  ID.save()
  entity.save()
  }

export function handleUpdateLockChoice(event: UpdateLockChoice): void {
  let lc = lockchoice.load(event.params.index.toString())
  lc!.multiplier = event.params.multiplier
  lc!.week = event.params.week
}
