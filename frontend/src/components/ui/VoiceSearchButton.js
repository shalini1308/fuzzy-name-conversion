import React, { useState } from "react";
import { Mic } from "lucide-react";

const VoiceSearchButton = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false); // State to track if listening

  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          console.log("Speech recognition started");
          setIsListening(true); // Show blinking box
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log("Speech recognition result:", transcript);
          onVoiceInput(transcript); // Pass transcript to parent
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          alert(
            `An error occurred with speech recognition: ${event.error}. Please try again.`
          );
        };

        recognition.onend = () => {
          console.log("Speech recognition ended");
          setIsListening(false); // Hide blinking box
        };

        recognition.start();
      })
      .catch((error) => {
        console.error("Microphone access denied:", error);
        alert(
          "Microphone access denied. Please grant microphone permission and try again."
        );
      });
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        onClick={startVoiceSearch}
      >
        <Mic className="h-5 w-5" />
        <span className="ml-2">Voice Search</span>
      </button>

      {/* Blinking box */}
      {isListening && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-500 rounded-full animate-blink"></div>
      )}
    </div>
  );
};

export default VoiceSearchButton;


/*import React from "react";

const VoiceSearchButton = ({ onVoiceSearch }) => {
  const handleVoiceSearch = () => {
    // Check if the browser supports SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice search. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set recognition language
    recognition.interimResults = false; // Capture final results only

    recognition.onstart = () => {
      console.log("Voice recognition started. Speak now...");
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      alert("Error in voice recognition. Please try again.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get the transcribed text
      console.log("Voice recognized:", transcript);

      // Pass the transcribed text to the parent or perform the search
      if (onVoiceSearch) {
        onVoiceSearch(transcript); // Trigger the search function in the parent
      } else {
        alert(`Recognized: ${transcript}`);
      }
    };

    // Start the voice recognition
    recognition.start();
  };

  return (
    <button
      onClick={handleVoiceSearch}
      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-md"
    >
      <span>🎤</span>
      <span>Voice Search</span>
    </button>
  );
};

export default VoiceSearchButton;
*/