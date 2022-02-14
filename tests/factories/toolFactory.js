import faker from 'faker-br';

export default function mockToolFactory() {
    const mockBody = {
        title: faker.internet.userName(),
        link: faker.internet.url(),
        description: faker.random.words(),
        tags: [faker.random.words()],
    };

    return mockBody;
}
