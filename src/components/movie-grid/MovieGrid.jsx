import { useState, useEffect } from 'react'
import './movie-grid.scss'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import MovieCard from '../movie-card/MovieCard'
import { useParams } from 'react-router-dom'
import { OutlineButton } from '../button/Button'

const MovieGrid = (props) => {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const { keyword } = useParams()
  useEffect(() => {
    const getList = async () => {
      try {
        let response = null

        if (keyword === undefined) {
          const params = {}
          switch (props.category) {
            case category.movie:
              response = await tmdbApi.getMovieList(movieType.top_rated, {
                params,
              })
              break
            default:
              response = await tmdbApi.getTvList(tvType.on_the_air, { params })
          }
        } else {
          const params = {
            query: keyword,
          }
          response = await tmdbApi.search(props.category, { params })
        }
        // console.log(response.results)
        setItems(response.results)
        setTotalPage(response.total_pages)
      } catch (err) {
        console.log(err)
      }
    }
    getList()
  }, [props.category, keyword])

  const loadMore = async () => {
    try {
      let response = null

      if (keyword === undefined) {
        const params = {
          page: page + 1,
        }
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(movieType.top_rated, {
              params,
            })
            break
          default:
            response = await tmdbApi.getTvList(tvType.on_the_air, { params })
        }
      } else {
        const params = {
          page: page + 1,
          query: keyword,
        }
        response = await tmdbApi.search(props.category, { params })
      }
      // console.log(response.results)
      setItems([...items, ...response.results])
      setPage(page + 1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard key={index} category={props.category} item={item} />
        ))}
      </div>

      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more...
          </OutlineButton>
        </div>
      ) : null}
    </>
  )
}

export default MovieGrid
