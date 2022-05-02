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
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.approved = event.params.approved

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BASE_EXP(...)
  // - contract.MAX_SUPPLY(...)
  // - contract.PRICE_PER_UNIT(...)
  // - contract.WEEK(...)
  // - contract.balanceOf(...)
  // - contract.getApproved(...)
  // - contract.getRewardForDuration(...)
  // - contract.getWeek(...)
  // - contract.isApprovedForAll(...)
  // - contract.lastTimeRewardApplicable(...)
  // - contract.lockChoices(...)
  // - contract.lockedSupply(...)
  // - contract.name(...)
  // - contract.nft(...)
  // - contract.nftRewardPerTokenPaid(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.rewardData(...)
  // - contract.rewardDistributors(...)
  // - contract.rewardPerToken(...)
  // - contract.rewardTokens(...)
  // - contract.rewards(...)
  // - contract.seller(...)
  // - contract.startTime(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenURI(...)
  // - contract.totalSupply(...)
  // - contract.unlocks(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleEvole(event: Evole): void {}

export function handleFeed(event: Feed): void {}

export function handleNewLockChoice(event: NewLockChoice): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleReclaim(event: Reclaim): void {}

export function handleRecovered(event: Recovered): void {}

export function handleRewardPaid(event: RewardPaid): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUpdateLockChoice(event: UpdateLockChoice): void {}
