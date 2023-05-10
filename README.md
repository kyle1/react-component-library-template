# How to Create a React Component Library

## Initialize the Package

```bash
mkdir my-component-library
cd my-component-library
npm init
```

You will be prompted for input about the package. You can answer with the default values and update the package settings later.

## Install React

```bash
npm install react --save-dev
```

## Install & Configure TypeScript

```bash
npm install typescript @types/react --save-dev
```

Generate a TypeScript config file using the following command:

```bash
npx tsc --init
```

Configure the TypeScript settings:

```json
// tsconfig.json
{
  "compilerOptions": {
    // Default
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,

    // Added/changed
    "target": "es5",
    "jsx": "react-jsx",
    "module": "ESNext",
    "declaration": true,
    "declarationDir": "types",
    "sourceMap": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "emitDeclarationOnly": true
  }
}
```

## Create a Component

In the package directory, create a `src` directory with the structure shown below:

```bash
├── my-component-library
│   ├── node_modules
│   ├── src
│   │   ├── components
│   │   │   ├── Button
│   │   │   │   ├── Button.css
│   │   │   │   ├── Button.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
```

```css
/* src/components/Button/Button.css */
.button {
  font-size: 100px;
}
```

```typescript
// src/components/Button/Button.tsx
import "./Button.css";

interface ButtonProps {
  label: string;
}

export const Button = ({ label }: ButtonProps) => {
  return <button className="button">{label}</button>;
};
```

```typescript
// src/components/Button/index.ts
export { Button } from "./Button";
```

```typescript
// src/components/index.ts
export { Button } from "./Button";
```

```typescript
// src/index.ts
export * from "./components";
```

## Install & Configure Rollup

Install Rollup and plugins

```bash
npm install rollup @rollup/plugin-node-resolve @rollup/plugin-typescript @rollup/plugin-commonjs rollup-plugin-dts rollup-plugin-postcss rollup-plugin-peer-deps-external --save-dev
```

- [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve) - For Rollup to locate and bundle third-party dependencies in node_modules. The dependencies meant here are the dependencies listed in your package.json file.
- [@rollup/plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript) - To help integrate with TypeScript in an easier fashion. Covers things like transpiling TypeScript to JavaScript.
  - Note: both `typescript` and `tslib` are peer dependencies of this plugin that need to be installed separately.
- [@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs) - For Rollup to convert CommonJS modules into ES6, so that they can be included in a Rollup bundle. It is typically used along with @rollup/plugin-node-resolve, to bundle the CommonJS dependencies.
- [rollup-plugin-dts](https://www.npmjs.com/package/rollup-plugin-dts) - Rollup your .d.ts definition files
- [rollup-plugin-css](https://www.npmjs.com/package/rollup-plugin-postcss) - To integrate with PostCSS
- [rollup-plugin-peer-deps-external](https://www.npmjs.com/package/rollup-plugin-peer-deps-external) - Excludes peer dependencies from the bundle

@rollup/plugin-typescript has an additional dependency that needs to be installed:

```bash
npm install tslib --save-dev
```

Create Rollup configuration file `rollup.config.mjs` in the project root directory:

```javascript
// rollup.config.mjs
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // Preferably set as first plugin.
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
```

## Package Settings

```json
// package.json
{
  "name": "my-component-library",
  "version": "1.0.0",
  "description": "My React component library",
  "author": "Name",
  "license": "MIT",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "files": ["dist"],
  "types": "dist/index.d.ts",
  "scripts": {
    "rollup": "rollup -c"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^24.1.0",
    "@rollup/plugin-node-resolve": "^15.0.2",
    "@rollup/plugin-typescript": "^11.1.0",
    "@types/react": "^18.2.6",
    "react": "^18.2.0",
    "rollup": "^3.21.5",
    "rollup-plugin-dts": "^5.3.0",
    "rollup-plugin-postcss": "^4.0.2",
    "tslib": "^2.5.0",
    "typescript": "^5.0.4"
  },
  "peerDependencies": {
    "react": "^18.2.0"
  }
}
```

- `"main": "dist/cjs/index.js"` - Path of the CommonJS-style module
- `"module": "dist/esm/index.js` - Path of the ECMAScript-style module
- `"files": ["dist"]` - Array of file patterns that describes the entries to be included when your package is installed as a dependency.
- `"types": "dist/index.d.ts"` - Path of the bundled declaration file.
- `"scripts.rollup": "rollup -c"` - Script to create a bundle with Rollup using the config file
- `"peerDependencies" : { "react": "x.x.x" }` - The apps using the library will have React installed

## Create the Bundle

```
npm run rollup
```

## Publish to GitHub

Create a .gitignore file:

```sh
# .gitignore
dist
node_modules
```

Create a GitHub repostiory and push the code.

Add the following to the package.json configuration:

```json
// package.json
{
  "name": "GITHUB_USERNAME/REPO_NAME",
  "publish": {
    "registry": "https://npm.pkg.github.com/GITHUB_USERNAME"
  }
  ...
}
```

Create npm config file `.npmrc` in home directory (e.g. `C:/Users/username/.npmrc`)

```
registry=https://registry.npmjs.org/
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_AUTH_TOKEN
```

To get your auth token:

1. Go https://github.com/settings/tokens.
2. Click "Generate new token" button (classic mode)
3. Check the "write:packages" scope
4. Copy the token.

Publish the package to your GitHub by running the command:

```bash
npm publish
```

Go to your GitHub profile page and click the Packages tab to see the package you just published.

## Using the Package Locally

You might want to keep your library private. You can import your local package into one of your projects by simply adding it as a dependency in the project:

```bash
npm i ./path-to/my-component-library
```

This will add your local package as a dependency in package.json:

```json
// my-frontend-app/package.json
{
  ...
  "dependencies": {
    "my-component-library": "file:./path-to/my-component-library",
    ...
  }
}
```

You will now be able to import Button from "my-component-library".

If changes are made to the component library, recreate the package bundle by running the `npm run rollup` command in the library's root directory. The library changes will then take effect in the consumer app because a [link](https://docs.npmjs.com/cli/v8/commands/npm-link) was created to the local package when it was installed as a dependency.

## Add Tailwind (Optional)

```bash
npm install tailwindcss postcss autoprefixer --save-dev
npx tailwindcss init -p
```

Add the paths to all of your template files in your `tailwind.config.js` file:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Insert Tailwind's `base`, `components`, and `utilities` styles into your CSS

```css
/* src/styles/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import the CSS into the components entry point

```typescript
// src/components/index.ts
import "../styles/tailwind.css";

export { Button } from "./Button";
```

You can now add Tailwind styles to your components that will be included in the rollup build.
