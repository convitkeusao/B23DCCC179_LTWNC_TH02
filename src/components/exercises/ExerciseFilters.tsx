import type { ChangeEvent } from 'react';
import type { MuscleGroup } from '../../types';

const GROUP_OPTIONS: Array<'Tất cả' | MuscleGroup> = [
  'Tất cả',
  'Ngực',
  'Lưng',
  'Chân',
  'Vai',
  'Tay',
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'name', label: 'Tên A–Z' },
  { value: 'duration', label: 'Thời lượng tăng dần' },
] as const;

export type ExerciseFiltersProps = {
  keyword: string;
  onKeywordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  group: 'Tất cả' | MuscleGroup;
  onGroupChange: (group: 'Tất cả' | MuscleGroup) => void;
  sortMode: 'default' | 'name' | 'duration';
  onSortChange: (sortMode: 'default' | 'name' | 'duration') => void;
};

export function ExerciseFilters({
  keyword,
  onKeywordChange,
  group,
  onGroupChange,
  sortMode,
  onSortChange,
}: ExerciseFiltersProps) {
  return (
    <div className="toolbar">
      <div className="search-field">
        <label htmlFor="keyword">Tìm kiếm</label>
        <input
          id="keyword"
          type="text"
          value={keyword}
          onChange={onKeywordChange}
          placeholder="Nhập tên bài tập hoặc huấn luyện viên..."
        />
      </div>

      <div className="filter-field">
        <label htmlFor="group-filter">Nhóm cơ</label>
        <select
          id="group-filter"
          value={group}
          onChange={(event) => {
            const nextValue = event.target.value as 'Tất cả' | MuscleGroup;
            onGroupChange(nextValue);
          }}
        >
          {GROUP_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="sort-filter">Sắp xếp</label>
        <select
          id="sort-filter"
          value={sortMode}
          onChange={(event) => {
            const nextValue = event.target.value as 'default' | 'name' | 'duration';
            onSortChange(nextValue);
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ExerciseFilters;
