import { Controller, Get, Query } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('partners')
  getAllPartners(
    @Query('cardType') cardTypeName: string = 'Halyk Bonus',
    @Query('categoryId') categoryId: number,
    @Query('search') search: string = '',
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const numPage = parseInt(page, 10) || 1;
    const numPageSize = parseInt(pageSize, 10) || 10;

    return this.cardsService.getAllPartners(
      cardTypeName,
      categoryId,
      search,
      numPage,
      numPageSize,
    );
  }
}
