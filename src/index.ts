import { Application } from 'express';
import createApplication from './app';

const app: Application = createApplication();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
