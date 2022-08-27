import { deleteTodo } from "../db/todos";

export const deleteTodoRoute = {
    method: "DELETE",
    path: "/todos/:id",
    handler: async (req, res) => {
        const { id } = req.params;
        try {
            return res.status(200).json(deleteTodo(id));
        } catch (error) {
            return res.status(500).json({ name: error.name, message: error.message });
        }
    }
}