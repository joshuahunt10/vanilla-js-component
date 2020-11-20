export function Rater(ratingElement) {
    const stars = ratingElement.querySelectorAll('.star');

    const resetRating = ev => {
        const currentRating = ratingElement.getAttribute('data-rating');
        highlightRating(currentRating);
    };

    const highlightRating = (rating) => {
        stars.forEach(star => {
          star.style.color =
            rating >= star.getAttribute('data-value') ? 'yellow' : 'gray';
        });
    };

    const ratingHover = ev => {
        const currentHover = ev.currentTarget.getAttribute('data-value');
        highlightRating(currentHover);
    };

    const setRating = ev => {
        ratingElement.setAttribute(
          'data-rating',
          ev.currentTarget.getAttribute('data-value')
        );
      };

    resetRating();

    // stars.forEach(star => {
    //     star.addEventListener('mouseover', ratingHover);
    // });

    stars.forEach(star => {
        star.addEventListener('click', setRating);
        star.addEventListener('mouseover', ratingHover);
      });

    ratingElement.addEventListener('mouseout', resetRating);
}