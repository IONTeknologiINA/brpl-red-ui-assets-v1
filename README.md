# Vue 2 SPA Application

A vue 2 app for Handling BRPL-RED UI interaction.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm** (comes with Node.js) or **yarn**

Check your versions:
```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IONTeknologiINA/brpl-red-ui-assets-v1.git
   cd brpl-red-ui-assets-v1
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

## Development

### Start the development server

```bash
npm run serve
# or
yarn serve
```

The app will be available at `http://localhost:8080` and automatically reload when you make changes.

## Building for Production

### Create production build

```bash
npm run build
# or
yarn build
```

## Additional Scripts

### Linting

```bash
# Check for code issues
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

**Note:** Only variables prefixed with `VUE_APP_` are accessible in your components.

## Deployment

### Static Hosting

1. Build the project: `npm run build`
2. Copy the `dist/` folder to CDN proxy (eg: Github: https://github.com/IONTeknologiINA/brpl-red-cdn.git). You can create your own Github repository
3. If you use the GitHub repository as a CDN proxy, set the `publicPath` in `vue.config.js` to `https://cdn.jsdelivr.net/`. If you have your own CDN, you can update it later
4. Copy and paste `index.html` into Google Script project

## Troubleshooting

**Common Issues:**

- **Port in use:** Kill the process or change port in `vue.config.js`
- **Module errors:** Delete `node_modules/` and run `npm install`
- **Build fails:** Check console for specific error messages

## Resources

- [Vue 2 Documentation](https://vuejs.org/v2/guide/)
- [Vue CLI Documentation](https://cli.vuejs.org/)

## License

MIT License
