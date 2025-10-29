import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "./clients.entity";


@Module({
    imports: [TypeOrmModule.forFeature([ClientEntity])],
})

export class ClientModule {}