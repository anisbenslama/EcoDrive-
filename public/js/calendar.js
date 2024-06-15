document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: '/api/events', // Endpoint to fetch events
    dateClick: function(info) {
      var eventTitle = prompt('Entrer le Nom de Cours:');
      var instructorName = prompt('Enter Nom de Instricteur:');
      if (eventTitle && instructorName) {
        var newEvent = {
          title: `${eventTitle} - ${instructorName}`,
          start: info.dateStr,
          allDay: true
        };

        // Add the event to the calendar
        calendar.addEvent(newEvent);

        // Save the event to the server
        fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEvent)
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then(data => {
          console.log('Event saved successfully:', data);
        }).catch(error => {
          console.error('Error saving event:', error);
        });
      }
    },
    eventClick: function(info) {
      if (confirm(`Do you want to delete the event: ${info.event.title}?`)) {
        // Remove the event from the calendar
        info.event.remove();

        // Delete the event from the server
        fetch(`/api/events/${info.event.id}`, {
          method: 'DELETE'
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Event deleted successfully');
        }).catch(error => {
          console.error('Error deleting event:', error);
        });
      }
    }
  });

  calendar.render();
});
