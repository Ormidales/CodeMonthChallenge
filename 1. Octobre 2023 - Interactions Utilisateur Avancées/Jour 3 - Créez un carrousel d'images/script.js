document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll(".carousel-image");
  let indicators = document.getElementById("indicators");
  let currentIndex = 0;
  let intervalId;
  let startX;
  let endX;

  const threshold = 100; // distance minimale à parcourir pour considérer le mouvement comme un balayage

  document.getElementById("carousel").addEventListener("touchstart", (e) => {
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
  });

  document.getElementById("carousel").addEventListener("touchmove", (e) => {
    if (!startX) {
      return;
    }

    const touchObj = e.changedTouches[0];
    endX = touchObj.pageX;

    // distance parcourue pendant le balayage
    const dist = endX - startX;

    // Si la distance parcourue est supérieure au seuil, déterminez la direction
    if (Math.abs(dist) >= threshold) {
      if (dist > 0) {
        prevImage(); // balayage de droite à gauche
      } else {
        nextImage(); // balayage de gauche à droite
      }

      // Réinitialisez les valeurs pour le prochain balayage
      startX = null;
      endX = null;
    }
  });

  // Fonction pour démarrer le défilement automatique
  function startAutoSlide() {
    intervalId = setInterval(nextImage, 3000);
  }

  // Fonction pour arrêter le défilement automatique
  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  // Ajoutez cette fonction pour créer les indicateurs
  function createIndicators() {
    images.forEach((_, index) => {
      let indicator = document.createElement("div");
      indicator.classList.add(
        "indicator",
        "w-4",
        "h-4",
        "bg-gray-400",
        "rounded-full",
        "mx-2",
        "cursor-pointer"
      );
      indicator.addEventListener("click", () => showImage(index));
      indicators.appendChild(indicator);
    });
  }

  function lazyLoadImage(image) {
    const src = image.getAttribute('data-src');
    if (src) {
      image.src = src;
      image.removeAttribute('data-src');
    }
  }

  // Modifiez cette fonction pour mettre à jour les indicateurs
  function showImage(index) {
    images.forEach((image, i) => {
      if (i === index) {
        lazyLoadImage(image); // Appelle la fonction lazyLoadImage ici
        image.classList.remove('hidden');
      } else {
        image.classList.add('hidden');
      }
    });

    document.querySelectorAll(".indicator").forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("bg-blue-500");
      } else {
        indicator.classList.remove("bg-blue-500");
      }
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  document.getElementById("next").addEventListener("click", nextImage);
  document.getElementById("prev").addEventListener("click", prevImage);

  intervalId = setInterval(nextImage, 3000);

   // Commencez le défilement automatique au chargement
  startAutoSlide();

  // Arrêtez le défilement automatique lorsque la souris est sur le carrousel
  document.getElementById("carousel").addEventListener("mouseover", stopAutoSlide);

  // Reprenez le défilement automatique lorsque la souris quitte le carrousel
  document.getElementById("carousel").addEventListener("mouseout", startAutoSlide);

  createIndicators(); // Appeler cette fonction pour créer les indicateurs
  showImage(currentIndex); // Mettra à jour les indicateurs lors du premier affichage
});
