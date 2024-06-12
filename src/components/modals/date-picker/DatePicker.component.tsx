import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ConstantConfig } from '../../../config';
import { useTheme } from '../../../hooks';
import { IPicker } from '../../../interfaces';
import { globalStyles, typographyStyles } from '../../../styles';
import { TimeUtil } from '../../../utils';
import DaySelect from './DaySelect.component';
import YearSelect from './YearSelect.component';

const { BOX, ICON, MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

interface DatePickerProps {
	visible: boolean;
	onCloseModal: () => void;
	date: IPicker.DatePicker;
	onChangeDatePicker?: (time: IPicker.DatePicker) => void;
}

const DatePicker = (props: DatePickerProps): React.JSX.Element => {
	const { visible, onCloseModal, date, onChangeDatePicker } = props;
	const now = new Date();
	const [yearVisible, setYearVisible] = useState(false);
	const [selectingDate, setSelectingDate] = useState({
		day: date?.day ?? now.getDate(),
		month: date?.month ?? now.getMonth() + 1, // Function returns 0-11 corresponding to 12 months
		year: date?.year ?? now.getFullYear(),
	});
	const { paper, text, outline } = useTheme();
	const disablePrev = TimeUtil.isMinAvailableYear(selectingDate.month, selectingDate.year);
	const disableNext = TimeUtil.isMaxAvailableYear(selectingDate.month, selectingDate.year);

	const onPressChangeYearVisible = () => {
		setYearVisible(!yearVisible);
	};
	const onSelectDate = (date: Partial<IPicker.DatePicker>) => {
		setSelectingDate({ ...selectingDate, ...date });
	};
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onCloseModal}>
			<TouchableOpacity style={[globalStyles.container]} onPress={onCloseModal}>
				<TouchableOpacity activeOpacity={1}>
					<View style={[globalStyles.center, styles.container, { backgroundColor: paper }]}>
						<View style={[globalStyles.fw, globalStyles.row, { justifyContent: 'space-between' }]}>
							<TouchableOpacity style={[globalStyles.row]} onPress={onPressChangeYearVisible}>
								<Text style={[typographyStyles.bold, { color: text }]}>
									{TimeUtil.toMonthText(selectingDate.month)} {selectingDate.year}
								</Text>
								<Icon
									name={!yearVisible ? 'caret-down' : 'caret-up'}
									size={ICON.SIZE}
									color={text}
									style={[styles.icon]}
								/>
							</TouchableOpacity>
							{!yearVisible && (
								<View style={[globalStyles.row]}>
									<TouchableOpacity
										disabled={disablePrev}
										onPress={() => onSelectDate(TimeUtil.jumpMonth(selectingDate.month, selectingDate.year, -1))}
									>
										<Icon
											name="chevron-left"
											size={ICON.SIZE}
											color={disablePrev ? outline : text}
											style={[styles.icon]}
										/>
									</TouchableOpacity>
									<TouchableOpacity
										disabled={disableNext}
										onPress={() => onSelectDate(TimeUtil.jumpMonth(selectingDate.month, selectingDate.year, 1))}
									>
										<Icon
											name="chevron-right"
											size={ICON.SIZE}
											color={disableNext ? outline : text}
											style={[styles.icon]}
										/>
									</TouchableOpacity>
								</View>
							)}
						</View>
						{!yearVisible && <DaySelect date={selectingDate} />}
						{yearVisible && <YearSelect year={selectingDate.year} />}
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		width: DATE_PICKER.WIDTH,
		padding: BOX.PADDING,
		borderRadius: BOX.BORDER_RADIUS,
	},
	icon: {
		padding: ICON.MARGIN,
	},
});

export default DatePicker;
