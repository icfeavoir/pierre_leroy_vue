module.exports = {
  baseUrl: '',

  devServer: {
    proxy: 'https://pierre-leroy.fr/mail',
  },

  pages: {
    'index': {
      // entry for the page Home  
      entry: 'src/main.js',
      template: 'public/index.html',
      title: 'Test',
      filename: 'index.html' // output as dist/*      
    },
    'price': {
      // entry for the page Price
      entry: 'src/pages/Price/main.js',
      template: 'public/index.html',
      title: 'Test',
      filename: 'price.html' // output as dist/*
    },
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
        { from: /\/price/, to: '/price.html' }
      ]
    }
  }
}