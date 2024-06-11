import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ConstantConfig } from '../../../config';
import { useTheme } from '../../../hooks';
import { globalStyles } from '../../../styles';
import Number from '../../Number.component';

const { BOX, DAYS_IN_WEEK, MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

const DaySelect = (): React.JSX.Element => {
	const { outline } = useTheme();
	const intendNumber = {
		containerWidth: DATE_PICKER.WIDTH - (BOX.PADDING * 2 + DATE_PICKER.PADDING * 2),
		rowSize: DAYS_IN_WEEK,
	};
	const headerStyle = {
		bgColor: 'transparent',
		textColor: outline,
	};

	return (
		<View style={[globalStyles.rowWrap, styles.picker]}>
			{DATE_PICKER.DAYS_OF_WEEK.map((day, index) => {
				return (
					<Number
						key={index}
						intend={intendNumber}
						value={day}
						style={[{ backgroundColor: headerStyle.bgColor }]}
						textStyle={[{ color: headerStyle.textColor }]}
					/>
				);
			})}
			<View style={[globalStyles.fw, styles.gap]} />
			{[...Array(30)].map((_, index) => {
				return <Number key={index} intend={intendNumber} isSelected={index + 1 === 18} value={index + 1} />;
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	picker: {
		padding: DATE_PICKER.PADDING,
	},
	gap: {
		marginBottom: BOX.MARGIN / 2,
	},
});

export default DaySelect;
