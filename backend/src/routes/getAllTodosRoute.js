import { getTodos } from "../db/todos";

export const getAllTodosRoute = {
    method: "GET",
    path: "/todos",
    handler: async (req, res) => {
        return res.status(200).json(getTodos());
    }
}