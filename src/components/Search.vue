<template>
  <div class="d-flex flex-row flex-wrap mt-5" id="search-component">
    <div class="main-logo text-left">
      <img
        class="mb-4"
        alt="Rick_Morty_logo"
        src="../assets/Rick_Morty_logo.png"
        id="logo-content"
      />
    </div>
    <div class="panel-search ml-5 d-flex flex-row flex-nowrap">
      <div class="dropdown">
        <button
          class="dropdown-toggle search-drop-button rounded-left w-100"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Search by {{ searchBy }}
        </button>
        <ul
          class="dropdown-menu p-0 border-top-0 w-100"
          aria-labelledby="dropdownMenuButton1"
        >
          <li class="dropdown-item" @click="searchItems('Name')">
            Name
          </li>
          <div class="dropdown-divider m-0"></div>
          <li class="dropdown-item" @click="searchItems('Identifier')">
            Identifier
          </li>
          <div class="dropdown-divider m-0"></div>
          <li class="dropdown-item" @click="searchItems('Episode')">
            Episode
          </li>
        </ul>
      </div>
      <div class="d-flex flex-row ml-3">
        <input
          class="search-slt border-0"
          type="text"
          v-model="lookForCharacter"
          v-on:keyup="handleInputChange"
        />
        <i
          class="d-flex align-items-center bi bi-search mx-1"
          style="color: #11B0C8"
        ></i>
      </div>
      <div class="dropdown m-0 p-0">
        <button
          class="dropdown-toggle order-drop-button rounded-right w-100"
          role="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Order by {{ orderBy }}
        </button>
        <ul
          class="dropdown-menu p-0 w-100"
          aria-labelledby="dropdownMenuButton2"
        >
          <li class="dropdown-item" @click="orderItems('Name')">
            Name
          </li>
          <div class="dropdown-divider m-0"></div>
          <li class="dropdown-item m-0" @click="orderItems('Identifier')">
            Identifier
          </li>
          <div class="dropdown-divider m-0"></div>
          <li class="dropdown-item" @click="orderItems('Episode')">
            Episode
          </li>
        </ul>
      </div>
    </div>
    <!-- <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.id">
        {{ error.message }}
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      lookForCharacter: "",
      errors: [],
      orderBy: "Name",
      searchBy: "Name",
    };
  },

  watch: {
    lookForCharacter() {
      this.$emit("typeCharacter", this.lookForCharacter);
    },

    orderBy() {
      this.$emit("handleOrderChange", this.orderBy);
    },

    searchBy() {
      this.$emit("handleSearchChange", this.searchBy);
    },
  },

  methods: {
    searchItems(rule) {
      this.searchBy = rule;
    },

    orderItems(rule) {
      this.orderBy = rule;
    },
  },
};
</script>

<style scoped>
#search-component {
  border-bottom: 1px solid #e5eaf4;
}

.panel-search {
  font-weight: 500;
  line-height: 24px;
  height: 56px;
  width: 575px;
  border: 1px solid #a9b1bd;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  padding-right: 3px;
}

.main-logo {
  margin-left: 115px;
}

#logo-content {
  width: 240px;
  height: 70px;
}

.search-drop-button {
  color: rgba(169, 177, 189, 1);
  background-color: #fff;
  height: 54px;
  width: 165px;
  margin: 0px 6px;
  outline: none;
  border: 1px;
  border-style: none solid none none;
}

.search-slt {
  color: rgba(169, 177, 189, 1);
  background-color: #fff;
  height: 54px;
  width: 165px;
  border: 0px;
  outline: none;
}

.order-drop-button {
  color: rgba(169, 177, 189, 1);
  background-color: #fff;
  height: 54px;
  width: 165px;
  border: 1px;
  border-style: none none none solid;
  border-radius: 0px;
  outline: none;
  text-decoration: none;
}

.btn:hover {
  color: inherit;
  text-decoration: none;
}

.btn.dropdown-toggle.dropdown-toggle-split {
  color: rgba(169, 177, 189, 1);
}

ul {
  color: inherit;
  text-decoration: none;
  border: 1px;
  border-style: none solid solid solid;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  margin-top: -1px !important;
}

li {
  font-size: 16px;
  color: inherit;
  text-decoration: none;
  outline: none;
  line-height: 24px;
}

li:hover {
  color: white;
  background: #11b0c8;
  text-decoration: none;
  outline: none;
}
</style>
