document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      {
        title: 'Cours de conduite',
        start: '2024-05-15T10:00:00',
        end: '2024-05-15T12:00:00'
      },
      {
        title: 'Séance de code',
        start: '2024-05-18T09:00:00',
        end: '2024-05-18T11:00:00'
      }
    ]
  });

  calendar.render();

  // Fonction pour ajouter un événement au calendrier
  function ajouterEvenementAuCalendrier(titre, debut, fin) {
    calendar.addEvent({
      title: titre,
      start: debut,
      end: fin
    });
  }

  // Exemple d'appel de la fonction pour ajouter un événement
  ajouterEvenementAuCalendrier('Réunion', '2024-05-20T14:00:00', '2024-05-20T16:00:00');
});