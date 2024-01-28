import { CreateUserArgs, CreateUserRow } from "~/routes/api/sqlc/query_sql";
import { IUserRepository } from "../repository/user/user.server";

export class CreateTodoUsecase {
    private readonly userRepository: IUserRepository;

    constructor(todoRepository: IUserRepository) {
        this.userRepository = todoRepository;
    }
    
    async execute(todo: CreateUserArgs): Promise<CreateUserRow> {
        return await this.userRepository.create(todo);
    }
}