import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ConstantConfig } from '../../../config';

const { BOX } = ConstantConfig;

const HourSelect = (): React.JSX.Element => {
	return (
		<View style={[styles.container]}>
			<Text>Hello</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: BOX.MARGIN,
	},
});

export default HourSelect;
