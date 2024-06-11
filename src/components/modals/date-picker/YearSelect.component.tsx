import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ConstantConfig } from '../../../config';
import { globalStyles } from '../../../styles';
import Number from '../../Number.component';

const { BOX, MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

const YearSelect = (): React.JSX.Element => {
	const intendNumber = {
		containerWidth: DATE_PICKER.WIDTH - BOX.PADDING * 2,
		rowSize: DATE_PICKER.YEARS_IN_ROW,
	};

	return (
		<ScrollView style={[styles.container]}>
			<View style={[globalStyles.rowWrap]}>
				{DATE_PICKER.YEARS.map((year) => {
					return (
						<Number
							key={year}
							intend={intendNumber}
							isSelected={year === 2024}
							value={year}
							style={[{ borderRadius: BOX.BORDER_RADIUS * 2, height: 'auto', paddingVertical: BOX.PADDING / 2 }]}
						/>
					);
				})}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		maxHeight: DATE_PICKER.HEIGHT,
	},
});

export default YearSelect;
