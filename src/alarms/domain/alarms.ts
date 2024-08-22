// this class our represent our domain model

import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  constructor(
    public id: string,
    public name: string,
    public severity: AlarmSeverity,
  ) {}
}
