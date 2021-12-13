const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '9594009f1f1eaa2569cac95221461142',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig
