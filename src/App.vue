<template>
  <div class="weather-widget">
    <div class="weather-widget__loader">
      <TheLoader />
    </div>
    <Icon
      class="weather-widget__settings"
      size="18"
      @click="isSettingsOpen = !isSettingsOpen"
    >
      <Settings24Regular />
    </Icon>
    <div v-if="listOfPlaces.length">
      <div v-for="place in listOfPlaces" :key="place.id">
        <WeatherPresentation :data="place" />
      </div>
    </div>
    <div v-else>Тут пока ничего нет...</div>
    <PlaceManager
      v-if="isSettingsOpen"
      :places="listOfPlaces"
      @changeList="addNewPlace"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import PlaceManager from "./components/PlaceManager.vue";
import WeatherPresentation from "./components/WeatherPresentation.vue";
import TheLoader from "./components/TheLoader.vue";
import { Icon } from "@vicons/utils";
import Settings24Regular from "@vicons/fluent/Settings24Regular";
import { datca } from "./datca";
import { useLoading } from "@/store/loading";
import { getWeaterByPlace, getWeaterByCoords } from "./utils/fetchWeater";
import { Place, Coordinates } from "@/types/Place";

export default defineComponent({
  name: "App",
  components: {
    PlaceManager,
    Icon,
    Settings24Regular,
    WeatherPresentation,
    TheLoader,
  },
  setup() {
    const isSettingsOpen = ref(false);
    const weatherData = ref(null);
    const listOfPlaces = ref<Place[]>([]);
    const loading = useLoading();

    const coordinates = ref<Coordinates>({
      lat: 0,
      lon: 0,
    });

    const getWeatherByCoords = async (): Promise<Place> => {
      if (!loading.isLoading) loading.switchLoading();
      const response = await getWeaterByCoords(coordinates.value);
      if (response.ok) {
        const place = await response.json();
        loading.switchLoading();

        // place.lastUpdated = Date.now();
        return place;
      } else {
        loading.switchLoading();
        const err = await response.json();
        throw new Error(err.message);
      }
    };

    const addNewPlace = (placeArray: Place[]) => {
      listOfPlaces.value = placeArray;
    };

    onMounted(async () => {
      // listOfPlaces.value.push(datca);
      if (!listOfPlaces.value.length) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            coordinates.value.lat = coords.latitude;
            coordinates.value.lon = coords.longitude;
            const place = await getWeatherByCoords();
            listOfPlaces.value.push(place);
            return;
          });
        } else {
          console.log("net dostupa");
        }
      }
      listOfPlaces.value.map(async (place: Place) => {
        const response = await getWeaterByPlace(place.name);
        if (response.ok) {
          loading.switchLoading();
          const newPlace = await response.json();

          place = newPlace;
        } else {
          loading.switchLoading();
          const err = await response.json();
          throw new Error(err.message);
        }
      });
    });

    return {
      coordinates,
      getWeatherByCoords,
      weatherData,
      listOfPlaces,
      addNewPlace,
      isSettingsOpen,
    };
  },
});
</script>

<style lang="scss">
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
