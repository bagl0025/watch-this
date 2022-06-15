async function reviewFormHandler(event) {
  event.preventDefault();

  const reviews_text = document
    .querySelector('textarea[name="reviews-body"]')
    .value.trim();
  const watchlist_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (reviews_text) {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        watchlist_id,
        reviews_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.reviews-form')
  .addEventListener('submit', reviewFormHandler);
