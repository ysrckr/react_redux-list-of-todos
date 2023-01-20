/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getTodos } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';

type Props = {
  openModal: () => void;
};

export const TodoList: React.FC<Props> = ({ openModal }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const [isLoading, SetIsLoading] = useState(false);

  // prettier-ignore
  useEffect(() => {
    SetIsLoading(true);
    getTodos()
      .then((ts) => ts.map(t => dispatch({
        type: 'todo/SET',
        payload: t,
      })))
      .finally(() => SetIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered"> </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    openModal();
                    dispatch({
                      type: 'currentTodo/SET',
                      payload: todo,
                    });
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
