<template>
  <div class="place-manager">
    <div v-if="places.length">
      <div class="place-manager__header">Settings</div>
      <draggable v-model="getPlaces" item-key="id">
        <template #item="{ element }">
          <div class="place-manager__item">
            <div>{{ element.name }}</div>
            <Icon :size="18" @click="deletePlace(element.name)">
              <Delete24Regular />
            </Icon>
          </div>
        </template>
      </draggable>
      <div class="place-manager__footer">
        <TheInput type="search" v-model="newPlace" @confirm="appPlace" />
        <div v-if="error">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import TheInput from './TheInput.vue';
import { computed, ref, defineComponent, PropType } from 'vue';
import { Icon } from '@vicons/utils';
import Delete24Regular from '@vicons/fluent/Delete24Regular';
import { getWeaterByPlace } from '@/utils/fetchWeater';
import {
  putPlaceToStorage,
  removePlaceFromStorage,
  isStorageFilled,
} from '@/utils/storageHelper';
import { useLoading } from '@/store/loading';
import { Place } from '@/types/Place';

export default defineComponent({
  name: 'PlaceManager',
  components: { draggable, Icon, TheInput, Delete24Regular },
  props: {
    places: {
      type: Array as PropType<Place[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const getPlaces = computed({
      get: () => [...props.places],
      set: (val) => {
        emit('changeList', val);
      },
    });
    const loading = useLoading();

    const deletePlace = (name: string) => {
      getPlaces.value = getPlaces.value.filter(
        (place: Place): boolean => place.name !== name
      );
      removePlaceFromStorage(name);
    };

    const error = ref(null);

    const appPlace = async () => {
      if (!newPlace.value) return alert("field can't be empty");
      if (isStorageFilled()) return alert("Can't add more places");
      if (
        getPlaces.value.some((placeOfList: Place) => {
          return (
            placeOfList.name.toLowerCase() === newPlace.value.toLowerCase()
          );
        })
      )
        return alert('already added');

      loading.switchLoading(true);

      const response = await getWeaterByPlace(newPlace.value);

      if (response.ok) {
        loading.switchLoading(false);
        error.value = null;
        const place = await response.json();
        putPlaceToStorage(place.name);
        getPlaces.value = [...getPlaces.value, place];
        newPlace.value = '';
      } else {
        loading.switchLoading(false);
        const err = await response.json();
        error.value = err.message;
        throw new Error(err.message);
      }
    };

    const newPlace = ref('');

    return {
      getPlaces,
      newPlace,
      appPlace,
      deletePlace,
      error,
    };
  },
});
</script>

<style scoped lang="scss">
.place-manager {
  width: 100%;
  position: absolute;
  top: 0;
  border-radius: 10px;
  padding: 12px 0;
  background-color: rgb(8, 68, 197);
  height: 190px;

  &__header {
    margin-bottom: 10px;
  }

  &__item {
    display: inline-flex;
    justify-content: space-between;
    cursor: grab;
    border: 1px solid rgb(138, 165, 224);
    width: 70%;
    padding: 3px 5px;
    border-radius: 3px;
    margin-bottom: 3px;
    align-items: center;
  }

  &__footer {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
