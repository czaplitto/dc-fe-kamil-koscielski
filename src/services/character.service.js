import axios from "axios";

class CharacterService {
    constructor() {
    }
    async getCharacters() {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/`
        );
        const { info, results } = response.data;
        const infoPage = info["next"];
        let allCharacters = results;
        let uniqueNames = allCharacters.map((character) => character.name);
  
        return await this.loadNextCharacterPage(infoPage, allCharacters, uniqueNames);
    }
  
    async loadNextCharacterPage(dataPage, characters, names) {
      if ((dataPage || []).length > 0) {
        const response = await axios.get(dataPage);
        const { info, results } = response.data;
        const infoPage = info["next"];
  
        results.forEach((result) => {
          if (!names.includes(result.name)) {
            names.push(result.name);
            characters.push(result);
          }
        });
        
        return await this.loadNextCharacterPage(infoPage, characters, names);
      } else {
        return characters;
      }
    }
}

export default new CharacterService();