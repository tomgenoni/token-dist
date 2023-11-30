const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

registerTransforms(StyleDictionary);

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
    console.log(token.filePath);
    if (token.filePath.includes('tokens/comp')) {
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
          format: 'css/variables',
        },
      ],
    },
  },
});

dark.cleanAllPlatforms();
dark.buildAllPlatforms();

// const component = StyleDictionary.extend({
//   source: ['src/component.json'],
//   include: ['src/light.json'],
//   platforms: {
//     css: {
//       prefix: 'mar',
//       transformGroup: 'css',
//       buildPath: 'dist/',
//       files: [
//         {
//           filter: 'componentsOnly',
//           destination: 'mar-component.css',
//           format: 'css/variables',
//           options: {
//             outputReferences: true,
//           },
//         },
//       ],
//     },
//   },
// });

// component.cleanAllPlatforms();
// component.buildAllPlatforms();
