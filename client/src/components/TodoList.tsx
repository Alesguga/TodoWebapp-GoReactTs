import { Flex, Spinner, Stack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";
import { TodoListStyle } from "./TodoListStyle";

export type Todo = {
    _id: number;
    body: string;
    completed: boolean;
}

const TodoList = () => {
    const { data: todos, isLoading } = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            try {
                const res = await fetch(BASE_URL + "/todos");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Algo falla....");
                }
                return data || [];
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <>
            <Text fontSize={"4xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}
                bgGradient='linear(to-l, blue, lightblue)'
                bgClip='text'
            >
                Cosas por hacer
            </Text>
            {isLoading && (
                <Flex justifyContent={"center"} my={4}>
                    <Spinner size={"xl"} />
                </Flex>
            )}
            {!isLoading && todos?.length === 0 && (
                <Stack alignItems={"center"} gap='3'>
                    <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
                        Todo hecho! 🤞
                    </Text>
                    <img src='/go.png' alt='Go logo' width={70} height={70} />
                </Stack>
            )}
            <SimpleGrid columns={[1, null, 2]} spacing={3} px={4}>
                {todos?.map((todo) => (
                    <Box key={todo._id} className="todo-item-container">
                        <TodoItem todo={todo} />
                    </Box>
                ))}
            </SimpleGrid>
        </>
    );
};
export default TodoList;
