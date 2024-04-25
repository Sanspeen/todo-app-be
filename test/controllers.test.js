import { createTasks,getTask,getTasks,updateTasks,deleteTask } from "../server/controllers/tasks.contollers";   
import Task from "../server/models/tasksModel";
import {jest} from '@jest/globals'

jest.mock('../server/models/tasksModel');

describe('Task controllers', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("getTasks", () =>{

        it("Should return all tasks", async() =>{
            // Arrange
            const mockReq = {};
            const mockRes = {status: jest.fen().mockReturnTis(), json: jest.fn()};
            const mockTasks = [{title: "test Task 1"},{name: "Task 2"}]; 
            
            Task.find.mockResolvedValue(mockTasks);

            // Act

            await getTasks(mockReq,mockRes);

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
        });

        it(" Should return a mensaage when no tasks are available", async() =>{

            // Arrange
            const mockReq = {};
            const mockRes = {status: jest.fn().mockReturnValueThis(), json: jest.fn()};

            Task.find.mockResolvedValue([]);

            // Act
            await getTasks(mockReq,mockRes);

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({message: "No tasks available"});
        });

        it("Should handle error whe there is a problem retrieving tasks",async() =>{

            //Arrange
            const mockReq = {};
            const mockRes = {status: jest.fn().mockReturnValueThis(), json: jest.fn()};

            Task.find.mockRejectedValue(new Error("Error retrieving tasks"));

            // Act
            await getTasks(mockReq,mockRes);

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({message: "Error retrieving tasks"});
        })

    });


    describe('getTask', () => {
        it('should get a task by id', async () => {
            // Arrange
            const mockReq = { params: { id: '1' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const mockTask = { title: 'Test Task' };
        
            Task.findById.mockResolvedValue(mockTask);
        
            // Act
            await getTask(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockTask);
        });

        it('should return a message when the task id is invalid', async () => {
            // Arrange
            const mockReq = { params: { id: 'invalid' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            Task.findById.mockResolvedValue(null);
        
            // Act
            await getTask(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Task not found' });
        });

        it('should handle error when there is a problem retrieving the task', async () => {
            // Arrange
            const mockReq = { params: { id: '1' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            Task.findById.mockRejectedValue(new Error('Test error'));
        
            // Act
            await getTask(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Test error' });
        });
    });

    describe('createTasks', () => {
        it('should create a task', async () => {
            // Arrange
            const mockReq = { body: { title: 'Test Task' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const mockTask = { title: 'Test Task' };
        
            Task.create.mockResolvedValue(mockTask);
        
            // Act
            await createTasks(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(mockTask);
        });

        it('should return a message when the task data is invalid', async () => {
            // Arrange
            const mockReq = { body: { title: '' } }; // Invalid task data
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            Task.create.mockImplementation(() => {
                throw new Error('Validation Error');
            });
        
            // Act
            await createTasks(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Validation Error' });
        });
    
        it('should handle error when there is a problem creating the task', async () => {
            // Arrange
            const mockReq = { body: { title: 'Test Task' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            Task.create.mockRejectedValue(new Error('Test error'));
        
            // Act
            await createTasks(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Test error' });
        });
    });

    describe('updateTasks', () => {
            it('should update a task', async () => {
            // Arrange
            const mockReq = { params: { id: '1' }, body: { title: 'Updated Task' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const mockTask = { title: 'Updated Task' };
        
            Task.findByIdAndUpdate.mockResolvedValue(mockTask);
        
            // Act
            await updateTasks(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockTask);
        });
    
        it('should return a message when the task id is invalid', async () => {
            // Arrange
            const mockReq = { params: { id: 'invalid' }, body: { title: 'Updated Task' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            Task.findByIdAndUpdate.mockResolvedValue(null);
        
            // Act
            await updateTasks(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Task not found' });
        });
    
        it('should handle error when there is a problem updating the task', async () => {
            // Arrange
            const mockReq = { params: { id: '1' }, body: { title: 'Updated Task' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            Task.findByIdAndUpdate.mockRejectedValue(new Error('Test error'));
        
            // Act
            await updateTasks(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Test error' });
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            // Arrange
            const mockReq = { params: { id: '1' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            Task.findByIdAndDelete.mockResolvedValue(true);
        
            // Act
            await deleteTask(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Task deleted successfully' });
        });
    
        it('should handle error when there is a problem deleting the task', async () => {
            // Arrange
            const mockReq = { params: { id: '1' } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            Task.findByIdAndDelete.mockRejectedValue(new Error('Test error'));
        
            // Act
            await deleteTask(mockReq, mockRes);
        
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Test error' });
        });
    });

    
});