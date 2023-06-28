# Planning Poker

A simple project for all of your story pointing needs! This is a template which you may fork, customize and stand up your own server with.

## Using this example

- Clone the repository.
- Install packages, using your package manager of choice, `npm`, `pnpm`, or `yarn`.
- Run `npm run dev`, `pnpm dev`, `yarn dev`.

## What's inside?

A simple Turborepo project with TypeScript as a focus. There are two primary locations within the project, `apps` which are runnable applications, and `packages` which are shared configurations.

### apps

- `api`: a [fastify](https://www.fastify.io/) server
- `web`: a [SvelteKit](https://kit.svelte.dev/) application using [SkeletonUi](https://www.skeleton.dev/docs/get-started)

### packages

- `eslint-config-custom`: a custom sharable configuration for eslint
- `planning-poker-types`: shared zod and typescript types
- `tsconfig`: shared tsconfig

Each package/app should be 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd planning-poker-turbo-sveltekit-fastify
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd planning-poker-turbo-sveltekit-fastify
npm run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
