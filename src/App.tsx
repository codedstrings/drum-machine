import { useState, useEffect } from 'react'
import './App.css'
type DrumPad = {
  key: number;
  keyTrigger: string;
  id: string;
  url: string;
};

const bankOne: DrumPad[] = [
  { key: 1, keyTrigger: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 2, keyTrigger: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 3, keyTrigger: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 4, keyTrigger: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 5, keyTrigger: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 6, keyTrigger: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 7, keyTrigger: 'Z', id: "Kick-n'-Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 8, keyTrigger: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 9, keyTrigger: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
]

function App() {

  const [display, setDisplay] = useState('');

  const onDrumPadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const audio = e.currentTarget.querySelector('audio')!;
    playAudio(audio);
    setDisplay(e.currentTarget.id);
  }

const handleKeyPress = (e: KeyboardEvent) => {
    const pad = bankOne.find(p => p.keyTrigger === e.key.toUpperCase());//i didn't understand e.key.toUpperCase() tho..
    if (pad) {
      const audio = document.getElementById(pad.keyTrigger) as HTMLAudioElement;
      playAudio(audio);
      setDisplay(pad.id);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, []);



  const playAudio = (audioElement: HTMLAudioElement) => {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  return (
    <>
      <div id="drum-machine">
        <div id="display">{display}</div>
         {bankOne.map((pad) => (
            <button key={pad.key} className="drum-pad" id={pad.id} onClick={onDrumPadClick}>
              {pad.keyTrigger}
              <audio className="clip" id={pad.keyTrigger} src={pad.url}></audio>
            </button>
          ))}
      </div>
    </>
  )
}

export default App
