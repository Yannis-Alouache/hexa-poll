import { OptionEntity } from './option-entity';

export interface PollEntity {
  id: string;
  question: string;
  options: OptionEntity[];
}
