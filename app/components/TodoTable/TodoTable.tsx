"use client";
import { FC } from 'react';
import styles from './TodoTable.module.scss';
import { ITodo } from '@/app/page';

interface ITodoTable {
    todos: Array<ITodo>;
    onDelete: (id: string) => void;
    onEdit: (todo: ITodo) => void;
    setIsEdit: (isEdit: boolean) => void;
}

export const TodoTable: FC<ITodoTable> = ({ todos, onDelete, onEdit, setIsEdit }) => {

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {todos.map((_data: ITodo) =>
                        <tr key={_data?.id} style={{ backgroundColor: _data.color }}>
                            <td>{_data.title}</td>
                            <td>{_data.description}</td>
                            <td>{_data.priority}</td>
                            <td>{_data.status}</td>
                            <td>
                                <button>view</button>
                            </td>
                            <td>
                                <button onClick={() => { onEdit(_data); setIsEdit(true); }}>edit</button>
                            </td>
                            <td>
                                <button onClick={() => onDelete(_data.id)}>delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}