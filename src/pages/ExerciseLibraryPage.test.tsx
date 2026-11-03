import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { ExerciseLibraryPage } from './ExerciseLibraryPage';

function LibraryHarness() {
  const [keyword, setKeyword] = useState('');

  return (
    <ExerciseLibraryPage
      keyword={keyword}
      onKeywordChange={(event) => setKeyword(event.target.value)}
      onAddToWorkout={() => undefined}
    />
  );
}

describe('ExerciseLibraryPage', () => {
  it('renders the library header and search input', () => {
    render(<LibraryHarness />);

    expect(screen.getByText('Kho bài tập')).toBeInTheDocument();
    expect(screen.getByLabelText('Tìm kiếm')).toBeInTheDocument();
  });

  it('filters exercises by keyword and group', async () => {
    const user = userEvent.setup();
    render(<LibraryHarness />);

    await user.type(screen.getByLabelText('Tìm kiếm'), 'Minh Khang');
    expect(screen.getByText(/Tìm thấy .* bài tập/i)).toBeInTheDocument();

    await user.clear(screen.getByLabelText('Tìm kiếm'));
    await user.selectOptions(screen.getByLabelText('Nhóm cơ'), 'Ngực');
    expect(screen.getByText(/Tìm thấy .* bài tập/i)).toBeInTheDocument();
  });
});
