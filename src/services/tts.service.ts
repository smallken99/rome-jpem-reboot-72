import { audioDB } from '@/lib/audioDB';

// Voice types and options
export type VoiceGender = 'NEUTRAL' | 'MALE' | 'FEMALE';

export interface VoiceOptions {
  languageCode?: string;
  gender?: VoiceGender;
  name?: string;
  pitch?: number; // -20.0 to 20.0
  speakingRate?: number; // 0.25 to 4.0
}

const VOICE_SETTINGS_KEY = 'voice_settings';

interface VoiceSettings {
  selectedVoice: string;
  pitch: number;
  speed: number;
}

export class TTSService {
  private audioContext: AudioContext | null = null;
  private apiKey: string;
  private ENV: string;
  private hostUrl: string;
  private defaultVoiceOptions: VoiceOptions = {
    languageCode: 'en-US',
    gender: 'NEUTRAL',
    name: 'en-US-Standard-A',
    pitch: 0,
    speakingRate: 1
  };
  private initialized: boolean = false;

  constructor() {
    // 使用 REACT_APP_ 環境變數

    const ENV = "development"
    if(ENV === "development"){
      this.hostUrl = "http://127.0.0.1:5000" // 本地測試
    }else{
      this.hostUrl = "https://tts.smallken.ink" //private hostUrl = "" //正式環境 
    }
    

    // 在開發環境中提供更多資訊
    if (ENV === 'development') {
      console.log('Development mode: Using API Key from .env file');
    }

  }

  private loadSavedSettings() {
    if (typeof window === 'undefined') return;
    
    try {
      const savedSettings = localStorage.getItem(VOICE_SETTINGS_KEY);
      if (savedSettings) {
        const settings: VoiceSettings = JSON.parse(savedSettings);
        this.defaultVoiceOptions = {
          ...this.defaultVoiceOptions,
          name: settings.selectedVoice,
          pitch: settings.pitch,
          speakingRate: settings.speed,
        };
      }
      this.initialized = true;
    } catch (error) {
      console.error('Error loading voice settings:', error);
    }
  }

  // 確保在使用服務之前初始化設定
  private ensureInitialized() {
    if (!this.initialized) {
      this.loadSavedSettings();
    }
  }

  private async getAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setDefaultVoiceOptions(options: Partial<VoiceOptions>) {
    this.ensureInitialized();
    this.defaultVoiceOptions = {
      ...this.defaultVoiceOptions,
      ...options
    };
  }

  async speak(text: string, options?: Partial<VoiceOptions>) {
    this.ensureInitialized();
    const voiceOptions = { ...this.defaultVoiceOptions, ...options };
    const cacheKey = `${text}-${voiceOptions.languageCode}-${voiceOptions.name}-${voiceOptions.pitch}-${voiceOptions.speakingRate}`;

    try {
      const cachedAudio = await audioDB.get(cacheKey);
      if (cachedAudio) {
        const audioContext = await this.getAudioContext();
        const arrayBuffer = await cachedAudio.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
        return new Promise<void>((resolve) => {
          source.onended = () => resolve();
        });
      }
    } catch (error) {
      console.error('Error playing from cache:', error);
    }

    try {
      const requestBody = {
        text: text,
        language_code: voiceOptions.languageCode,
        voice_name: voiceOptions.name,
        speed: voiceOptions.speakingRate,
        pitch: voiceOptions.pitch
      };

      const response = await fetch(this.hostUrl+'/api/v2/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '轉換失敗');
      }

      const result = await response.json();
      const audioContent = atob(result.audioContent);
      const arrayBuffer = new ArrayBuffer(audioContent.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < audioContent.length; i++) {
        view[i] = audioContent.charCodeAt(i);
      }

      const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      await audioDB.set(cacheKey, audioBlob);

      const audioContext = await this.getAudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);

      return new Promise<void>((resolve) => {
        source.onended = () => resolve();
      });
    } catch (error) {
      console.error('Error in TTS service:', error);
      throw error;
    }
  }

  async speakExample(text: string, options?: Partial<VoiceOptions>) {
    return this.speak(text, options);
  }

  // 獲取可用的聲音列表
  async getVoices(): Promise<any> {
    try {
      const response = await fetch(
        this.hostUrl+'/api/v2/voices',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Error fetching voices:', error);
      throw error;
    }
  }

  // 取得 TTS base64 音訊資料
  async clearCache(text: string, options?: Partial<VoiceOptions>) {
    this.ensureInitialized();
    const voiceOptions = { ...this.defaultVoiceOptions, ...options };
    const cacheKey = `${text}-${voiceOptions.languageCode}-${voiceOptions.name}-${voiceOptions.pitch}-${voiceOptions.speakingRate}`;
    try {
      await audioDB.delete(cacheKey);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

export const ttsService = new TTSService(); 