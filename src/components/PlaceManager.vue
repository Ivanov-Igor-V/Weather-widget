<template>
  <div>
    <div v-if="places.length">
      <draggable v-model="getPlaces" item-key="id">
        <template #item="{ element }">
          <div>
            <div> {{ element.name }} </div>
            <button>
              x
            </button>
          </div>
        </template>
        <template #header>
          <button @click="makeInputVisible">Add</button>
        </template>
      </draggable>
      <div v-if="isInputVisible">
        <input type="search" v-model="newPlace" />
        <button @click="appPlace">Ок</button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { computed, ref } from 'vue'
export default {
  name: 'PlaceManager',
  components: { draggable },
  props: {
    places: {
      type: Array,
    },
  },
  setup(props, { emit }) {

    const getPlaces = computed({
      get: () => [...props.places],
      set: (val) => { emit("changeList", val) },
    })

    const API_KEY = "4635d9ccd0aa7dd5a9ece42020bebb56";


    const getURI = (newPlace) => `http://api.openweathermap.org/data/2.5/weather?q=${newPlace}&units=metric&APPID=${API_KEY}`;

    const isInputVisible = ref(false)

    const makeInputVisible = () => {
      isInputVisible.value = true
    }

    const appPlace = async () => {
      if (getPlaces.value.some(placeOfList => { return placeOfList.name.toLowerCase() === newPlace.value.toLowerCase() })) return alert('already added')
      const response = await fetch(
        getURI(newPlace.value)
      );

      if (response.ok) {
        const newPlace = await response.json()

        getPlaces.value = [...getPlaces.value, newPlace]
      } else {
        const err = await response.json();
        throw new Error(err.message);
      }
    }

    const newPlace = ref('')

    const test = ref([
      { name: 'dsa' },
      { name: 'dsa1' },
      { name: 'dsa2' },
    ])

    return {
      getPlaces, test, newPlace, makeInputVisible, isInputVisible, appPlace
    }
  }
};
</script>

<style scoped lang="scss"></style>