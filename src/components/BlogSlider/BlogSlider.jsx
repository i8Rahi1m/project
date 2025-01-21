import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './BlogSlider.css'
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/mousewheel';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import { EffectFade, Mousewheel, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Pagination, EffectFade, Mousewheel, Autoplay]);

const BlogSlider = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const handlePlayClick = (movieId) => {
        navigate(`/movie/${movieId}`);
      };


    async function getData() {
        try {
            const response = await axios.get('http://localhost:3000/Movies');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

  return (
    <div className='blog-sliderr '>
      <Swiper
        spaceBetween={30}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        mousewheel={{ invert: false }}
        pagination={{ clickable: true, el: '.blog-slider__pagination' }}
      >
        {data.map(el => (
        <SwiperSlide key={el.id}>
          <div style={{height: '360px'}} className="blog-slider__item">
            <div className="blog-slider__img">
              <img
              style={{marginLeft: '35px', height: '332px'}}
                src={el.poster}
                alt=""
              />
            </div>
            <div className="blog-slider__content">
              <span className="blog-slider__code">{el.year}</span>
              <div className="blog-slider__title">{el.imya}</div>
              <div style={{fontSize: '17px', lineHeight: '30px'}} className="blog-slider__text">
                {el.desc.substring(0, 200)}...
              </div>
              <button onClick={() => handlePlayClick(el.id)} className="blog-sliderbutton">
                READ MORE
              </button>
            </div>
          </div>
        </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default BlogSlider;