function openCheckoutModal(event) {
  const button = event.target.closest('button');
  const row = button.closest('tr');

  const name = row.dataset.name || '';
  const description = row.dataset.description || '';
  const price = row.dataset.price || '';

  // Fill modal content
  document.getElementById('service-name').textContent = name;
  document.getElementById('service-description').textContent = description;
  document.getElementById('service-price').textContent = `$${price}`;

  // Show modal
  const modal = document.getElementById('checkoutModal');
  modal.style.display = 'flex';
}
function closecheckoutModal() {
  document.getElementById('checkoutModal').style.display = 'none';
}
