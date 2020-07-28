const NewsService = {
  getRecentNews: async () => {
    const url = "http://newsapi.org/v2/top-headlines?";

    const params = {
      apiKey: "...",
      country: "br",
      sortBy: "popularity",
      q: "covid",
    };

    return await fetch(`${url + new URLSearchParams(params)}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "ok") {
          return response.articles;
        }
        return Promise.reject([response,"Falha no RecentNews"]);
      })
      .catch((err) => {
        console.warn(err);
        return [];
      });
  },
};
export default NewsService;
