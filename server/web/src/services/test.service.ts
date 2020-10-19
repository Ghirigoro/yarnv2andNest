import { Transform } from "class-transformer";
import { MinLength, IsString } from "class-validator";
import { HttpException, Injectable } from "@nestjs/common";
import {fromBase64} from "@common/util"

export class TagsParam {
    @Transform(
        (tags) => {
            let a: string[];
            const s = fromBase64(tags);
            try {
                a = JSON.parse(s);
            } catch (e) {
                throw new HttpException(`Cannot be parsed as JSON: ${s}`, 400);
            }
            return a;
        },
        { toClassOnly: true }
    )
    @IsString({ each: true })
    tags: string[];
}

export class IdParam {
    @Transform(fromBase64)
    @IsString()
    @MinLength(10, {
        message: `Id must be at least this long: $constraint1. Received: $value`,
    })
    id: string;
}

const TestData = {
    1: {tags:["a"], id:1, name:"A"},
    2: {tags:["b"], id:2, name:"B"}
}
type Test = typeof TestData[keyof typeof TestData]

@Injectable()
export class TestService {

    getTestWithTags(tags: string[]): Promise<Test[]> {
        return new Promise((resolve) => {
            resolve(
                Object.keys(TestData)
                    .map((key) => TestData[key])
                    .filter((s: Test) => {
                        for (let i = 0; i < tags.length; i++)
                            if (s.tags.indexOf(tags[i]) === -1) return false;
                        return true;
                    })
            );
        });
    }

    getTestWithId(id: string): Promise<Test> {
        return new Promise((resolve) => {
            const scenario = TestData[id];
            if (scenario === undefined) {
                throw new HttpException(
                    `No test found with id: ${id}`,
                    404
                );
            } else {
                resolve(scenario);
            }
        });
    }
}
