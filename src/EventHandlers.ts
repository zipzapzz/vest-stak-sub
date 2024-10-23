/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  StakingPool,
  Staking_Claim,
  Staking_Deposit,
  Staking_Pool,
  Staking_Withdraw,
  Vesting,
  Vesting_Claim,
  VestingFactory,
  VestingFactory_FeesChange,
  VestingFactory_Vesting,
} from "generated";

StakingPool.Claim.handler(async ({ event, context }) => {
  const entity: Staking_Claim = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    amount: event.params.amount,
    poolIndex: event.params.poolIndex,
    address: event.srcAddress,
    hash: event.transaction.hash,
    timestamp: BigInt(event.block.timestamp)
  };

  context.Staking_Claim.set(entity);
});

StakingPool.Deposit.handler(async ({ event, context }) => {
  const entity: Staking_Deposit = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    amount: event.params.amount,
    poolIndex: event.params.poolIndex,
    address: event.srcAddress,
    hash: event.transaction.hash,
    timestamp: BigInt(event.block.timestamp)
  };

  context.Staking_Deposit.set(entity);
});

StakingPool.PoolCreated.handler(async ({ event, context }) => {
  const entity: Staking_Pool = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    stakingToken: event.params.stakingToken,
    rewardToken: event.params.rewardToken,
    startTime: event.params.startTime,
    endTime: event.params.endTime,
    precision: event.params.precision,
    totalReward: event.params.totalReward,
    hash: event.transaction.hash,
    timestamp: BigInt(event.block.timestamp)
  };

  context.Staking_Pool.set(entity);
});

StakingPool.Withdraw.handler(async ({ event, context }) => {
  const entity: Staking_Withdraw = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    amount: event.params.amount,
    poolIndex: event.params.poolIndex,
    address: event.srcAddress,
    hash: event.transaction.hash,
    timestamp: BigInt(event.block.timestamp)
  };

  context.Staking_Withdraw.set(entity);
});

Vesting.Claim.handler(async ({ event, context }) => {
  const entity: Vesting_Claim = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    account: event.params.account,
    amount: event.params.amount,
    vesting: event.srcAddress,
    address: event.srcAddress,
    hash: event.transaction.hash,
    timestamp: BigInt(event.block.timestamp)
  };

  context.Vesting_Claim.set(entity);

  let existingVesting = await context.VestingFactory_Vesting.get(`${event.srcAddress}_${event.chainId}`);
  if (existingVesting) {
    existingVesting = {
      ...existingVesting,
      claimed: existingVesting.claimed + event.params.amount
    }
    context.VestingFactory_Vesting.set(existingVesting);
  }
});

VestingFactory.FeesChange.handler(async ({ event, context }) => {
  // const entity: VestingFactory_FeesChange = {
  //   id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
  //   uniV2Router: event.params.uniV2Router,
  //   uniV2Pair: event.params.uniV2Pair,
  //   feesUsd: event.params.feesUsd,
  //   companyWallet: event.params.companyWallet,
  // };

  // context.VestingFactory_FeesChange.set(entity);
});

VestingFactory.VestingCreated.handler(async ({ event, context }) => {
  const entity: VestingFactory_Vesting = {
    id: `${event.params.vestingAddr}_${event.chainId}`,
    creator: event.params.creator,
    address: event.params.vestingAddr,
    token: event.params.token,
    merkleRoot: event.params.merkleRoot,
    tokenTotal: event.params.totalAmount,
    fee: event.params.fee,
    claimed: BigInt(0),
    hash: event.transaction.hash,
    timestamp: BigInt(event.block.timestamp)
  };

  context.VestingFactory_Vesting.set(entity);
  
});

VestingFactory.VestingCreated.contractRegister(({ event, context }) => {
  context.addVesting(event.params.vestingAddr);
});