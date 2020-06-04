/* eslint-disable new-cap */
/* eslint-disable no-undef */
import { doRequest } from './index';

const voiceTrigger = document.querySelector('.microphone');

export default function sayItAloud(microphoneOn) {
    window.speechRecognition = window.SpeechRecognition
    || window.webkitSpeechRecognition
    || window.mozSpeechRecognition
    || window.msSpeechRecognition;
    const recognition = new (webkitSpeechRecognition
        || window.mozSpeechRecognition
        || window.msSpeechRecognition)();
    if (!microphoneOn) {
        recognition.abort();
        voiceTrigger.classList.remove('active');
        return;
    }
    const searchInput = document.querySelector('.search-field');
    voiceTrigger.classList.add('active');
    recognition.interimResults = false;
    recognition.lang = 'ru-RU';

    recognition.addEventListener('result', (e) => {
        const transcriptString = Array.from(e.results)
            .map(([result]) => result)
            .map(({ transcript }) => transcript)
            .join('');
        searchInput.value = transcriptString;
    });
    recognition.addEventListener('end', () => {
        voiceTrigger.classList.remove('active');
        if (searchInput.value !== '') {
            doRequest();
        }
    });
    recognition.start();
}
