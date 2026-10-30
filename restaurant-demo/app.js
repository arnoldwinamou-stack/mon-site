
const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");

if (reservationForm) {
  reservationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const reservation = {
      nom: document.getElementById("name").value.trim(),
      telephone: document.getElementById("phone").value.trim(),
      date: document.getElementById("date").value,
      personnes: document.getElementById("guests").value,
      dateDemande: new Date().toLocaleString("fr-FR")
    };

    if (
      !reservation.nom ||
      !reservation.telephone ||
      !reservation.date ||
      !reservation.personnes
    ) {
      formMessage.textContent = "Veuillez remplir tous les champs.";
      return;
    }

    const aujourdHui = new Date().toISOString().split("T")[0];

    if (reservation.date < aujourdHui) {
      formMessage.textContent = "Veuillez choisir une date future.";
      return;
    }

    try {
      const reservations = JSON.parse(
        localStorage.getItem("maisonImperialeReservations") || "[]"
      );

      reservations.push(reservation);

      localStorage.setItem(
        "maisonImperialeReservations",
        JSON.stringify(reservations)
      );

      formMessage.textContent =
        "Demande enregistrée avec succès ! Merci pour votre confiance.";

      reservationForm.reset();

    } catch (error) {
      formMessage.textContent =
        "Impossible d'enregistrer la demande sur cet appareil.";
    }
  });
}
