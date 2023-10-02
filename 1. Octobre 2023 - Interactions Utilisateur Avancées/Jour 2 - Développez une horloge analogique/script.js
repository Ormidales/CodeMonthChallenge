// Initialise l'horloge et ses composants
document.addEventListener("DOMContentLoaded", function() {
    // Initialise les aiguilles de l'horloge
    const hourHand = document.getElementById('hour');
    const minuteHand = document.getElementById('minute');
    const secondHand = document.getElementById('second');

    // Met à jour les aiguilles de l'horloge pour afficher l'heure actuelle
    function updateClock() {
        // Création d'un objet date dans le fuseau horaire de Paris
        // Obtient l'heure actuelle pour Paris
        const parisTime = new Date().toLocaleString("en-US", {timeZone: "Europe/Paris"});
        const now = new Date(parisTime);

        const second = now.getSeconds();
        const minute = now.getMinutes();
        const hour = now.getHours();

        // Calcule les degrés pour chaque aiguille
        const secondDegree = ((second / 60) * 360) + 90;
        const minuteDegree = ((minute / 60) * 360) + ((second / 60) * 6) + 90;
        const hourDegree = ((hour / 12) * 360) + ((minute / 60) * 30) + 90;

        // Gère les transitions pour des mouvements fluides
        if (second === 59 || second === 0) {
            secondHand.style.transition = 'none';
        } else {
            secondHand.style.transition = 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)';
        }

        if (minute === 59 || minute === 0) {
            minuteHand.style.transition = 'none';
        } else {
            minuteHand.style.transition = 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)';
        }

        if (hour === 11 || hour === 0) {
            hourHand.style.transition = 'none';
        } else {
            hourHand.style.transition = 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)';
        }

        // Applique les rotations aux aiguilles
        secondHand.style.transform = `rotate(${secondDegree}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
        hourHand.style.transform = `rotate(${hourDegree}deg)`;
    }

    // Positionne les marqueurs temporels
    for (let i = 1; i <= 12; i++) {
        const marker = document.getElementById(`marker-${i}`);
        const degree = (i * 30) - 90;  // -90 pour commencer à partir de 12:00
        marker.style.transform = `rotate(${degree}deg)`;
    }

    // Met à jour l'horloge toutes les secondes
    setInterval(updateClock, 1000);
    updateClock(); // Pour initialiser l'horloge
});

/**
 * Horloge analogique en HTML, CSS et JavaScript
 * Auteur : Ormidales
 * Date : 02/10/2023
 * 
 * Description : Ce script génère une horloge analogique avec des marqueurs temporels.
 * L'heure est synchronisée sur le fuseau horaire de Paris.
 */