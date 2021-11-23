export async function log(formatter: any, ...args: any[]): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
        try {
            const { debug } = await import('debug');
            const logger = debug('query-registry');
            logger(formatter, args);
        } catch {}
    }
}
