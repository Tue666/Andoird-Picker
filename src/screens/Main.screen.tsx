import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '../components';
import { TimePicker } from '../components/modals';
import { useTheme } from '../hooks';
import { IPicker } from '../interfaces';
import { globalStyles } from '../styles';

const MainScreen = (): React.JSX.Element => {
	const [time, setTime] = useState<IPicker.TimePicker | undefined>(undefined);
	const { background } = useTheme();

	const onChangeTimePicker = (time: Omit<IPicker.TimePicker, 'suffix'>) => {
		setTime({
			...time,
			suffix: 'AM',
		});
	};
	return (
		<View style={[globalStyles.container, { backgroundColor: background }]}>
			<Picker
				title={`${time?.hour ?? 'NA'}:${time?.minute ?? 'NA'} ${time?.suffix ?? 'NA'}`}
				modal={TimePicker}
				time={time}
				onChangeTimePicker={onChangeTimePicker}
			/>
		</View>
	);
};

export default MainScreen;
