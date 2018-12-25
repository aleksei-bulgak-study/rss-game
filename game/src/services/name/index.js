import nameConfig from './files/names.json';

export default class RandomNameGenerator {
  static build() {
    const firstName = RandomNameGenerator.getRandomValue(nameConfig.firstName);
    const lastName = RandomNameGenerator.getRandomValue(nameConfig.lastName);
    const middleName = RandomNameGenerator.getRandomValue(nameConfig.middleName);
    return `${firstName} ${lastName} ${middleName}`;
  }

  static getRandomValue(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}
