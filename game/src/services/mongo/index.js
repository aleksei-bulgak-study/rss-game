
const CONST = {
  url: 'https://rss-facepalm.herokuapp.com/scores',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default class MongoScoreService {
  store(results) {
    if (results) {
      return fetch(CONST.url, {
        method: 'POST',
        headers: CONST.headers,
        body: JSON.stringify({
          name: results.nickName,
          level: results.level,
        }),
      });
    }
    return null;
  }

  load() {
    return fetch(CONST.url)
      .then(response => response.json());
  }
}
