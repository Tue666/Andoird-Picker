export type TimeSuffix = 'AM' | 'PM';

export interface TimePicker {
	hour: number;
	minute: number;
	suffix: TimeSuffix;
}

export type TimeMode = 'hour' | 'minute';
