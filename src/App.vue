<template>
  <div>
    <PlaceManager :places="listOfPlaces" @changeList="addNewPlace" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import PlaceManager from "./components/PlaceManager.vue";
export default {
  components: { PlaceManager },
  setup() {
    const API_KEY = "4635d9ccd0aa7dd5a9ece42020bebb56";

    const weatherData = ref(null);
    const listOfPlaces = ref([]);

    const coordinates = ref({
      lat: 1,
      lon: 1,
    });

    const getURI = (coordinates) => `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`;

    const getWeatherByCoords = async () => {
      const response = await fetch(getURI(coordinates.value));
      if (response.ok) {
        const place = await response.json();
        // place.lastUpdated = Date.now();
        return place;
      } else {
        const err = await response.json();
        throw new Error(err.message);
      }
    };

    const addNewPlace = (place) => {
      listOfPlaces.value = place
    }

    onMounted(() => {
      if (!listOfPlaces.value.length) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            coordinates.value.lat = coords.latitude;
            coordinates.value.lon = coords.longitude;
            const place = await getWeatherByCoords()
            listOfPlaces.value.push(place);
            return;
          });
        } else {
          console.log("net dostupa");
        }
      }
      listOfPlaces.value.map((place) => {
        place.weather = getWeatherByPlace(place);
      });
    });

    const test = (e) => { console.log(e); }

    return {
      coordinates,
      getWeatherByCoords,
      weatherData,
      listOfPlaces,
      addNewPlace,
      test
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
