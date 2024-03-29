import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbcService } from './abc.service';
import { CreateAbcDto } from './dto/create-abc.dto';
import { UpdateAbcDto } from './dto/update-abc.dto';
import { Logger } from 'src/core/logger';

@Controller('abc')
export class AbcController {
  constructor(
    private readonly abcService: AbcService,
    private readonly log: Logger,
  ) { }

  @Post()
  create(@Body() createAbcDto: CreateAbcDto) {
    return this.abcService.create(createAbcDto);
  }

  @Get()
  findAll() {

    this.log.log('alo alo alo')

    return this.abcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbcDto: UpdateAbcDto) {
    return this.abcService.update(+id, updateAbcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abcService.remove(+id);
  }
}
