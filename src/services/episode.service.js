import axios from "axios";

class EpisodeService {
    constructor() {
    }

      async getEpisodeInfo() {
        const responseEpisode = await axios.get(
          "https://rickandmortyapi.com/api/episode"
        );
        const { info, results } = responseEpisode.data;
        const infoPage = info["next"];
        let arr = [].concat(
          results.map((result) => ({ id: result.id, episode: result.episode }))
        );

        return await this.loadNextEpisodePage(infoPage, arr); 
      }
  
      async loadNextEpisodePage(dataPage, arrIdEpisode) {
        if ((dataPage || []).length > 0) {
          const responseEpisode = await axios.get(dataPage);
          const { info, results } = responseEpisode.data;
          const infoPage = info["next"];
          arrIdEpisode = arrIdEpisode.concat(
            results.map((result) => ({
              id: result.id,
              episode: result.episode,
            }))
          );
          return await this.loadNextEpisodePage(infoPage, arrIdEpisode);
        } else {
          return arrIdEpisode;
        }
      }
}

export default new EpisodeService();