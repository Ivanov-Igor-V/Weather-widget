<template>
  <div class="weather-widget">
    <div class="weather-widget__loader">
      <TheLoader />
    </div>
    <Icon class="weather-widget__settings" size="18" @click="isSettingsOpen = !isSettingsOpen">
      <Settings24Regular />
    </Icon>
    <div v-if="listOfPlaces.length">
      <div v-for="place in listOfPlaces" :key="place.id">
        <WeatherPresentation :data="place" />
      </div>
    </div>
    <div v-else>
      Тут пока ничего нет...
    </div>
    <PlaceManager v-if="isSettingsOpen" :places="listOfPlaces" @changeList="addNewPlace" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import PlaceManager from "./components/PlaceManager.vue";
import WeatherPresentation from "./components/WeatherPresentation.vue";
import TheLoader from "./components/TheLoader.vue";
import { Icon } from '@vicons/utils'
import Settings24Regular from '@vicons/fluent/Settings24Regular'
import { datca } from './datca'
import { useLoading } from '@/store/loading'
export default {
  components: {
    PlaceManager,
    Icon,
    Settings24Regular,
    WeatherPresentation,
    TheLoader
  },
  setup(props, { emit }) {
    const API_KEY = "4635d9ccd0aa7dd5a9ece42020bebb56";

    const isSettingsOpen = ref(false)

    const weatherData = ref(null);
    const listOfPlaces = ref([]);

    const loading = useLoading()

    const coordinates = ref({
      lat: null,
      lon: null,
    });

    const getURI = (coordinates) => `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`;

    const getWeatherByCoords = async () => {
      if (!loading.isLoading) loading.switchLoading()
      const response = await fetch(getURI(coordinates.value));
      if (response.ok) {
        const place = await response.json();
        loading.switchLoading()

        // place.lastUpdated = Date.now();
        return place;
      } else {
        loading.switchLoading()
        const err = await response.json();
        throw new Error(err.message);
      }
    };

    const addNewPlace = (place) => {
      listOfPlaces.value = place
    }

    onMounted(async () => {
      // listOfPlaces.value.push(datca);
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


    return {
      coordinates,
      getWeatherByCoords,
      weatherData,
      listOfPlaces,
      addNewPlace,
      isSettingsOpen
    };
  },
};
</script>

<style lang="scss" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 12px;
  color: white;
  max-width: 200px;

  .xicon {
    cursor: pointer;
  }
}

.weather-widget {
  position: relative;
  min-height: 200px;

  &__loader {
    position: absolute;
    top: -19px;
    left: 7px;
    z-index: 100;
  }

  &__settings {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
  }

}
</style>
