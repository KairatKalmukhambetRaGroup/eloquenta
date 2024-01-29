const createNextIntlPlugin  = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'server.eloquenta.academy',
                port: '',
                pathname: '/users/avatar/**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/users/avatar/**'
            },
        ]
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    output: "standalone"
})
