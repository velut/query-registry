import debug from 'debug';

export const log = debug('query-registry:test');

export async function expectRejection(fn: () => Promise<void>): Promise<void> {
    try {
        await fn();
    } catch (error) {
        expect(error).toBeDefined();
        log('error: %O', (error as Error).message);
    }
}
