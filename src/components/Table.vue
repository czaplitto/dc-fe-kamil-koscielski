<template>
  <div>
    <bounce-loader
      class="d-flex justify-content-center"
      v-if="(characters || []).length < 1"
      :color="'#11b0c8'"
      :size="'35em'"
    ></bounce-loader>
    <div v-else>
      <table class="table">
        <thead class="thead">
          <tr class="character-head">
            <th class="border-0"></th>
            <th scope="col" class="border-0 align-middle">Photo</th>
            <th scope="col" class="border-0 align-middle">Character ID</th>
            <th scope="col" class="border-0 align-middle">Name</th>
            <th scope="col" class="border-0 align-middle">Gender</th>
            <th scope="col" class="border-0 align-middle">Species</th>
            <th scope="col" class="border-0 align-middle">Last Episode</th>
            <th scope="col" class="border-0 align-middle">Add To Favorites</th>
          </tr>
        </thead>
        <tbody class="character-content">
          <tr v-for="character in filterCharacter" v-bind:key="character.id">
            <th scope="row"></th>
            <td class="align-middle">
              <img class="w-75" :src="character.image" />
            </td>
            <td class="align-middle">{{ character.id }}</td>
            <td class="align-middle">{{ character.name }}</td>
            <td class="align-middle">
              <i :class="[addGenderIcon(character.gender)]"></i>
              {{ character.gender }}
            </td>
            <td class="align-middle">{{ character.species }}</td>
            <td class="align-middle">
              {{
                (character["lastEpisode"] || []).length > 0
                  ? character.lastEpisode
                  : "Unknown"
              }}
            </td>
            <td class="align-middle">
              <button
                id="icon-border"
                v-bind:style="[handleStyleFavour(character.id)]"
                @click="
                  addToFavorites(character);
                  toggleClass(character.id);
                "
              >
                <i class="bi bi-star-fill w-75"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="offset">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="d-flex flex-row align-items-center">
            <button
              type="button"
              class="page-link"
              v-if="pages.length >= 3"
              :disabled="page === 1"
              @click="page--"
            >
              <i
                class="bi bi-caret-left-fill"
                :style="[styleDisabledPrevButton()]"
              ></i>
            </button>

            <button
              type="button"
              class="page-link"
              @click="page = 1"
              v-if="page > 1"
            >
              1
            </button>
            <button
              type="button"
              class="page-link"
              @click="page -= 2"
              v-if="page > 3 && pages.length > 3"
            >
              <i class="bi bi-three-dots"></i>
            </button>
            <button
              type="button"
              class="page-link"
              v-for="pageNumber in displayNumPages"
              :key="pageNumber"
              @click="page = pageNumber"
              :style="[styleLoadedPage(pageNumber)]"
            >
              {{ pageNumber }}
            </button>
            <button
              type="button"
              class="page-link"
              @click="page += 4"
              v-if="page < pages.length - 5 && pages.length > 4"
            >
              <i class="bi bi-three-dots"></i>
            </button>
            <button
              type="button"
              class="page-link"
              @click="page = pages[pages.length - 1]"
              v-if="page < pages.length - 3 && pages.length > 3"
            >
              {{ pages.length }}
            </button>
            <button
              type="button"
              class="page-link"
              @click="page++"
              v-if="pages.length >= 3"
              :disabled="page === pages.length"
            >
              <i
                class="bi bi-caret-right-fill"
                :style="[styleDisabledNextButton()]"
              ></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <!-- <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.id">
        {{ error.message }}
      </li>
    </ul> -->
  </div>
</template>

<script>
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import CharacterService from "../services/character.service.js";
import EpisodeService from "../services/episode.service.js";

