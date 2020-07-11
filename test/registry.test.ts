import { Registry, RegistryConfig } from '../src';

describe('Registry.constructor', () => {
    it('creates a new Registry with the default configuration', () => {
        expect(new Registry()).toBeDefined();
        expect(new Registry({})).toBeDefined();
    });

    it('creates a new Registry with a custom configuration', () => {
        expect(
            new Registry({
                registry: 'https://registry.example.com',
                mirrors: ['https://mirror.example.com'],
                api: 'https://api.example.com',
                suggestionsAPI: 'https://suggestions.example.com',
                cache: false,
            })
        ).toBeDefined();
    });

    it('creates a new Registry matching the given configuration', () => {
        const config: RegistryConfig = {
            registry: 'https://registry.example.com',
            mirrors: ['https://mirror.example.com'],
            api: 'https://api.example.com',
            suggestionsAPI: 'https://suggestions.example.com',
            cache: false,
        };

        const registry = new Registry(config);
        expect({ ...registry }).toStrictEqual(config);
    });
});
