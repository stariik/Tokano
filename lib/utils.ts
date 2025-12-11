import { VestingSchedule } from "tokano-sdk";

export function vestingScheduleToString(schedule: VestingSchedule): string {
  switch (schedule) {
    case VestingSchedule.Secondly:
      return "Secondly";
    case VestingSchedule.Minutely:
      return "Minutely";
    case VestingSchedule.Hourly:
      return "Hourly";
    case VestingSchedule.Daily:
      return "Daily";
    case VestingSchedule.Weekly:
      return "Weekly";
    case VestingSchedule.Monthly:
      return "Monthly";
    case VestingSchedule.Quarterly:
      return "Quarterly";
    case VestingSchedule.Yearly:
      return "Yearly";
    case VestingSchedule.TillTheEnd:
      return "Till the End";
    default:
      return schedule;
  }
}

export function getVestingSteps(
  schedule: VestingSchedule,
  startDate: Date,
  endDate: Date,
): { currentStep: number; totalSteps: number } {
  const now = Math.floor(Date.now() / 1000);
  const start = Math.floor(startDate.getTime() / 1000);
  const end = Math.floor(endDate.getTime() / 1000);

  if (start > now) {
    return { currentStep: 0, totalSteps: 0 };
  }

  let divisor = 0;
  switch (schedule) {
    case VestingSchedule.Secondly:
      divisor = 1;
      break;
    case VestingSchedule.Minutely:
      divisor = 60;
      break;
    case VestingSchedule.Hourly:
      divisor = 3600;
      break;
    case VestingSchedule.Daily:
      divisor = 86400;
      break;
    case VestingSchedule.Weekly:
      divisor = 604800;
      break;
    case VestingSchedule.Monthly:
      // This is an approximation. For more accuracy, we might need a library to handle calendar months.
      divisor = 2629746;
      break;
    case VestingSchedule.Quarterly:
      // Approximation
      divisor = 7889238;
      break;
    case VestingSchedule.Yearly:
      // Approximation
      divisor = 31556952;
      break;
    case VestingSchedule.TillTheEnd:
      const totalDuration = end - start;
      const elapsed = now - start;
      return {
        currentStep: elapsed >= totalDuration ? 1 : 0,
        totalSteps: 1,
      };
  }

  if (divisor === 0) {
    return { currentStep: 0, totalSteps: 0 };
  }

  const totalSteps = Math.floor((end - start) / divisor);
  const elapsed = now - start;
  const currentStep = Math.min(Math.floor(elapsed / divisor), totalSteps);

  return { currentStep, totalSteps };
}
