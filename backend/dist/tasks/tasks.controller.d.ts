import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(status: string, req: any): Promise<(import("mongoose").Document<unknown, {}, import("./task.schema").Task> & import("./task.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(createTaskDto: any, req: any): Promise<import("mongoose").Document<unknown, {}, import("./task.schema").Task> & import("./task.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    toggleStatus(id: string): Promise<import("mongoose").Document<unknown, {}, import("./task.schema").Task> & import("./task.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
