const CONST = {
  storage: 'rss-game-score-storage',
};

export default class ScoreService {
  store(results) {
    if (results) {
      const scores = this.load();
      scores.push({
        name: results.nickName,
        level: results.level,
      });
      this._save(scores);
    }
  }

  load() {
    const scores = localStorage.getItem(CONST.storage);
    if (!scores) {
      return this._save([]);
    }
    return JSON.parse(scores);
  }

  _save(scores) {
    localStorage.setItem(CONST.storage, JSON.stringify(scores));
    return scores;
  }
}
