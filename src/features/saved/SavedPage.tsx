import { EXERCISES } from '../../data/exercises';
import { useSavedStore } from './useSavedStore';

export default function SavedPage() {
  const savedIds = useSavedStore((state) => state.ids);
  const savedExercises = EXERCISES.filter((exercise) => savedIds.includes(exercise.id));

  return (
    <section className="library-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">WORKOUT TIMER</p>
          <h1>Bài tập đã lưu</h1>
        </div>
        <span className="build-tag">{savedExercises.length} mục</span>
      </div>

      {savedExercises.length === 0 ? (
        <div className="empty-state">Không có bài tập nào được lưu.</div>
      ) : (
        <div className="saved-list">
          {savedExercises.map((exercise) => (
            <div key={exercise.id} className="saved-item">
              <div>
                <strong>{exercise.name}</strong>
                <span>{exercise.trainer}</span>
              </div>
              <span>{exercise.group}</span>
              <span>{Math.floor(exercise.duration / 60)}:{String(exercise.duration % 60).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
