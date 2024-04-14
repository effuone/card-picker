# CardPicker

## Introduction

CardPicker is a web-based platform designed to assist consumers in making economically efficient decisions by selecting the appropriate credit card for each transaction. This service enables users to maximize cashback rewards by analyzing and comparing current offers from various banks and financial institutions.

## Technical Stack

### Backend

- **Technologies**: Node.js, Nest.js, Cheerio, Axios
- **Job Queueing**: Redis with Nest.js BullMQ for managing background scrapping tasks of new cashback offers. UPD: Check Note for judges

### Frontend

- **Technologies**: React with Vite.js
- **UI Components**: @shadcn/ui for customizable UI elements.

## Features

- **Real-Time Cashback Comparisons**: Provides up-to-date cashback rates from multiple banks to ensure optimal savings.
- **Personalized Recommendations**: Offers suggestions based on the user’s own cards and spending habits.
- **User-Friendly Interface**: Simplifies the user experience to facilitate quick and effective decision-making.

## Setup

1. **Clone Repository**: `git clone https://github.com/effuone/card-picker`.
2. **Install Dependencies**: Run `yarn install` in both API and Web directories.
3. **Environment Configuration**: Rename `.env.example` to `.env` and update it with your development settings.
4. **Prepare databases**: Run `docker-compose -f docker-compose.dev.yml up -d` to run Docker container with NGINX web server, PostgreSQL and Redis databases. 
5. **Migrate database**: Execute `npx prisma db push` in API directory to create PostgreSQL tables using Prisma
5. **Populate database**: Execute `yarn seed` in API directory to populate the database with existing banks from Kazakhstan and their popular card types.
6. **Start application**: Run `yarn run start:dev` in API directory and `yarn dev` in web directory

## Note for judges
Our data was gathered from private APIs (BCC, Halyk) and parsed using scrapping techniques from inaccessible or server-driven ones (Forte). Unfortunately, we hadn't time to connect BullMq workers for weekly synchronization strategy, but here is the sample approach: 

```typescript
import axios from 'axios';
import * as fs from 'fs/promises';

//clean strings from html tags
function extractPlainText(html: string): string {
  if (!html) {
    return '';
  }

  if (html.trim().length == 0) {
    return html;
  }

  let text = html.replace(/<[^>]*>/g, '');

  const htmlEntities: { [key: string]: string } = {
    '&ndash;': '–',
    '&mdash;': '—',
    '&quot;': '"',
    '&apos;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': '',
    '&laquo;': '"',
    '&raquo;': '"',
  };
  for (const key in htmlEntities) {
    const entity = new RegExp(key, 'g');
    text = text.replace(entity, htmlEntities[key]);
  }

  text = text.replace(/\r?\n|\r/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

// get all partners of iron card type of bank center credit
const getIronCardPartners = async (pageId: number) => {
  const res = await axios.get('https://partners.org.kz/api/getpartner', {
    params: {
      card: 'ironcard',
      page: 1,
      city_id: 21,
    },
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'Sec-CH-UA':
        '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
      'Sec-CH-UA-Mobile': '?0',
      'Sec-CH-UA-Platform': '"Linux"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      Referer: 'https://club.bcc.kz/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });
  const arr: any[] = res.data.data;
  const partners = [];
  for (const partner of arr) {
    const detail = {
      partnerName: partner.title,
      discountPercent: Number(partner.discount),
      cardPartner: partner.card_partner,
      category: Number(partner.category),
      description: extractPlainText(partner.description),
    };
    partners.push(detail);
  }
  return partners;
};

//save it and access it from backend
const savePartners = async (partners: any, fileName: string) => {
  await fs.writeFile('ironCard.json', JSON.stringify(partners), {
    encoding: 'utf-8',
  });
};
```
