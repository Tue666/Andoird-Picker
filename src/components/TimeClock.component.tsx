import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ConstantConfig } from '../config';
import { useTheme } from '../hooks';
import { globalStyles } from '../styles';
import { NumberUtil } from '../utils';
import Number from './Number.component';

const { BOX, MODAL, NUMBER } = ConstantConfig;
const { TIME_PICKER } = MODAL;

const CIRCLE_DEGREE = 360;

interface WheelValue {
	value: number;
	subValue?: number;
	visible?: boolean;
}

interface TimeClockProps {
	selected?: number;
	wheel: WheelValue[];
	numberSize?: number;
	zeroPrefix?: boolean;
	subZeroPrefix?: boolean;
	callback?: (value: number) => any;
}

const TimeClock = (props: TimeClockProps): React.JSX.Element => {
	const { selected, wheel, numberSize, zeroPrefix = true, subZeroPrefix = true, callback } = props;
	const { text, outline, secondary } = useTheme();
	const defaultNumberSize = numberSize || NUMBER.SIZE;
	const defaultSubNumberSize = defaultNumberSize / 1.5;
	const rotateDeg = CIRCLE_DEGREE / wheel.length;

	const onPressValue = (value: number) => {
		callback && callback(value);
	};
	return (
		<View style={[styles.container]}>
			<View style={[styles.dot, { backgroundColor: secondary?.main }]} />
			{wheel.map((item, index) => {
				const { value, subValue, visible = true } = item;
				const isValueSelected = value === selected;
				const isSubValueSelected = subValue !== undefined && subValue === selected;

				return (
					<View
						key={index}
						style={[
							styles.sector,
							{
								transform: [{ translateX: (defaultNumberSize / 2) * -1 }, { rotate: `${value * rotateDeg}deg` }],
								zIndex: visible ? value : 1,
							},
						]}
					>
						<View style={globalStyles.center}>
							<View>
								{isValueSelected && (
									<View
										style={[
											styles.sectorLine,
											{
												backgroundColor: secondary?.main,
												height: TIME_PICKER.CLOCK_SIZE / 2 - defaultNumberSize,
												transform: [
													{ translateX: defaultNumberSize / 2 - TIME_PICKER.LINE_SIZE / 2 },
													{ translateY: defaultNumberSize },
												],
											},
										]}
									/>
								)}
								<Number
									size={defaultNumberSize}
									value={visible ? (zeroPrefix ? NumberUtil.toZeroPrefix(value) : value) : undefined}
									isSelected={isValueSelected}
									style={[
										styles.sectorValue,
										{
											backgroundColor: isValueSelected ? secondary?.main : 'transparent',
											transform: [{ rotate: `-${value * rotateDeg}deg` }],
										},
									]}
									textStyle={[{ color: isValueSelected ? secondary?.contrastText : text }]}
									onPress={() => onPressValue(value)}
								/>
							</View>
							{visible && subValue !== undefined && (
								<View>
									{isSubValueSelected && (
										<View
											style={[
												styles.sectorLine,
												{
													backgroundColor: secondary?.main,
													height: TIME_PICKER.CLOCK_SIZE / 2 - (defaultNumberSize + defaultSubNumberSize),
													transform: [
														{ translateX: defaultSubNumberSize / 2 - TIME_PICKER.LINE_SIZE / 2 },
														{ translateY: defaultSubNumberSize },
													],
												},
											]}
										/>
									)}
									<Number
										size={defaultSubNumberSize}
										value={subZeroPrefix ? NumberUtil.toZeroPrefix(subValue) : subValue}
										style={[
											styles.sectorValue,
											{
												backgroundColor: isSubValueSelected ? secondary?.main : 'transparent',
												transform: [{ rotate: `-${value * rotateDeg}deg` }],
											},
										]}
										textStyle={[{ color: isSubValueSelected ? secondary?.contrastText : outline }]}
										onPress={() => onPressValue(subValue)}
									/>
								</View>
							)}
						</View>
					</View>
				);
			})}
		</View>
	);
};

// ========== Clock calculation ==========
// Clock    (C): Background of the clock
// Dot      (D): Dot in center
// Number   (N): Value display on clock
// Line     (L): Straight line as clock hands
const styles = StyleSheet.create({
	container: {
		position: 'relative',
		width: TIME_PICKER.CLOCK_SIZE,
		height: TIME_PICKER.CLOCK_SIZE,
		borderRadius: TIME_PICKER.CLOCK_SIZE / 2,
		marginVertical: BOX.MARGIN,
	},
	dot: {
		position: 'absolute',
		width: TIME_PICKER.DOT_SIZE,
		height: TIME_PICKER.DOT_SIZE,
		borderRadius: TIME_PICKER.DOT_SIZE / 2,

		// For center dot
		top: TIME_PICKER.CLOCK_SIZE / 2, // Half the size of (C)
		left: TIME_PICKER.CLOCK_SIZE / 2, // Half the size of (C)
		transform: [
			{ translateX: (TIME_PICKER.DOT_SIZE / 2) * -1 },
			{ translateY: (TIME_PICKER.DOT_SIZE / 2) * -1 },
		], // Negative half the size of (D)
	},
	sector: {
		position: 'absolute',
		height: TIME_PICKER.CLOCK_SIZE / 2, // Half the size of (C)
		left: TIME_PICKER.CLOCK_SIZE / 2, // Half the size of (C)
		transformOrigin: 'bottom center',
		// Combine with translateX to center, rotate to match position of the clock
	},
	sectorLine: {
		position: 'absolute',
		width: TIME_PICKER.LINE_SIZE,
	},
	sectorValue: {
		margin: 0,
	},
	sectorValueInvisible: {
		width: TIME_PICKER.INVISIBLE_DOT_SIZE,
		height: TIME_PICKER.INVISIBLE_DOT_SIZE,
		borderRadius: TIME_PICKER.INVISIBLE_DOT_SIZE / 2,
	},
});

export default TimeClock;
