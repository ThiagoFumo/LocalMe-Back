module.exports = {
    testEnvironment: 'node', // Especifica el entorno de pruebas
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Usa ts-jest para transformar archivos TypeScript
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensiones que Jest soportará
    transformIgnorePatterns: ['/node_modules/'], // Ignora transformar los módulos de terceros
  };