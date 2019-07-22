import React, { Fragment, useState, useEffect } from 'react';
import { Todo, ADD, SET, AppActions, COM, DEL, UPD } from './reducer/todo';
import { AppState } from './reducer/index';
import { connect, useDispatch, useSelector, useAction } from 'react-redux';

type FormElem = React.FormEvent<HTMLFormElement>
type ChangeElem = React.ChangeEvent<HTMLInputElement>

interface IndexProps {

}

const Index = () => {
    const dispatch = useDispatch<AppActions>();
    const todos = useSelector(state => state.todo);

    const [value, setValue] = useState<string>('');
    const [updateValue, setUpdateValue] = useState<string>('');
    // const [todos, setTodos] = useState<Todo[]>([]);
    
    useEffect(() => {
        dispatch({
            type: SET,
            todos: 
            [{
                text: 'test1',
                complete: false,
                update: false
            },
            {
                text: 'test2',
                complete: false,
                update: false
            },
            {
                text: 'text3',
                complete: false,
                update: false
            }]
        })
    }, []);

    const handleSubmit = (e: FormElem): void => {
        e.preventDefault();
        addTodo(value);
        setValue('');
    }

    const handleChange = (e: ChangeElem, todo: Todo): void => {
        //debugger;
        // const newTodos: Todo[] = [...todos];
        // newTodos[index].text = e.currentTarget.value;
        //setTodos(newTodos);

        todo.text = e.currentTarget.value;
    }

    const addTodo = (text: string) => {
        console.log(...todos, {text, complete: false, update: false});
        const newTodo = {text, complete: false, update: false};

        dispatch({
            type: ADD,
            todo: newTodo
        })
    }

    const completeTodo = (index: number): void => {
        console.log("complete : ", todos[index], index);
        dispatch({
            type: COM,
            index: index
        });
    }

    const deleteTodo = (index: number): void => {
        console.log("delete : ", todos[index]);
        dispatch({
            type: DEL,
            index: index
        });
    }

    const updateTodo = (todo: Todo): void => {
        console.log("update : ", todos);
        dispatch({
            type: UPD,
            todo
        });


        // const newTodos: Todo[] = [...todos];
        // newTodos[index].update = !newTodos[index].update;
        // console.log("update : ", todos[index], index);
        // setTodos(newTodos);
    }

    return (
        <Fragment>
            <h1>CRUD free render Temp</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} required/>
                <button type="submit">Add</button>
            </form>
            <section>
                {todos.map((todo: Todo, index: number) => {
                    return (
                        <Fragment key={index}>
                            {
                                todo.update ? 
                                <div>
                                    <input type="text" value={todo.text} onChange={(e) => handleChange(e, todo)}/>
                                </div>
                                :
                                <div style={{textDecoration: todo.complete ? 'line-through' : ''}}>{todo.text}</div>
                            }
                            <button type="button" onClick={() => completeTodo(index)}>
                                {' '}{todo.complete ? 'Incomplete' : 'Complete'}{' '}
                            </button>
                            <button type="button" onClick={() => updateTodo(todo)}>{todo.update ? 'update complete' : 'update'}</button>
                            <button type="button" onClick={() => deleteTodo(index)}>&times;</button>
                        </Fragment>
                    );
                })}
            </section>
            <button onClick={() => console.log('test')}>Load</button>
        </Fragment>
    );
};

export default Index;
