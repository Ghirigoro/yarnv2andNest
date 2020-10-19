import { Module } from "@nestjs/common";
import { TestService } from '@services/test.service';
import { AppController } from "@controllers/app.controller";

@Module({
    imports: [
        AppModule,
    ],
    controllers: [AppController],
    providers: [TestService],
})
export class AppModule {}