export default {
  data() {
    return {
      checkedNames: [],
      characters: [],
      isActive: [],
      errors: [],
      page: 1,
      perPage: 20,
      pages: [],
      styleFavorite: {
        "background-color": "#11B0C8",
        color: "white",
      },
      styleNotFavorite: {
        "background-color": "white",
        color: "#11B0C8",
      },
      disabledButton: {
        color: "rgba(169, 177, 189, 1)",
      },
      activePrevNextButton: {
        color: "#11b0c8",
      },
    };
  },
  components: {
    BounceLoader,
  },

  props: ["lookForCharacter", "orderBy", "searchBy"],

  async created() {
    try {
      this.characters = await CharacterService.getCharacters();
      this.orderItems();
      this.episodeInfo = await EpisodeService.getEpisodeInfo();
      this.mergeCharacterEpisode();
    } catch (error) {
      this.errors.push(error);
    }
  },

  mounted() {
    try {
      this.handleLocalStorage();
    } catch (error) {
      this.errors.push(error);
      localStorage.removeItem("favorites");
    }
  },

  watch: {
    orderBy() {
      this.orderItems();
      this.firstPage();
    },

    lookForCharacter() {
      this.firstPage();
    },

    searchBy() {
      this.compareInput();
    },

    $route() {
      this.firstPage();
    },
  },

  methods: {
    mergeCharacterEpisode() {
      this.characters.map((oneInfo) => {
        const lastItem = oneInfo.episode[oneInfo.episode.length - 1];
        const num = lastItem.lastIndexOf("/");
        const numOfEpisode = +lastItem.substring(num + 1);

        this.episodeInfo.forEach((info) => {
          if (info.id === numOfEpisode) {
            oneInfo = Object.assign(oneInfo, {
              lastEpisode: info.episode,
            });
          }
        });
        return oneInfo;
      });
    },

    checkLocalStorage() {
      if (typeof Storage === "undefined")
        throw new Error("The file cannot be stored locally");
    },

    handleLocalStorage() {
      this.checkLocalStorage();

      if (localStorage.getItem("favorites")) {
        this.checkedNames = JSON.parse(localStorage.getItem("favorites"));
        this.orderItems();
        this.isActive = this.checkedNames.map((favorite) => favorite.id);
      }
    },

    toggleClass(id) {
      try {
        if (this.isActive.includes(id)) {
          this.isActive = this.isActive.filter((activeId) => activeId !== id);
        } else {
          this.isActive.push(id);
        }
      } catch (error) {
        console.log(error);
      }
    },

    addToFavorites(elem) {
      try {
        this.checkLocalStorage();
        if (
          (
            this.checkedNames.filter(
              (checkedName) => checkedName.id === elem.id
            ) || []
          ).length > 0
        ) {
          this.checkedNames = this.checkedNames.filter(
            (checkedName) => checkedName.id !== elem.id
          );
        } else {
          this.checkedNames.push(elem);
        }

        if ((this.checkedNames || []).length > 0) {
          localStorage.setItem("favorites", JSON.stringify(this.checkedNames));
          this.orderItems();
        } else {
          localStorage.removeItem("favorites");
        }
      } catch (error) {
        console.log(error);
      }
    },

    addGenderIcon(gender) {
      switch (gender) {
        case "Male":
          return "bi bi-gender-male";
        case "Female":
          return "bi bi-gender-female";
        case "Genderless":
          return "bi bi-x";
        default:
          return "bi bi-dash-lg";
      }
    },

    setPages(currentNum) {
      const numberOfPages = Math.ceil((currentNum || []).length / this.perPage);
      this.pages = Array.from(Array(numberOfPages + 1).keys()).slice(1);
    },

    paginate(posts) {
      const page = this.page;
      const perPage = this.perPage;
      const from = page * perPage - perPage;
      const to = page * perPage;
      return posts.slice(from, to);
    },

    handleStyleFavour(id) {
      return this.isActive.includes(id)
        ? this.styleFavorite
        : this.styleNotFavorite;
    },

    styleDisabledPrevButton() {
      return this.page === 1
        ? { color: "rgba(169, 177, 189, 1)" }
        : { color: "#11b0c8" };
    },

    styleDisabledNextButton() {
      return this.page === this.pages.length
        ? { color: "rgba(169, 177, 189, 1)" }
        : { color: "#11b0c8" };
    },

    styleLoadedPage(pageNum) {
      if (this.page === pageNum)
        return { "background-color": "#11b0c8", color: "white" };
    },

    firstPage() {
      this.page = 1;
    },

    compareInputName(data) {
      return data.filter((search) =>
        search.name.toLowerCase().includes(this.lookForCharacter.toLowerCase())
      );
    },

    compareInputEpisode(data) {
      return data.filter((search) => {
        let { lastEpisode } = search;
        return (
          lastEpisode.length >= this.lookForCharacter.length &&
          [...lastEpisode]
            .slice(0, this.lookForCharacter.length)
            .every(
              (char, index) =>
                char.toLowerCase() ===
                this.lookForCharacter[index].toLowerCase()
            )
        );
      });
    },

    compareInputId(data, arr) {
      return data.filter((search) => {
        let arrId = [...search.id.toString()];
        return (
          arrId.length >= arr.length &&
          arrId.slice(0, arr.length).every((num, index) => num === arr[index])
        );
      });
    },

    compareInput() {
      try {
        let dataToCompare =
          this.$route.path === "/favorites"
            ? this.checkedNames
            : this.characters;
        let rule = this.searchBy;
        if (rule === "Name") {
          let result = this.compareInputName(dataToCompare);
          this.setPages(result);
          return this.paginate(result);
        } else if (rule === "Episode") {
          let result = [];
          let arrInput = [...this.lookForCharacter.toString()];
          if (arrInput.length === 0) {
            result = dataToCompare;
          } else {
            result = this.compareInputEpisode(dataToCompare);
          }
          this.setPages(result);
          return this.paginate(result);
        } else {
          let result = [];
          let arrInput = [...this.lookForCharacter.toString()];
          if (arrInput.length === 0) {
            result = dataToCompare;
          } else {
            result = this.compareInputId(dataToCompare, arrInput);
          }
          this.setPages(result);
          return this.paginate(result);
        }
      } catch (error) {
        console.log(error);
      }
    },

    orderEpisode(items, rule) {
      return items.sort((a, b) =>
        a[rule].localeCompare(b[rule], undefined, {
          numeric: true,
        })
      );
    },

    orderIdName(items, rule) {
      return items.sort((a, b) =>
        a[rule] > b[rule] ? 1 : b[rule] > a[rule] ? -1 : 0
      );
    },

    orderItems() {
      try {
        let rule = this.orderBy;
        const ruleSmallLetter =
          rule === "Identifier"
            ? "id"
            : rule === "Episode"
            ? "lastEpisode"
            : rule.toLowerCase();

        if (ruleSmallLetter === "lastEpisode") {
          this.orderEpisode(this.checkedNames, ruleSmallLetter);
          this.orderEpisode(this.characters, ruleSmallLetter);
        } else {
          this.orderIdName(this.checkedNames, ruleSmallLetter);
          this.orderIdName(this.characters, ruleSmallLetter);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    filterCharacter() {
      return this.compareInput();
    },

    displayNumPages() {
      if (this.page === 3) {
        return this.pages.slice(1, this.page + 2);
      } else if (
        this.pages[this.pages.length - 1] - this.page < 3 &&
        this.pages.length > 5
      ) {
        return this.pages.slice(this.page - 2);
      } else if (this.pages[this.pages.length - 1] - this.page === 5) {
        return this.pages.slice(this.page - 1, -1);
      } else {
        return this.pages.slice(this.page - 1, this.page + 3);
      }
    },
  },
};
</script>

<style scoped>
.character-head {
  background-color: rgba(229, 234, 244, 0.25);
  color: rgba(169, 177, 189, 1);
}

.character-content {
  color: rgba(169, 177, 189, 1);
  line-height: 22px;
}

#icon-border {
  height: 43px;
  width: 43px;
  border: 2px solid #11b0c8;
  box-sizing: border-box;
  border-radius: 8px;
}

th {
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  height: 54px;
  width: 1920px;
}

tr {
  height: 68px;
  width: 1274px;
}

td {
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
}

button.page-link {
  font-size: 16px;
  color: rgba(169, 177, 189, 1);
  font-weight: 500;
  margin: 0px 8px;
  padding: 0px;
  width: 40px;
  height: 40px;
  border: 1px solid #a9b1bd;
  box-sizing: border-box;
  border-radius: 4px;
}

button.page-link:hover {
  color: #11b0c8;
}

.offset {
  color: rgba(169, 177, 189, 1);
  width: 376px;
  margin-left: 106px;
}
</style>
