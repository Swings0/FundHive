import dbConnect from '@/utils/dbConnect';
import Investment from '@/models/investments';
import User from '@/models/user';

/**
 * Process A: Increases activeDeposit from 0 up to targetActiveDeposit over the specified duration.
 * While activeDeposit is incrementing, accountBalance remains 0.
 * When the duration is complete, activeDeposit and totalDeposit are reset to 0.
 */
export async function updateActiveDeposits() {
    await dbConnect();
    const now = new Date();
  
    const activeInvestments = await Investment.find({ status: 'active' });
  
    for (const investment of activeInvestments) {
      const { _id, userEmail, targetActiveDeposit, duration, durationUnit, startTime } = investment;
      
      const effectiveEmail = userEmail || investment.userId;
      if (!effectiveEmail) {
        console.error(`Process A - Investment ${_id} is missing a valid email.`);
        continue;
      }
      
      const target = Number(targetActiveDeposit);
      if (isNaN(target) || target <= 0) {
        console.error(`Process A - Investment ${_id} for ${effectiveEmail} has an invalid targetActiveDeposit: ${targetActiveDeposit}`);
        continue;
      }
      
      let totalDurationSeconds = 0;
      if (durationUnit === 'min') {
        totalDurationSeconds = Number(duration) * 60;
      } else if (durationUnit === 'hour') {
        totalDurationSeconds = Number(duration) * 3600;
      } else if (durationUnit === 'day') {
        totalDurationSeconds = Number(duration) * 24 * 3600;
      } else {
        totalDurationSeconds = Number(duration) * 60;
      }
      
      const elapsedSeconds = (now.getTime() - new Date(startTime).getTime()) / 1000;
      const computedActiveDeposit = (elapsedSeconds / totalDurationSeconds) * target;
      const newActiveDeposit = Math.min(computedActiveDeposit, target);
      const newActiveDepositRounded = Number(newActiveDeposit.toFixed(2));
      
      console.log(
        `Process A - Investment ${_id} for ${effectiveEmail}: elapsed=${elapsedSeconds.toFixed(2)} sec, totalDuration=${totalDurationSeconds} sec, computed=${computedActiveDeposit.toFixed(2)}, activeDeposit=${newActiveDepositRounded}`
      );
      
      if (newActiveDepositRounded < target) {
        await Investment.updateOne({ _id }, { $set: { activeDeposit: newActiveDepositRounded, userEmail: effectiveEmail } });
      } else {
        // Process A complete: reset activeDeposit and totalDeposit.
        await Investment.updateOne({ _id }, { $set: { activeDeposit: 0, totalDeposit: 0, status: 'active', userEmail: effectiveEmail } });
        console.log(`Process A - Investment ${_id} for ${effectiveEmail} completed. Active deposit process reset.`);
      }
    }
  }
  

/**
 * Process B: Updates the account balance after a specified delay.
 * When the elapsed time since accountBalanceUpdateStartTime meets or exceeds the specified duration,
 * the investment's accountBalance is updated to pendingAccountBalance (the new value),
 * pendingAccountBalance is reset to 0,
 * and the User model is updated accordingly.
 */
export async function updateAccountBalanceUpdates() {
    await dbConnect();
    const now = new Date();
  
    // Process B: update account balance for investments with a pending value.
    const investmentsToUpdate = await Investment.find({ pendingAccountBalance: { $gt: 0 } });
  
    for (const investment of investmentsToUpdate) {
      const { _id, userEmail, accountBalanceUpdateDuration, accountBalanceUpdateUnit, accountBalanceUpdateStartTime, pendingAccountBalance } = investment;
      const effectiveEmail = userEmail || investment.userId;
      if (!effectiveEmail) {
        console.error(`Process B - Investment ${_id} is missing a valid email.`);
        continue;
      }
      
      const updateDurationNum = Number(accountBalanceUpdateDuration);
      if (!updateDurationNum || isNaN(updateDurationNum) || updateDurationNum <= 0) {
        console.warn(`Process B - Investment ${_id} for ${effectiveEmail} does not have a valid accountBalanceUpdateDuration. Skipping update.`);
        continue;
      }
      
      const durationSec = (() => {
        if (accountBalanceUpdateUnit === 'min') {
          return updateDurationNum * 60;
        } else if (accountBalanceUpdateUnit === 'hour') {
          return updateDurationNum * 3600;
        } else if (accountBalanceUpdateUnit === 'day') {
          return updateDurationNum * 24 * 3600;
        } else {
          return updateDurationNum * 60;
        }
      })();
      
      const elapsedSec = (now.getTime() - new Date(accountBalanceUpdateStartTime).getTime()) / 1000;
      console.log(
        `Process B - Investment ${_id} for ${effectiveEmail}: elapsed=${elapsedSec.toFixed(2)} sec, requiredDuration=${durationSec} sec`
      );
      
      if (elapsedSec >= durationSec) {
        const newAccBalance = Number(pendingAccountBalance);
        if (isNaN(newAccBalance)) {
          console.error(`Process B - Investment ${_id} for ${effectiveEmail} has an invalid pendingAccountBalance: ${pendingAccountBalance}`);
          continue;
        }
        await Investment.updateOne(
          { _id },
          {
            $set: {
              accountBalance: newAccBalance,
              pendingAccountBalance: 0,
              accountBalanceUpdateStartTime: now, // reset start time for future updates
            },
          }
        );
        await User.updateOne({ email: effectiveEmail }, { $set: { accountBalance: newAccBalance } });
        console.log(`Process B - Investment ${_id} for ${effectiveEmail} completed. Account balance updated to ${newAccBalance}.`);
      }
    }
  }
  