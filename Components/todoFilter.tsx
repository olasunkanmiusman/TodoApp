import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DateType } from "react-native-ui-datepicker";
import DateRangePicker from "./dateRangePicker";
import { formatDateRange } from "../utils/formatDateRange";

interface Props {
  selected: boolean | undefined;
  selectedDate: {
    startDate: DateType;
    endDate: DateType;
  };
  setSelected: (val: boolean | undefined) => void;
    setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      startDate: DateType;
      endDate: DateType;
    }>
  >;
}

const FilterSection: React.FC<Props> = ({
  selected,
  setSelected, setSelectedDate,
  selectedDate, 
}) => {
    const [showDate, setShowDate] = useState(false)
  return (
    <View>
      <View style={styles.row}>
        {/* Picker Container */}
        <View style={styles.pickerContainer}>
          <Picker 
            onValueChange={(value) => {
                value === "All" && setSelected(undefined)
                value === "Completed" && setSelected(true);
                value === "Uncompleted" && setSelected(false)
            }}
          >
            <Picker.Item label="All" value={"All"} />
            <Picker.Item label="Completed" value={"Completed"} /> 
            <Picker.Item label={"Uncompleted"} value={"Uncompleted"} /> 
          </Picker>
        </View>

        {/* Date Range Button */}
        <Pressable style={styles.dateButton} onPress={() => setShowDate(true)}>
          {selectedDate?.startDate && selectedDate.endDate ? (
            <Text style={styles.dateText}>
              {formatDateRange(selectedDate.startDate, selectedDate.endDate)}
            </Text>
          ) : (
            <View style={styles.datePlaceholder}>
              <Text style={styles.dateText}>Date Range </Text>
              <MaterialCommunityIcons name="calendar" size={18} />
            </View>
          )}
        </Pressable>
      </View>
      <DateRangePicker
        setShowDate={setShowDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showDate={showDate}
      />
    </View>
  );
};

export default FilterSection;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8, // gap-x-1 equivalent
  },
  pickerContainer: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#D1D5DB", // gray-300
    borderRadius: 8,
    overflow: "hidden",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    width: "40%",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    overflow: "hidden",
  },
  datePlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    lineHeight: 20,
  },
});
