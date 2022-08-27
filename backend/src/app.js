import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    setTimeout(next, (Math.random() * 1000) + 250);
})

routes.forEach(route => {
    console.log(route);
    app[route.method.toLowerCase()](route.path, route.handler)
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
