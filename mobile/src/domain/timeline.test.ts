import { BUNDLED_SCHEDULE } from '../data/bundledSchedule';
import { scheduleCounts, timelineMilestones } from './timeline';

describe('mobile bundled schedule summary', () => {
  it('contains child milestones, mandatory doses, recommended doses, and sources', () => {
    const counts = scheduleCounts(BUNDLED_SCHEDULE);

    expect(counts.childMilestones).toBeGreaterThan(0);
    expect(counts.mandatoryDoses).toBeGreaterThan(0);
    expect(counts.recommendedDoses).toBeGreaterThan(0);
    expect(counts.sources).toBeGreaterThan(0);
  });

  it('groups schedule doses by timeline milestone', () => {
    const timeline = timelineMilestones(BUNDLED_SCHEDULE);
    const birth = timeline.find((item) => item.milestone.id === 'birth');

    expect(birth).toBeDefined();
    expect(birth?.mandatory.length).toBeGreaterThan(0);
  });
});
