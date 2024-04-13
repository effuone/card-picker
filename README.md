# CardPicker

## Introduction

CardPicker is a web-based platform designed to assist consumers in making economically efficient decisions by selecting the appropriate credit card for each transaction. This service enables users to maximize cashback rewards by analyzing and comparing current offers from various banks and financial institutions.

## Technical Stack

### Backend

- **Technologies**: Node.js, Nest.js
- **AI Integration**: OpenAI library for best optimal card analysis based on offer requirements.
- **Job Queueing**: Redis with Nest.js BullMQ for managing background scrapping tasks of new cashback offers.

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
5. **Migrate/Populate databases**: Execute `npx prisma db push` in API directory to create PostgreSQL tables using Prisma
6. **Start application**: Run `yarn run start:dev` in API directory and `yarn dev` in web directory