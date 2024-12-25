import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';

@Controller('memo')
export class MemoController {
    constructor(private readonly memoService: MemoService) {}

    @Post()
    async createMemo(@Body() createMemoDto: CreateMemoDto) {
        return await this.memoService.create(createMemoDto);
    }

    @Get()
    async findAll() {
        return await this.memoService.findAll();
    }

    @Get('memosid')
    async findByMemosId(@Body('memosId') memosId: string) {
        return await this.memoService.findByMemosId(memosId);
    }
}
