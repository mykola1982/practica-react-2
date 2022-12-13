import { Button } from './Button';

export const Gallery = ({ movies, onDelete }) => {
  console.log(movies);
  return (
    <>
      <ul>
        {movies.map(({ id, title, img, votes }) => {
          return (
            <li key={id}>
              <h2>{title}</h2>
              <p>Votes:{votes}</p>
              <button type="button" onClick={() => onDelete(id)}>
                Delete
              </button>

              <button
                type="button"
                onClick={() => openModal({ src: img, alt: title })}
              >
                Show poster
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
