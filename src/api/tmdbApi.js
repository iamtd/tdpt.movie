import axiosClient from './axiosClient'

export const category = {
  movie: 'movie',
  tv: 'tv',
}

export const movieType = {
  latest: 'latest',
  now_playing: 'now_playing',
  popular: 'popular',
  top_rated: 'top_rated',
  up_coming: 'up_coming',
}

export const tvType = {
  latest: 'latest',
  airing_today: 'airing_today',
  on_the_air: 'on_the_air',
  top_rated: 'top_rated',
  up_coming: 'up_coming',
}

const tmdbApi = {
  getMovieList: (type, params) => {
    const url = `${category.movie}/${movieType[type]}`
    return axiosClient.get(url, params)
  },
  getTvList: (type, params) => {
    const url = `${category.tv}/${tvType[type]}`
    return axiosClient.get(url, params)
  },
  getVideos: (cate, id) => {
    const url = `${category[cate]}/${id}/videos`
    return axiosClient.get(url, { params: {} })
  },
  search: (cate, params) => {
    const url = `search/${category[cate]}`
    return axiosClient.get(url, params)
  },
  detail: (cate, id) => {
    const url = `${category[cate]}/${id}`
    return axiosClient.get(url, { params: {} })
  },
  credits: (cate, id) => {
    const url = `${category[cate]}/${id}/credits`
    return axiosClient.get(url, { params: {} })
  },
  similar: (cate, id) => {
    const url = `${category[cate]}/${id}/similar`
    return axiosClient.get(url, { params: {} })
  },
}

export default tmdbApi
