import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

const SoundContext = createContext(null);

// Base64 encoded tiny sound effects (very short, subtle UI sounds)
const SOUNDS = {
  hover: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Coverage3N0dnR0dnd4eHl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4ODg4eHh4uLi4+Pj5OTk5eXl5ubm5+fn6Ojo6enp6urq6+vr7Ozs7e3t7u7u7+/v8PDw8fHx8vLy8/Pz9PT09fX19vb29/f3+Pj4+fn5+vr6+/v7/Pz8/f39/v7+////",
  click: "data:audio/wav;base64,UklGRl9vT19teleQQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTtvT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Cmpubl5KNiIN+eXRwbGlnZGJgX15cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQEBAPz4+PT08Ozs6OTk4ODc2NjU1NDQzMjIxMTAwLy8uLi0tLCwrKysqKikpKCgoJycmJiUlJSQkIyMjIiIhISEgIB8fHx4eHh0dHRwcHBsbGxoaGhkZGRgYGBcXFxYWFhUVFRQUFBMTExISEhERERAQEA8PDw4ODg0NDQwMDAsLCwoKCgkJCQgICAcHBwYGBgUFBQQEBAMDAwICAgEBAQAAAA=="
};

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('scs-sound-enabled');
      return stored !== 'false';
    }
    return true;
  });
  
  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  const lastPlayedRef = useRef(0);

  useEffect(() => {
    // Preload sounds
    hoverAudioRef.current = new Audio(SOUNDS.hover);
    hoverAudioRef.current.volume = 0.15;
    clickAudioRef.current = new Audio(SOUNDS.click);
    clickAudioRef.current.volume = 0.2;
  }, []);

  useEffect(() => {
    localStorage.setItem('scs-sound-enabled', soundEnabled.toString());
  }, [soundEnabled]);

  const playHover = useCallback(() => {
    if (!soundEnabled || !hoverAudioRef.current) return;
    const now = Date.now();
    if (now - lastPlayedRef.current < 100) return; // Throttle
    lastPlayedRef.current = now;
    hoverAudioRef.current.currentTime = 0;
    hoverAudioRef.current.play().catch(() => {});
  }, [soundEnabled]);

  const playClick = useCallback(() => {
    if (!soundEnabled || !clickAudioRef.current) return;
    clickAudioRef.current.currentTime = 0;
    clickAudioRef.current.play().catch(() => {});
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playHover, playClick }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSounds() {
  const context = useContext(SoundContext);
  if (!context) {
    return { soundEnabled: false, toggleSound: () => {}, playHover: () => {}, playClick: () => {} };
  }
  return context;
}

// HOC for adding sound to buttons
export function SoundButton({ children, className, onClick, ...props }) {
  const { playHover, playClick } = useSounds();
  
  const handleClick = (e) => {
    playClick();
    onClick?.(e);
  };

  return (
    <button
      className={className}
      onMouseEnter={playHover}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Sound toggle component for footer
export function SoundToggle() {
  const { soundEnabled, toggleSound } = useSounds();
  
  return (
    <button
      onClick={toggleSound}
      className="text-sm text-[#5B5C60] hover:text-[#A9AAAC] transition-colors flex items-center gap-2"
      title={soundEnabled ? "Mute sounds" : "Enable sounds"}
    >
      {soundEnabled ? "🔊" : "🔇"} Sound
    </button>
  );
}