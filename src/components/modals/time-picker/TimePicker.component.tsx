import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConstantConfig } from '../../../config';
import { useTheme } from '../../../hooks';
import { IPicker } from '../../../interfaces';
import { globalStyles, typographyStyles } from '../../../styles';
import { NumberUtil } from '../../../utils';
import HourSelect from './HourSelect.component';
import MinuteSelect from './MinuteSelect.component';

const { BOX, MODAL } = ConstantConfig;
const { TIME_PICKER } = MODAL;

interface TimePickerProps {
	visible: boolean;
	onCloseModal: () => void;
	time?: IPicker.TimePicker;
	onChangeTimePicker?: (time: Omit<IPicker.TimePicker, 'suffix'>) => void;
}

const TimePicker = (props: TimePickerProps): React.JSX.Element => {
	const { visible, onCloseModal, time, onChangeTimePicker } = props;
	const now = new Date();
	const [selectingMode, setSelectingMode] = useState<IPicker.TimeMode>('hour');
	const [selectingTime, setSelectingTime] = useState({
		hour: time?.hour ?? now.getHours(),
		minute: time?.minute ?? now.getMinutes(),
	});
	const { paper, text, outline } = useTheme();

	const onSelectMode = (mode: IPicker.TimeMode) => {
		setSelectingMode(mode);
	};
	const onSelectTime = (time: Partial<IPicker.TimePicker>) => {
		setSelectingTime({ ...selectingTime, ...time });
	};
	const onPressConfirm = () => {
		onChangeTimePicker && onChangeTimePicker(selectingTime);
		onCloseModal();
	};
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onCloseModal}>
			<TouchableOpacity style={[globalStyles.container]} onPress={onCloseModal}>
				<TouchableOpacity activeOpacity={1}>
					<View style={[globalStyles.center, styles.container, { backgroundColor: paper }]}>
						<View style={[globalStyles.row]}>
							<Text
								style={[typographyStyles.large, { color: selectingMode === 'hour' ? text : outline }]}
								onPress={() => onSelectMode('hour')}
							>
								{NumberUtil.toZeroPrefix(selectingTime.hour)}
							</Text>
							<Text style={[typographyStyles.large, { color: outline }]}>:</Text>
							<Text
								style={[typographyStyles.large, { color: selectingMode === 'minute' ? text : outline }]}
								onPress={() => onSelectMode('minute')}
							>
								{NumberUtil.toZeroPrefix(selectingTime.minute)}
							</Text>
						</View>
						{selectingMode === 'hour' && (
							<HourSelect hour={selectingTime.hour} onSelectMode={onSelectMode} onSelectTime={onSelectTime} />
						)}
						{selectingMode === 'minute' && (
							<MinuteSelect minute={selectingTime.minute} onSelectTime={onSelectTime} />
						)}
						<View style={[globalStyles.fw, globalStyles.row, { justifyContent: 'space-between' }]}>
							<View />
							<View style={[globalStyles.row]}>
								<TouchableOpacity style={[styles.button]} onPress={onCloseModal}>
									<Text style={[typographyStyles.bold, styles.buttonText]}>cancel</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.button]} onPress={onPressConfirm}>
									<Text style={[typographyStyles.bold, styles.buttonText]}>ok</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		width: TIME_PICKER.WIDTH,
		padding: BOX.PADDING,
		borderRadius: BOX.BORDER_RADIUS,
	},
	button: {
		marginHorizontal: BOX.MARGIN / 2,
	},
	buttonText: {
		textTransform: 'uppercase',
		padding: BOX.PADDING / 2,
		color: 'red',
	},
});

export default TimePicker;
