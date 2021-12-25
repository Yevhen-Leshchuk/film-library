import LazyLinePainter from 'lazy-line-painter';

export function logoAnimation() {
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const film = document.querySelector('#film');
      console.log(film);
      const animationFilm = new LazyLinePainter(film, {
        ease: 'easeLinear',
        strokeWidth: 3,
        strokeOpacity: 2,
        strokeColor: '#FF6B08',
        strokeCap: 'square',
        delay: 200,
        repeat: 1000,
      });

      animationFilm.paint();
    }
  };
}
