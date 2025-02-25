// Create an audio context for better sound management
let audioContext;

// Cache for loaded sounds
const soundCache = new Map();

// Initialize audio context on first user interaction
export const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
};

// Load and cache a sound
const loadSound = async (soundUrl) => {
  if (soundCache.has(soundUrl)) {
    return soundCache.get(soundUrl);
  }

  try {
    const response = await fetch(soundUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    soundCache.set(soundUrl, audioBuffer);
    return audioBuffer;
  } catch (error) {
    console.error(`Error loading sound ${soundUrl}:`, error);
    return null;
  }
};

// Play a sound with child-friendly volume
export const playSound = async (soundUrl) => {
  if (!audioContext) {
    initAudio();
  }

  const audioBuffer = await loadSound(soundUrl);
  if (!audioBuffer) return;

  const source = audioContext.createBufferSource();
  const gainNode = audioContext.createGain();
  
  // Set volume to a child-friendly level (40%)
  gainNode.gain.value = 0.4;
  
  source.buffer = audioBuffer;
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  source.start(0);
};
