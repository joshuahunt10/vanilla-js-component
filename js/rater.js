
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

    stars.forEach(star => {
        star.addEventListener('click', setRating);
        star.addEventListener('mouseover', ratingHover);
      });

    ratingElement.addEventListener('mouseout', resetRating);
}

export class RaterClass extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        const res = await fetch('template/rater.html');

        const parser = new DOMParser();

        const doc = parser.parseFromString(await res.text(), 'text/html');
        const templateContent = doc.querySelector('template').content;

        const customElement = document.getElementsByTagName('star-rater')[0];

        customElement.attachShadow({  mode: 'open' })
            .appendChild(templateContent.cloneNode(true))
    }
}

window.customElements.define('star-rater', RaterClass)