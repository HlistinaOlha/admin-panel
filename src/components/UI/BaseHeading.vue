<template>
  <base-card v-if="base" :class="mode" class="card-title-container">
    <div class="card-container-wrapper d-flex justify-content-between">
      <h2 class="h2 card-title">{{ heading }}</h2>
    </div>
  </base-card>
  <base-card v-else-if="controls" :class="mode">
    <div class="controls command-controls d-flex justify-content-between">
      <h4 class="h4 card-title">{{ heading }}</h4>
      <base-button
        mode="outline"
        @click="action"
      >{{ buttonName }}
      </base-button>
    </div>
  </base-card>
  <base-card v-else-if="controlsExtended" :class="mode">
    <div class="controls-container">
      <div class="controls">
        <base-button
          v-if="link"
          :to="link"
          class="link"
          link
        >
          <font-awesome-icon
            :icon="['fas', 'arrow-left']"/>
          {{ linkName }}
        </base-button>
        <h2 v-if="link" class="h2">«{{ heading }}»</h2>
        <div v-else class="centered">
          <h2 class="h2">«{{ heading }}»</h2>
        </div>
        <base-button
          mode="outline"
          @click="action"
        >{{ buttonName }}
        </base-button>
      </div>
    </div>
  </base-card>
  <base-card v-else :class="mode">
    <div>
      <h4 class="h4 card-title">{{ heading }}</h4>
      <slot></slot>
    </div>
  </base-card>
</template>

<script>
export default {
  name: 'BaseHeading',
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    heading: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: false,
    },
    buttonName: {
      type: String,
      required: false,
    },
    linkName: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    base: {
      type: Boolean,
      required: false,
      default: false
    },
    controls: {
      type: Boolean,
      required: false,
      default: false
    },
    controlsExtended: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

.card-title-container {
  padding: 30px;
}

.card-container-wrapper .card-title {
  margin: 0 auto;
}

.centered {
  flex-grow: 1;
  text-align: center;
}
</style>
