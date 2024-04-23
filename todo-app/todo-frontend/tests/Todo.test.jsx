import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../src/Todos/Todo.jsx';

const mockTodo = {
    text: 'This is a test Todo',
    done: false,
};

describe('Todo', () => {
    it('renders the Todo component', () => {
        render(<Todo todo={mockTodo} />);

        expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
    });

    it('invokes functions when buttons are clicked', () => {
        const mockDelete = vi.fn();
        const mockComplete = vi.fn();

        render(
            <Todo
                todo={mockTodo}
                deleteTodo={mockDelete}
                completeTodo={mockComplete}
            />
        );

        fireEvent.click(screen.getByText('Set as done'));
        expect(mockComplete).toHaveBeenCalledTimes(1);
        expect(mockComplete).toHaveBeenCalledWith(mockTodo);

        fireEvent.click(screen.getByText('Delete'));
        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(mockTodo);
    });
});
