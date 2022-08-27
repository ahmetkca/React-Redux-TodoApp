import { markTodoAsComplete } from "../db/todos";

export const markTodoAsCompleteRoute = {
    method: "PUT",
    path: "/todos/:id/complete",
    handler: async (req, res) => {
        const { id } = req.params;
        try {
            return res.status(200).json(markTodoAsComplete(id));
        } catch (error) {
            return res.status(404).json({ name: error.name, message: error.message });
        }
    }
}