import { render, screen, fireEvent } from '@testing-library/react';
import FormGenerator from '../src/components/FormGenerator';
import { FormSchema } from '../src/types/formSchema';

describe('FormGenerator', () => {
  const sampleSchema: FormSchema = {
    formTitle: "Test Form",
    formDescription: "This is a test form",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Invalid email format",
        },
      },
    ],
  };

  it('renders form title and description', () => {
    render(<FormGenerator schema={sampleSchema} />);
    expect(screen.getByText("Test Form")).toBeInTheDocument();
    expect(screen.getByText("This is a test form")).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<FormGenerator schema={sampleSchema} />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<FormGenerator schema={sampleSchema} />);
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("This field is required.")).toBeInTheDocument();
  });

  it('validates email pattern', async () => {
    render(<FormGenerator schema={sampleSchema} />);
    const emailField = screen.getByLabelText("Email Address");
    fireEvent.change(emailField, { target: { value: "invalid-email" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });

  it('submits valid data', () => {
    console.log = jest.fn(); // Mock console.log
    render(<FormGenerator schema={sampleSchema} />);
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(console.log).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
    });
  });
});
