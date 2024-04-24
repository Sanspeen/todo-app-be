import Task from '../models/tasksModel.js'

export const getTasks = async (req, res) => {
    
    try {

        const tasks = await Task.find({});
        res.status(200).json(tasks);    
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};

export const getTask = async (req, res) => {
    try {

        const {id} = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task);    
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};


export const createTasks = async (req, res) => {
    
    try {

        const task = await Task.create(req.body)
        res.status(200).json(task);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
        
    }
};

export const updateTasks = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id,req.body);

        if (!task){
            return res.status(400).json({message: `Cannot find any task with ${id} `})
        }
        const updatetask = await Task.findById(id,req.body);
        res.status(200).json(updatetask);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
        
    }
};

export const deleteTask = async (req, res) => {

    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        
        if (!task){
            return res.status(404).json({message: `Cannot find any task with ${id} `})
        }
        res.status(200).json(task);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
    
};

