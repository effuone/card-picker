import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CardsService {
  constructor(private databaseService: DatabaseService) {}

  async getAllPartners(
    cardTypeName: string,
    categoryId?: number,
    search: string = '',
    page: number = 1,
    pageSize: number = 10,
  ) {
    const cardType = await this.databaseService.bankCardType.findFirst({
      where: { name: cardTypeName },
    });

    if (!cardType) {
      throw new Error(`Card type with name '${cardTypeName}' not found`);
    }

    const whereClause: any = {
      name: { contains: search, mode: 'insensitive' },
      CashbackOffers: { some: { cardTypeId: cardType.id } },
    };

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const partners = await this.databaseService.partner.findMany({
      where: whereClause,
      include: {
        Category: true,
        CashbackOffers: {
          where: { cardTypeId: cardType.id },
          include: { BankCardType: true },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    partners.sort((a, b) => {
      const maxCashbackA = a.CashbackOffers.reduce(
        (max, offer) => Math.max(max, offer.cashbackPercent),
        0,
      );
      const maxCashbackB = b.CashbackOffers.reduce(
        (max, offer) => Math.max(max, offer.cashbackPercent),
        0,
      );
      return maxCashbackB - maxCashbackA; // For descending order
    });

    return partners.map((partner) => ({
      id: partner.id,
      name: partner.name,
      image: partner.image,
      address: partner.address,
      description: partner.description,
      category: partner.Category.name,
      cashbackPercent: partner.CashbackOffers[0]?.cashbackPercent,
      discountPercent: partner.CashbackOffers[0]?.discountPercent,
      requirements: partner.CashbackOffers[0]?.requirements,
      offerEndDate: partner.CashbackOffers[0]?.offerEndDate,
      cardType: partner.CashbackOffers[0]?.BankCardType.name,
    }));
  }
}
