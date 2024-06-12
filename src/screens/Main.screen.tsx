import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '../components';
import { DatePicker, TimePicker } from '../components/modals';
import { ConstantConfig } from '../config';
import { useTheme } from '../hooks';
import { IPicker } from '../interfaces';
import { globalStyles } from '../styles';
import { TimeUtil } from '../utils';

const { BOX } = ConstantConfig;

const MainScreen = (): React.JSX.Element => {
	const [date, setDate] = useState<IPicker.DatePicker | undefined>(undefined);
	const [time, setTime] = useState<IPicker.TimePicker | undefined>(undefined);
	const { background } = useTheme();

	const onChangeDatePicker = (date: IPicker.DatePicker) => {
		setDate(date);
	};
	const onChangeTimePicker = (time: IPicker.TimePicker) => {
		setTime(time);
	};
	return (
		<View style={[globalStyles.container, styles.container, { backgroundColor: background }]}>
			<Picker
				title={TimeUtil.toDatePickerText(date)}
				placeholder="Date mobile"
				modal={DatePicker}
				date={date}
				onChangeDatePicker={onChangeDatePicker}
			/>
			<Picker
				title={TimeUtil.toTimePickerText(time)}
				placeholder="Time"
				icon="clock-o"
				modal={TimePicker}
				time={time}
				onChangeTimePicker={onChangeTimePicker}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: BOX.PADDING * 2,
	},
});

export default MainScreen;
