import path from 'path';
import express from 'express';
import router from './routes';

const app = express();

app.set('views', path.join(process.cwd(),'./public/views'));
app.set('view engine', 'pug');

app.use('/static',express.static(path.join(process.cwd(),'./public/static')));
app.use('/',router);

app.listen(3000, () => console.log('Server listening at 3000'));