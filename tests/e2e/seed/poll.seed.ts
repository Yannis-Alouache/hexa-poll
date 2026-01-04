import { PollCreationProps } from '../../../src/domain/models/poll/poll';

const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const basicPollSeed: PollCreationProps = {
  id: '1',
  question: 'Quel est votre framework JavaScript préféré ?',
  options: [
    { id: 'option-1', title: 'React' },
    { id: 'option-2', title: 'Vue.js' },
    { id: 'option-3', title: 'Angular' },
  ],
  startDate: tomorrow,
  endDate: nextWeek,
};
