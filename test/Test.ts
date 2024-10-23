import assert from "assert";
import { 
  TestHelpers,
  StakingPool_Claim
} from "generated";
const { MockDb, StakingPool } = TestHelpers;

describe("StakingPool contract Claim event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for StakingPool contract Claim event
  const event = StakingPool.Claim.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("StakingPool_Claim is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await StakingPool.Claim.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualStakingPoolClaim = mockDbUpdated.entities.StakingPool_Claim.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedStakingPoolClaim: StakingPool_Claim = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      user: event.params.user,
      amount: event.params.amount,
      poolIndex: event.params.poolIndex,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualStakingPoolClaim, expectedStakingPoolClaim, "Actual StakingPoolClaim should be the same as the expectedStakingPoolClaim");
  });
});
