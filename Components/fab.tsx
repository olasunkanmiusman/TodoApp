import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition"; 
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { Todo } from "../interfaces/todo";
interface FABProps {
  setForm: React.Dispatch<React.SetStateAction<Todo[]>>;
  form: Todo[]
}

const FAB: React.FC<FABProps> = ({setForm, form}: FABProps) => { 
  
  const [transcript, setTranscript] = useState("");
const [isRecording, setIsRecording] = useState(false);
  useSpeechRecognitionEvent("start", () => setIsRecording(true));
  useSpeechRecognitionEvent("end", () => {setIsRecording(false);
    if(form[0].title === ""){
      setForm([]);
    }
    transcript.toLowerCase().split('and').forEach(trans  =>
   setForm(prevForm => [...prevForm, { title: trans}]))
   setTranscript('');
  });
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
  }); 
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  }); 
  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    } 
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: false,
    });
  };
  const stopRecording = async () => {
    ExpoSpeechRecognitionModule.stop()
  }
  return (
    <TouchableOpacity style={styles.fab}>
      <MaterialCommunityIcons
        
           onPress={isRecording ? stopRecording : handleStart}

        name={ isRecording ? "microphone" : "microphone-off"}
        size={28}
        color="white"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default FAB;