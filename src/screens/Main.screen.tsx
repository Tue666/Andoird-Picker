import React from 'react';
import { View } from 'react-native';
import { Picker } from '../components';
import { useTheme } from '../hooks';
import { globalStyles } from '../styles';

const MainScreen = (): React.JSX.Element => {
	const { background } = useTheme();

	return (
		<View style={[globalStyles.container, { backgroundColor: background }]}>
			<Picker title="Time Picker" variant="time" />
			{/* <Picker title="Date Picker" variant="date" /> */}
		</View>
	);
};

export default MainScreen;
