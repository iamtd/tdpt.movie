import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import './detail.scss'

import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

const Detail = () => {
  const iframeRef = useRef(null)
  const { category, id } = useParams()

  const [item, setItem] = useState(null)
  const [video, setVideo] = useState(null)

  useEffect(() => {
    const getDetail = async () => {
      try {
        const params = {}
        const response = await tmdbApi.detail(category, id, { params })
        setItem(response)
        window.scrollTo(0, 0)
      } catch (err) {
        console.log(err)
      }
    }
    getDetail()
  }, [category, id])

  useEffect(() => {
    const getMovie = async () => {
      const response = await axios.get(
        `https://www.2embed.ru/embed/tmdb/movie?id=${id}`
      )
      console.log(response)
      setVideo(response)
    }
    getMovie()
  }, [id])

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          <div className="movie-content">
            <iframe
              src={video}
              ref={iframeRef}
              width="100%"
              height="500px"
              title="trailer"
            ></iframe>
          </div>
        </>
      )}
    </>
  )
}

export default Detail
