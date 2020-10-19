import { Controller, Get, Param } from "@nestjs/common";

import {
    IdParam,
    TestService,
    TagsParam,
} from "@services/test.service";

@Controller()
export class AppController {
    constructor(private testService: TestService) { }
    
    @Get()
    getHTML() {
        return "Hello world";
    }

    @Get("id/:id")
    async getTestWithId(@Param() { id }: IdParam) {
        return await this.testService.getTestWithId(id);
    }

    @Get("tags/:tags")
    async getTestWithTags(@Param() { tags }: TagsParam) {
        return await this.testService.getTestWithTags(tags);
    }

}
