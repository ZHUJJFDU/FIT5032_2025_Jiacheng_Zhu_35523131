<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button" :disabled="loading">
          {{ loading ? 'Loading...' : 'Search' }}
        </button>
        <br>
        <br>
        Please implement "Search Weather by City".
      </div>
    </div>
 
    <main>
      <!-- Loading state -->
      <div v-if="loading" class="loading">
        <p>Loading weather data...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      
      <!-- Weather data -->
      <div v-else-if="weatherData">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div> 
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
      
      <!-- Initial state -->
      <div v-else class="initial-state">
        <p>Enter a city name to search for weather information</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "9195856cb407b63ba57b88a90d071149";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
      error: null,
      loading: false
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    //Get the current weather icon using the API link
    iconUrl() {
      return this.weatherData
        ? `https://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
 
    async fetchCurrentLocationWeather() {
      this.loading = true;
      this.error = null;
   
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          //API link to obtain the current weather based on the current location browser identified 
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          //await means wait for the fetchWeatherData method to complete before proceeding
          await this.fetchWeatherData(url);
        }, (error) => {
          console.error("Geolocation error:", error);
          this.error = "Unable to get your location. Please search for a city instead.";
          this.loading = false;
        });
      } else {
        this.error = "Geolocation is not supported by this browser.";
        this.loading = false;
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        //Returned data from API is stored as JSON file in weatherData
        this.weatherData = response.data;
        this.error = null;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.error = "Error fetching weather data. Please check your internet connection and try again.";
        this.weatherData = null;
      } finally {
        this.loading = false;
      }
    },
    searchByCity() {
      if (this.city.trim()) {
        this.loading = true;
        this.error = null;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.city)}&appid=${apikey}`;
        this.fetchWeatherData(url);
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.search-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.search-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

main {
  text-align: center;
}

main h2 {
  color: #333;
  margin-bottom: 15px;
}

main img {
  width: 100px;
  height: 100px;
}

main p {
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

main span {
  font-size: 1.2em;
  color: #666;
}

.loading {
  padding: 20px;
  color: #666;
}

.error {
  padding: 20px;
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 20px 0;
}

.initial-state {
  padding: 20px;
  color: #666;
  font-style: italic;
}
</style> 