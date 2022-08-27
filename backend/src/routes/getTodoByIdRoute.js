import { getTodoById } from "../db/todos";

export const getTodoByIdRoute = {
    method: "GET",
    path: "/todos/:id",
    handler: async (req, res) => {
        const { id } = req.params;
        try {
            return res.status(200).json(getTodoById(id));
        } catch (error) {
            return res.status(500).json({ name: error.name, message: error.message });
        }
    }
}