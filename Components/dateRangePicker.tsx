import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import DateTimePicker, {
  useDefaultStyles,
  DateType,
} from "react-native-ui-datepicker";

interface DateRangePickerProps {
  showDate: boolean;
  setShowDate: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: {
    startDate: DateType | undefined;
    endDate: DateType | undefined;
  };
  setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      startDate: DateType;
      endDate: DateType;
    }>
  >;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  showDate,
  setShowDate,
  selectedDate,
  setSelectedDate,
}) => {
  const defaultStyles = useDefaultStyles();

  return (
    <Modal
      visible={showDate}
      animationType="slide"
      transparent
      onRequestClose={() => setShowDate(false)}
    >
      <Pressable style={styles.overlay} onPress={() => setShowDate(false)}>
        <Pressable onPress={() => {}} style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Select Date Range</Text>
          </View>

          <DateTimePicker
            timePicker={true}
            use12Hours={true}
            mode="range"
            startDate={selectedDate.startDate}
            endDate={selectedDate.endDate}
            onChange={({ startDate, endDate }) =>
              setSelectedDate({ startDate, endDate })
            }
            styles={defaultStyles}
          />

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setSelectedDate({ startDate: "", endDate: "" })}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    height: "52%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    alignItems: "flex-end",
    marginTop: -8,
  },
  cancelText: {
    fontSize: 14,
    color: "#007AFF", // iOS primary blue
    fontWeight: "500",
  },
});

export default DateRangePicker;
