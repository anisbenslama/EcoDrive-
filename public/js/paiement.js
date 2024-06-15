document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('payment-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Vous pouvez ajouter ici la logique pour valider et soumettre les informations de paiement
    alert('Paiement soumis avec succès!');
    form.reset();
  });
});