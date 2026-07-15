import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

const AUTO_SLIDE_DELAY = 4000
const SWIPE_THRESHOLD = 40
const WHEEL_THRESHOLD = 30
const TABLET_MEDIA_QUERY = '(min-width: 768px)'

function HeroBannerSlider({ banners }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTabletUp, setIsTabletUp] = useState(false)
  const touchStartX = useRef(null)
  const wheelDeltaX = useRef(0)
  const hasMultipleBanners = banners.length > 1
  const getBannerAtOffset = (offset) => {
    const nextIndex = (activeIndex + offset + banners.length) % banners.length

    return banners[nextIndex]
  }
  const getPreviewBanners = () => {
    const offsets = []

    for (let index = 1; index < banners.length; index += 1) {
      offsets.push(-index, index)
    }

    return offsets
      .map((offset) => ({
        banner: getBannerAtOffset(offset),
        bannerIndex: (activeIndex + offset + banners.length) % banners.length,
      }))
      .filter(
        ({ banner }, index, previewBanners) =>
          banner.id !== getBannerAtOffset(0).id &&
          previewBanners.findIndex((previewBanner) => previewBanner.banner.id === banner.id) ===
            index,
      )
  }

  const goToPreviousBanner = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? banners.length - 1 : currentIndex - 1,
    )
  }

  const goToNextBanner = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === banners.length - 1 ? 0 : currentIndex + 1,
    )
  }

  const getBannerPath = (banner) => banner.href || '#'

  const handlePreviewClick = (event, banner, bannerIndex) => {
    if (!isTabletUp) {
      event.preventDefault()
      setActiveIndex(bannerIndex)
      return
    }

    if (!banner.href) {
      event.preventDefault()
    }
  }

  const handlePosterClick = (event, banner) => {
    if (!banner.href) {
      event.preventDefault()
    }
  }

  const handlePointerDown = (event) => {
    if (!hasMultipleBanners) return

    touchStartX.current = event.clientX
  }

  const handlePointerUp = (event) => {
    if (!hasMultipleBanners || touchStartX.current === null) return

    const swipeDistance = event.clientX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(swipeDistance) < SWIPE_THRESHOLD) return

    if (swipeDistance > 0) {
      goToPreviousBanner()
      return
    }

    goToNextBanner()
  }

  const handleWheel = (event) => {
    if (!hasMultipleBanners || !event.shiftKey) return

    event.preventDefault()
    wheelDeltaX.current += event.deltaX || event.deltaY

    if (Math.abs(wheelDeltaX.current) < WHEEL_THRESHOLD) return

    if (wheelDeltaX.current > 0) {
      goToNextBanner()
    } else {
      goToPreviousBanner()
    }

    wheelDeltaX.current = 0
  }

  useEffect(() => {
    if (!hasMultipleBanners) return undefined

    const timerId = window.setInterval(goToNextBanner, AUTO_SLIDE_DELAY)

    return () => {
      window.clearInterval(timerId)
    }
  }, [hasMultipleBanners])

  useEffect(() => {
    const mediaQueryList = window.matchMedia(TABLET_MEDIA_QUERY)
    const updateIsTabletUp = () => {
      setIsTabletUp(mediaQueryList.matches)
    }

    updateIsTabletUp()
    mediaQueryList.addEventListener('change', updateIsTabletUp)

    return () => {
      mediaQueryList.removeEventListener('change', updateIsTabletUp)
    }
  }, [])

  return (
    <article
      className="hero-banner"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        touchStartX.current = null
      }}
      onWheel={handleWheel}
    >
      <div className="hero-banner__stage">
        {hasMultipleBanners &&
          getPreviewBanners().map(({ banner, bannerIndex }) => (
            <Link
              key={banner.id}
              to={getBannerPath(banner)}
              className={`hero-banner__preview`}
              onClick={(event) => {
                handlePreviewClick(event, banner, bannerIndex)
              }}
            >
              <img src={getPublicAssetPath(banner.image)} alt="" />
              <div className="hero-banner__preview-title">
                {banner.title.split('\n').map((line) => (
                  <strong key={line}>{line}</strong>
                ))}
              </div>
            </Link>
          ))}
        <Link
          to={getBannerPath(getBannerAtOffset(0))}
          className="hero-banner__poster"
          key={getBannerAtOffset(0).id}
          onClick={(event) => {
            handlePosterClick(event, getBannerAtOffset(0))
          }}
        >
          <img
            src={getPublicAssetPath(getBannerAtOffset(0).image)}
            alt=""
            className="hero-banner__image"
          />
          <div className="hero-banner__content">
            {getBannerAtOffset(0).title.split('\n').map((line) => (
              <strong key={line}>{line}</strong>
            ))}
            <span>{getBannerAtOffset(0).subtitle}</span>
          </div>
        </Link>
      </div>
      {hasMultipleBanners && (
        <div className="hero-banner__pagination" aria-hidden="true">
          {banners.map((banner, index) => (
            <span
              key={banner.id}
              className={index === activeIndex ? 'is-active' : undefined}
            />
          ))}
        </div>
      )}
    </article>
  )
}

export default HeroBannerSlider
