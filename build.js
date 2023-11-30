const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

registerTransforms(StyleDictionary);

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

// Adds a class wrapper around the dark theme variables.
StyleDictionary.registerFormat({
  name: 'css/darkThemeCustomFormat',
  formatter: function ({ dictionary, file, options }) {
    const { outputReferences } = options;
    return (
      fileHeader({ file }) +
      '.dark {\n' +
      formattedVariables({ format: 'css', dictionary, outputReferences }) +
      '\n}\n'
    );
  },
});

// Removes any tokens that are in the core.json file
StyleDictionary.registerFilter({
  name: 'filterPrimitives',
  matcher: function (token) {
    return token.filePath !== 'src/primitive.json';
  },
});

// Limits component tokens to only those in the "comp" directory
StyleDictionary.registerFilter({
  name: 'componentsOnly',
  matcher: function (token) {
    if (token.filePath.includes('src/component')) {
      return token;
    }
  },
});

const light = StyleDictionary.extend({
  source: ['src/light.json'],
  include: ['src/primitive.json'],
  platforms: {
    css: {
      prefix: 'mar',
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          filter: 'filterPrimitives',
          destination: 'mar-light.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

light.cleanAllPlatforms();
light.buildAllPlatforms();

const dark = StyleDictionary.extend({
  source: ['src/dark.json'],
  include: ['src/primitive.json'],
  platforms: {
    css: {
      prefix: 'mar',
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          filter: 'filterPrimitives',
          destination: 'mar-dark.css',
          format: 'css/darkThemeCustomFormat',
        },
      ],
    },
  },
});

dark.cleanAllPlatforms();
dark.buildAllPlatforms();

const component = StyleDictionary.extend({
  source: ['src/component.json'],
  include: ['src/light.json', 'src/primitive.json'],
  platforms: {
    css: {
      prefix: 'mar',
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          filter: 'componentsOnly',
          destination: 'mar-component.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

component.cleanAllPlatforms();
component.buildAllPlatforms();
