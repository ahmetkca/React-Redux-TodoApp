import { createTodo } from "../db/todos";

export const createTodoRoute = {
    method: "POST",
    path: "/todos",
    handler: async (req, res) => {
        const { text } = req.body;
        
        try {
            return res.status(200).json(createTodo({ text }));
        } catch (error) {
            return res.status(500).json({ name: error.name, message: error.message });
        }
    }
}