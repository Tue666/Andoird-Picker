import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ConstantConfig } from '../../../config';
import { useTheme } from '../../../hooks';
import { globalStyles, typographyStyles } from '../../../styles';
import DaySelect from './DaySelect.component';
import YearSelect from './YearSelect.component';

const { BOX, ICON, MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

interface DatePickerProps {
	visible: boolean;
	onCloseModal: () => void;
}

const DatePicker = (props: DatePickerProps): React.JSX.Element => {
	const { visible, onCloseModal } = props;
	const [yearVisible, setYearVisible] = useState(false);
	const { paper, text } = useTheme();

	const onPressChangeYearVisible = () => {
		setYearVisible(!yearVisible);
	};
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onCloseModal}>
			<TouchableOpacity style={[globalStyles.container]} onPress={onCloseModal}>
				<TouchableOpacity activeOpacity={1}>
					<View style={[globalStyles.center, styles.container, { backgroundColor: paper }]}>
						<View style={[globalStyles.fw, globalStyles.row, { justifyContent: 'space-between' }]}>
							<TouchableOpacity style={[globalStyles.row]} onPress={onPressChangeYearVisible}>
								<Text style={[typographyStyles.bold, { color: text }]}>August 2014</Text>
								<Icon
									name={!yearVisible ? 'caret-down' : 'caret-up'}
									size={ICON.SIZE}
									color={text}
									style={[styles.icon]}
								/>
							</TouchableOpacity>
							{!yearVisible && (
								<View style={[globalStyles.row]}>
									<TouchableOpacity>
										<Icon name="chevron-left" size={ICON.SIZE} color={text} style={[styles.icon]} />
									</TouchableOpacity>
									<TouchableOpacity>
										<Icon name="chevron-right" size={ICON.SIZE} color={text} style={[styles.icon]} />
									</TouchableOpacity>
								</View>
							)}
						</View>
						{!yearVisible && <DaySelect />}
						{yearVisible && <YearSelect />}
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
