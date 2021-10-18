<template>
  <Search
    @typeCharacter="typeChar($event)"
    @handleOrderChange="changeOrder($event)"
    @handleSearchChange="changeSearch($event)"
  />
  <div id="nav">
    <router-link to="/" class="mr-5">All Characters</router-link>
    <router-link to="/favorites">Favorites</router-link>
  </div>
  <Table
    :lookForCharacter="lookForCharacter"
    :orderBy="orderBy"
    :searchBy="searchBy"
  />
  <!-- <router-view /> -->
</template>

<script>
import Search from "./components/Search.vue";
import Table from "./components/Table.vue";

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
    Table,
    Search,
  },

  methods: {
    typeChar(data) {
      this.lookForCharacter = data;
    },

    changeOrder(data) {
      this.orderBy = data;
    },

    changeSearch(data) {
      this.searchBy = data;
    },
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

#nav {
  margin-left: 120px;
  height: 50%;
  padding: 30px 0px;
}

#nav a {
  font-weight: bold;
  color: rgba(169, 177, 189, 1);
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #11b0c8;
  border-bottom: 3px solid #11b0c8;
  padding-bottom: 3px;
}
</style>
