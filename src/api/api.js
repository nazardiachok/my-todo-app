import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: [`Todos`],
  endpoints: (builder) => ({
    getTodosByTitle: builder.query({
      query: () => `todos`,
      providesTags: ["Todos"]
    }),
    changeTodo: builder.mutation({
      query:(item) => ({
        url: `/todos/${item.id}`,
        method: "PATCH",
        body: item
      }),
      invalidatesTags: ["Todos"]
    }),
    deleteTodo: builder.mutation({
      query: ({id})=> ({
        url: `/todos/${id}`,
        method: `DELETE`,
        body: id
      }),
      invalidatesTags: ["Todos"]
    })
  }),
})

export const {useGetTodosByTitleQuery, useChangeTodoMutation, useDeleteTodoMutation } = todosApi; // той хук має бути точно як треба з use..Query інакше помилка