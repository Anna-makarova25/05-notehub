// import css from './MovieGrid.module.css';
// import type { Movie } from '../../types/movie';

// interface MovieGridProps {
//   movies: Movie[];
//   onSelect: (movie: Movie) => void;
// }

// export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
//   return (
//     <ul className={css.grid}>
//       {movies.map((movie) => (
//         <li key={movie.id} onClick={() => onSelect(movie)}>
//           <div className={css.card}>
//             <img
//               className={css.image}
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={`${movie.title}`}
//               loading="lazy"
//             />
//             <h2 className={css.title}>{movie.title}</h2>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

import css from './NoteList.module.css';

export default function NoteList() {
  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      <li className={css.listItem}>
        <h2 className={css.title}>Note title</h2>
        <p className={css.content}>Note content</p>
        <div className={css.footer}>
          <span className={css.tag}>Note tag</span>
          <button className={css.button}>Delete</button>
        </div>
      </li>
    </ul>
  );
}
