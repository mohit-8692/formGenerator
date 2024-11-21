import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JSONEditor from '../src/components/JSONEditor';

describe('JSONEditor', () => {
  const mockSetSchema = jest.fn();

  it('renders JSON editor with initial value', () => {
    render(<JSONEditor schema="{}" setSchema={mockSetSchema} />);
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
  });

  it('calls setSchema on editor change', async () => {
    render(<JSONEditor schema="{}" setSchema={mockSetSchema} />);
    const editor = screen.getByRole('textbox');
    await userEvent.type(editor, '{"test": "value"}');
    expect(mockSetSchema).toHaveBeenCalled();
  });

  it('handles invalid JSON gracefully', async () => {
    render(<JSONEditor schema="{}" setSchema={mockSetSchema} />);
    const editor = screen.getByRole('textbox');
    await userEvent.type(editor, '{ invalid JSON }');
    expect(mockSetSchema).toHaveBeenCalled();
  });
});
