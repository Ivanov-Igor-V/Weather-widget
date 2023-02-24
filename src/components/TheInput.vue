<template>
  <div class="my-input">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <Icon
      class="my-input__icon"
      size="16"
      color="green"
      @click="$emit('confirm')"
    >
      <ArrowReplyDown24Filled />
    </Icon>
  </div>
</template>

<script>
import { Icon } from "@vicons/utils";
import ArrowReplyDown24Filled from "@vicons/fluent/ArrowReplyDown24Filled";
export default {
  name: "TheInput",
  components: {
    ArrowReplyDown24Filled,
    Icon,
  },
  props: {
    modelValue: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.my-input {
  position: relative;
  width: 150px;
  display: inline-flex;
  justify-content: center;
  align-self: center;

  input {
    width: 100%;
    height: 20px;
    background: white;
    border: none;
    border-radius: 5px;
    color: black;
    transition: all 0.4s;
    padding: 3px 5px;

    &:active,
    &:focus-visible {
      outline: none;
    }

    &:hover,
    &:focus {
      outline: 2px solid rgb(28, 28, 136);
    }

    &:active {
      outline: 2px solid rgb(94, 94, 192);
    }
  }

  &__icon {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 50%;

    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }

    &:active {
      box-shadow: none;
      outline: 1px solid rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
