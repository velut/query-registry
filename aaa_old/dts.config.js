module.exports = {
    rollup(config, opts) {
        if (opts.format === 'esm') {
            config.output = {
                ...config.output,
                preserveModules: true,
                dir: 'dist/',
                entryFileNames: '[name].esm.js',
            };
            delete config.output.file;
        }
        return config;
    },
};
