import type { IGraphQLConfig } from 'graphql-config';

const config: IGraphQLConfig = {
  schema: 'http://192.168.1.112:3000/graphql',
  extensions: {
    codegen: {
      hooks: {
        afterOneFileWrite: ['eslint --fix', 'prettier --write'],
      },
      generates: {
        'graphql/schema.types.ts': {
          plugins: ['typescript'],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
            scalars: {
              DateTime: {
                input: 'string',
                output: 'string',
                format: 'date-time',
              },
            },
          },
        },
        'graphql/types.ts': {
          preset: 'import-types',
          documents: ['**/*.{ts,tsx}'],
          plugins: ['typescript-operations'],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
            preResolveTypes: false,
            useTypeImports: true,
          },
          presetConfig: {
            typesPath: './schema.types',
          },
        },
      },
    },
  },
};

export default config;
