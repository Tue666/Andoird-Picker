import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConstantConfig } from '../../../config';
import { useTheme } from '../../../hooks';
import { globalStyles, typographyStyles } from '../../../styles';
import HourSelect from './HourSelect.component';

const { BOX, MODAL } = ConstantConfig;
const { TIME_PICKER } = MODAL;

interface TimePickerProps {
	visible: boolean;
	onCloseModal: () => void;
}

const TimePicker = (props: TimePickerProps): React.JSX.Element => {
	const { visible, onCloseModal } = props;
	const { paper, text, outline } = useTheme();

	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onCloseModal}>
			<TouchableOpacity style={[globalStyles.container]} onPress={onCloseModal}>
				<TouchableOpacity activeOpacity={1}>
					<View style={[globalStyles.center, styles.container, { backgroundColor: paper }]}>
						<View style={[globalStyles.row]}>
							<Text style={[typographyStyles.large, { color: text }]}>09</Text>
							<Text style={[typographyStyles.large, { color: outline }]}>:</Text>
							<Text style={[typographyStyles.large, { color: outline }]}>40</Text>
						</View>
						<HourSelect />
						<View style={[globalStyles.fw, globalStyles.row, { justifyContent: 'space-between' }]}>
							<View />
							<View style={[globalStyles.row]}>
								<TouchableOpacity style={[styles.button]} onPress={onCloseModal}>
									<Text style={[typographyStyles.bold, styles.buttonText]}>cancel</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.button]}>
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
