<template>
  <div class="weather-presentation">
    <div class="weather-presentation__city-name">
      {{ data.name }}, {{ data.sys.country }}
    </div>
    <div class="weather-presentation__main">
      <img
        :src="`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
        alt="weather"
      />
      <div class="weather-presentation__temperature">
        {{ data.main.temp.toFixed(1) }} C&deg;
      </div>
    </div>
    <div class="weather-presentation__description">
      Feels like: {{ data.main.feels_like.toFixed(0) }} C&deg;, cloud cover:
      {{ data.clouds.all }}
    </div>
    <div class="weather-presentation__table">
      <div>
        <div class="weather-presentation__wind-speed">
          Wind: {{ data.wind.speed }}&nbsp;m/s
        </div>
        <Icon>
          <KeyboardShift24Filled
            :style="{ transform: `rotate(${data.wind.deg}deg)` }"
          />
        </Icon>
      </div>
      <div class="weather-presentation__pressure">
        <Icon>
          <TopSpeed24Regular />
        </Icon>
        <div>{{ data.main.pressure }} hPa</div>
      </div>
      <div class="weather-presentation__humidity">
        humidity: {{ data.main.humidity }}
      </div>
      <div>visibility: {{ data.visibility / 1000 }} km</div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@vicons/utils";
import KeyboardShift24Filled from "@vicons/fluent/KeyboardShift24Filled";
import TopSpeed24Regular from "@vicons/fluent/TopSpeed24Regular";

export default {
  name: "WeatherPresentation",
  components: {
    KeyboardShift24Filled,
    Icon,
    TopSpeed24Regular,
  },
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-presentation {
  margin-top: 20px;
  max-width: 200px;
  border-radius: 10px;
  padding: 10px;
  height: 200px;
  background-color: rgb(8, 68, 197);
  font-size: 12px;

  &__main {
    display: flex;
    align-items: center;
  }

  &__description {
    text-align: start;
    display: inline-flex;
    margin-bottom: 15px;
  }

  &__table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 5px;
    font-size: 10px;

    div {
      display: inline-flex;
      white-space: pre;
    }
  }

  &__wind-speed {
    white-space: pre;
  }

  &__city-name {
    font-size: 16px;
  }

  &__temperature {
    font-size: 20px;
  }

  &__pressure {
    gap: 10px;
    align-items: center;
  }
}

// .inline {
//     display: inline-flex;
//     white-space: pre;
// }
</style>
