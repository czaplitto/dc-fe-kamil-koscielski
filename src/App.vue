<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      orderBy: "Name",
      searchBy: "Name",
      lookForCharacter: "",
    };
  },
  components: {
  },

  methods: {
  },
};
</script>

<style>
#app {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: rgba(169, 177, 189, 1);
  background-color: rgba(255, 255, 255, 1);
}
</style>
