import { useQuery } from "@tanstack/react-query";

import { getSampleTodoService, type SampleTodo, type SampleTodoView } from "../services";

const SAMPLE_TODO_QUERY_KEY = ["sampleTodo"] as const;

const mapSampleTodoToView = (todo: SampleTodo): SampleTodoView => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
});

/**
 * useSampleTodo — query hook cho sample todo.
 * getSampleTodoService() giờ throw lỗi trực tiếp (axios style).
 * TanStack Query tự bắt và set isError — không cần kiểm tra Result wrapper.
 */
export function useSampleTodo() {
  return useQuery({
    queryKey: SAMPLE_TODO_QUERY_KEY,
    queryFn: async (): Promise<SampleTodoView> => {
      const todo = await getSampleTodoService();
      return mapSampleTodoToView(todo);
    },
    staleTime: 30_000,
  });
}
