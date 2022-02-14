import faker from 'faker-br';

export default function mockToolFactory() {
    const mockBody = {
        title: faker.internet.userName(),
        link: faker.internet.url(),
        description: faker.random.words(),
        tags: [faker.random.words()],
    };

<<<<<<< HEAD
=======
    console.log(mockBody);

>>>>>>> f86514a1e1d5950eb4af11222e972eaf592c7194
    return mockBody;
}
