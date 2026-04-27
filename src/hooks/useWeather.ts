import { useState, useEffect, useCallback } from "react";

export type WeatherCondition = "clear" | "cloudy" | "rain" | "storm" | "fog" | "snow";

export interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  location: string;
  isLoading: boolean;
  error: string | null;
}

// WMO Weather interpretation codes mapping
function mapWeatherCode(code: number): WeatherCondition {
  if (code === 0 || code === 1) return "clear";
  if (code === 2 || code === 3) return "cloudy";
  if (code >= 45 && code <= 48) return "fog";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 95 && code <= 99) return "storm";
  return "clear";
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData>({
    condition: "clear",
    temperature: 0,
    location: "Memuat lokasi...",
    isLoading: true,
    error: null,
  });

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m&timezone=auto`
      );
      if (!response.ok) throw new Error("Gagal mengambil data cuaca");
      const data = await response.json();

      // Get location name using reverse geocoding
      let locationName = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
      try {
        const geoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=id`
        );
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          locationName =
            geoData.city ||
            geoData.locality ||
            geoData.principalSubdivision ||
            `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
        }
      } catch {
        // Fallback to coordinates
      }

      setWeather({
        condition: mapWeatherCode(data.current.weather_code),
        temperature: data.current.temperature_2m,
        location: locationName,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setWeather((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Terjadi kesalahan",
      }));
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      // Fallback to Jakarta
      fetchWeather(-6.2, 106.8);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        // Fallback to Jakarta on error
        fetchWeather(-6.2, 106.8);
      },
      { timeout: 10000 }
    );
  }, [fetchWeather]);

  return weather;
}

export function useRealTime() {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHour(now.getHours());
      setMinute(now.getMinutes());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Map hour (0-23) to timeOfDay (0-1)
  // 0 = midnight, 0.25 = 6am, 0.5 = noon, 0.75 = 6pm, 1 = midnight
  const timeOfDay = (hour + minute / 60) / 24;

  const getTimeLabel = () => {
    if (hour >= 5 && hour < 7) return "Fajar";
    if (hour >= 7 && hour < 11) return "Pagi";
    if (hour >= 11 && hour < 15) return "Siang";
    if (hour >= 15 && hour < 17) return "Sore";
    if (hour >= 17 && hour < 19) return "Senja";
    return "Malam";
  };

  return { hour, minute, timeOfDay, timeLabel: getTimeLabel() };
}
