/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    webpack: (config, { isServer }) => {
        // Handle Tesseract.js worker files
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        
        // Copy Tesseract.js worker files
        config.module.rules.push({
            test: /\.wasm$/,
            type: 'asset/resource',
        });
        
        return config;
    },
    // Allow loading of worker files
    async headers() {
        return [
            {
                source: '/worker-script/:path*',
                headers: [
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
