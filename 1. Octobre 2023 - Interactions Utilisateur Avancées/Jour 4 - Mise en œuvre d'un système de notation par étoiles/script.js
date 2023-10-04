document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.getElementById('star-container');
  const stars = starContainer.querySelectorAll('.star');

  const savedRating = localStorage.getItem('userRating');
  if (savedRating) {
    updateStars(savedRating);
  }

  stars.forEach((star) => {
    star.addEventListener('click', setRating);
  });

  function setRating(event) {
    const clickedStar = event.currentTarget;
    const ratingValue = parseInt(clickedStar.dataset.value);
    localStorage.setItem('userRating', ratingValue);
    updateStars(ratingValue);
    console.log(`L'utilisateur a donné une note de ${ratingValue}`);
  }

  function updateStars(ratingValue) {
    stars.forEach((star) => {
      if (parseInt(star.dataset.value) <= ratingValue) {
        star.classList.remove('star-inactive');
        star.classList.add('star-active');
      } else {
        star.classList.remove('star-active');
        star.classList.add('star-inactive');
      }
    });
  }
});