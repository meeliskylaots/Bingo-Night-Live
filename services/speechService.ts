
import { NUMBER_TO_ESTONIAN } from '../constants';

export const speak = (number: number | null): void => {
  if (number === null || !('speechSynthesis' in window)) {
    return;
  }

  const textToSpeak = NUMBER_TO_ESTONIAN[number] || String(number);

  // Cancel any previous speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = 'et-EE'; // Set language to Estonian
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.1;

  window.speechSynthesis.speak(utterance);
};
