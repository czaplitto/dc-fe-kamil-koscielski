<template>
  <div id="nav">
    <router-link to="/" class="mr-5">All Characters</router-link>
    <router-link to="/favorites">Favorites</router-link>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
    };
  },
};
</script>

<style scoped>
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