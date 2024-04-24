import { Router } from "express";
import { getTasks, createTasks, getTask, deleteTask, updateTasks } from '../controllers/tasks.contollers.js';


const router = Router();

router.get('/tasks', getTasks);

router.get('/tasks/:id',getTask);

router.post('/tasks',createTasks);

router.put('/tasks/:id',updateTasks);


router.delete('/tasks/:id',deleteTask);


export default router;