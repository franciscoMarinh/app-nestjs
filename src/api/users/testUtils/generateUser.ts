import faker from 'faker';

class TestUtils {
  static generateUser() {
    return {
      name: faker.internet.userName(),
      username: faker.internet.userName(),
      website: faker.lorem.text(),
      id: faker.random.uuid(),
    };
  }

  static generateArrayOfUsers = () => {
    faker.random
      .arrayElements(faker.random.number(10))
      .map(TestUtils.generateUser);
  };
}

export default TestUtils;
