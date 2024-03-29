import Swiper, { Pagination, Navigation } from 'swiper'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Chart, registerables } from 'chart.js';

document.addEventListener('DOMContentLoaded', () => {
  // Scroll link
  document
    .querySelectorAll('.scroll-link')
    .forEach($link => {
      $link.addEventListener('click', e => {
        e.preventDefault();
        const $el = document.querySelector(e.target.getAttribute('href'));
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: $el?.offsetTop
        });
      });
    });

  // Scroll Top
  document.querySelector('.scrolltop')?.addEventListener('click', () => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: 0
    });
  });
  window.addEventListener('scroll', () => {
    if (window.scrollY >= window.innerHeight) {
      document.querySelector('.scrolltop')?.classList.add('active')
    } else {
      document.querySelector('.scrolltop')?.classList.remove('active')
    }
  });

  // Gallery sliders
  document.querySelectorAll('.gallery-slider-wrapper')?.forEach($gallerySlider => {
    new Swiper($gallerySlider.querySelector('.gallery-slider'), {
      modules: [Pagination, Navigation],
      loop: true,
      speed: 600,
      simulateTouch: false,
      spaceBetween: 5,
      maxBackfaceHiddenSlides: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: $gallerySlider.querySelector('.swiper-button-next'),
        prevEl: $gallerySlider.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 15
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        }
      }
    });
  });

  // Video slider
  const $videoSlider = document.querySelector('.video-slider-wrapper');
  new Swiper($videoSlider.querySelector('.video-slider'), {
    modules: [Pagination, Navigation],
    loop: true,
    speed: 600,
    simulateTouch: false,
    maxBackfaceHiddenSlides: 0,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: $videoSlider.querySelector('.swiper-button-next'),
      prevEl: $videoSlider.querySelector('.swiper-button-prev'),
    },
    breakpoints: {
      0: {
        spaceBetween: 15
      },
      480: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 5
      },
    }
  });

  // Photo gallery
  const lightbox = new PhotoSwipeLightbox({
    gallery: '.photoswipe',
    children: 'a',
    pswpModule: () => import('photoswipe')
  });
  lightbox.init();

  const startGalleryByHref = (e) => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href'))?.click();
  }

  document.querySelectorAll('.gallery-slider').forEach($gallery => {
    $gallery?.addEventListener('click', e => {
      if (e.target.classList.contains('gallery-poster__title')) {
        startGalleryByHref(e);
      }
    });
  });

  document.querySelector('.section-game__gallery')?.addEventListener('click', startGalleryByHref);

  // Videos modal
  function getYoutubeIdFromUrl(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??(v=)?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[8].length == 11) ? match[8] : false;
  }

  const $videoModal = document.querySelector('.video-modal');
  document.querySelectorAll('.video-link').forEach($link => {
    $link?.addEventListener('click', e => {
      if (window.innerWidth >= 768 && $videoModal) {
        e.preventDefault();
        const videoId = getYoutubeIdFromUrl(e.target.getAttribute('href'));

        $videoModal
          .querySelector('.video-modal__iframe-wrapper')
          .insertAdjacentHTML('beforeend', `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" class="video-modal__iframe" title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          `);
        $videoModal.classList.add('show');
      }
    });
  });

  $videoModal.addEventListener('click', e => {
    if (!e.target.classList.contains('video-section__container')) {
      $videoModal.classList.add('hiding');
      setTimeout(() => {
        $videoModal.classList.remove('hiding');
        $videoModal.classList.remove('show');
        $videoModal.querySelector('iframe').remove();
      }, 250);
    }
  });

  // Button section about
  const $aboutList = document.querySelector('.about-list');
  document.querySelector('.section-about__button')?.addEventListener('click', (e) => {
    if ($aboutList.classList.contains('about-list--open')) {
      $aboutList.classList.remove('about-list--open');
      e.target.textContent = "Показать полностью";
    } else {
      $aboutList.classList.add('about-list--open');
      e.target.textContent = "Скрыть";
    }
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: e.target.closest('.section-about')?.offsetTop
    });
  });

  // Chart
  const data = {
    labels: ['Морепродукты', 'Мясные изделия', 'Хлебобулочные иделия', 'Кукуруза'],
    datasets: [{
      data: [15, 7, 13, 8],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgb(75, 192, 192)',
        'rgba(153, 102, 255, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'left',
        },
      }
    }
  };

  const $chart = document.getElementById('statistics-chart');
  const ctx = $chart.getContext('2d');
  Chart.register(...registerables);
  Chart.defaults.font.size = 22;

  if (window.innerWidth <= 992) {
    config.options.plugins.legend.position = 'bottom';
    Chart.defaults.font.size = 20;
  }
  if (window.innerWidth <= 768) {
    Chart.defaults.font.size = 18;
  }

  const scrollCallbackChart = () => {
    const docViewTop = window.scrollY;
    const docViewBottom = docViewTop + window.innerHeight;
    const chartOffsetTop = $chart.offsetTop;
    const chartOffsetBottom = chartOffsetTop + $chart.offsetHeight;

    if ((chartOffsetTop + $chart.offsetHeight - 200 <= docViewBottom) && (chartOffsetBottom >= docViewTop)) {
      new Chart(ctx, config);
      window.removeEventListener('scroll', scrollCallbackChart);
    }
  }
  window.addEventListener('scroll', scrollCallbackChart);

  // Lazy loading
  let lazyloadImages;
  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    const imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    }, {
      rootMargin: '500px'
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    let lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        const scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
});
