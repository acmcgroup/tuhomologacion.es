import createNextIntlPlugin from 'next-intl/plugin'
import { withContentlayer } from 'next-contentlayer'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['localhost', 'tuhomologacion.es'],
  },
}

export default withContentlayer(withNextIntl(nextConfig))
