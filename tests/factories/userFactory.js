import faker from 'faker-br';

function mockUserFactory() {
    const mockBody = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    return mockBody;
}

function mockUserPassword() {
    return faker.internet.password();
}

export {
    mockUserFactory,
    mockUserPassword,
};
