import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import './hero-slide.scss'

import apiConfig from '../../api/apiConfig'
import tmdbApi, { category, movieType } from '../../api/tmdbApi'
import Button, { OutlineButton } from '../button/Button'
import Modal, { ModalContent } from '../modal/Modal'

const HeroSlide = () => {
  SwiperCore.use([Autoplay])

  const [movieItems, setMovieItems] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, {
          params,
        })
        const data = response.results.slice(0, 3)
        // console.log(data)
        setMovieItems(data)
      } catch (err) {
        console.log(err)
      }
    }
    getMovies()
  }, [])

  return (
    <div className="slide">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        grabCursor={true}
        // autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? 'active' : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  )
}

const HeroSlideItem = ({ item, className }) => {
  let navigate = useNavigate()
  const backgroundUrl = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  )

  const posterUrl = apiConfig.w500Image(item.poster_path)

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)

    const videos = await tmdbApi.getVideos(category.movie, item.id)

    if (videos.results.length > 0) {
      const trailerUrl =
        'https://www.youtube.com/embed/' + videos.results[0].key
      modal
        .querySelector('.modal__content > iframe')
        .setAttribute('src', trailerUrl)
    } else {
      modal.querySelector('.modal__content').innerHTML = 'No trailer'
    }

    modal.classList.toggle('active')
  }

  return (
    <div
      className={`slide__item ${className}`}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="slide__content">
        <div className="slide__info">
          <h2 className="slide__title">{item.title}</h2>
          <div className="slide__overview">{item.overview}</div>
          <div className="slide__buttons">
            <Button onClick={() => navigate(`/movie/${item.id}`)}>
              Watch Now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch Trailer
            </OutlineButton>
          </div>
        </div>

        <div className="slide__poster">
          <img src={posterUrl} alt="" />
        </div>
      </div>
    </div>
  )
}

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null)

  const onClose = () => iframeRef.current.setAttribute('src', '')
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  )
}

export default HeroSlide
