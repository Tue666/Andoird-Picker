import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ConstantConfig } from '../../../config';
import { IPicker } from '../../../interfaces';
import { globalStyles } from '../../../styles';
import Number from '../../Number.component';

const { BOX, MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

interface YearSelectProps {
	year: IPicker.DatePicker['year'];
	onToggleVisibleYear: () => void;
	onSelectDate: (date: Partial<IPicker.DatePicker>) => void;
}

const YearSelect = (props: YearSelectProps): React.JSX.Element => {
	const { year, onToggleVisibleYear, onSelectDate } = props;
	const intendNumber = {
		containerWidth: DATE_PICKER.WIDTH - BOX.PADDING * 2,
		rowSize: DATE_PICKER.YEARS_IN_ROW,
	};

	const onPressSelectYear = (year: IPicker.DatePicker['year']) => {
		onSelectDate({ year });
		onToggleVisibleYear();
	};
	return (
		<ScrollView style={[styles.container]}>
			<View style={[globalStyles.rowWrap]}>
				{DATE_PICKER.YEARS.map((value) => {
					return (
						<Number
							key={value}
							intend={intendNumber}
							isSelected={value === year}
							value={value}
							style={[{ borderRadius: BOX.BORDER_RADIUS * 2, height: 'auto', paddingVertical: BOX.PADDING / 2 }]}
							onPress={() => onPressSelectYear(value)}
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
