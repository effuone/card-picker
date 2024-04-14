-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "currentHashedRefreshToken" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankCardType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bankId" INTEGER NOT NULL,

    CONSTRAINT "BankCardType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersCards" (
    "userId" INTEGER NOT NULL,
    "cardTypeId" INTEGER NOT NULL,

    CONSTRAINT "UsersCards_pkey" PRIMARY KEY ("userId","cardTypeId")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "address" TEXT,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashbackOffer" (
    "id" SERIAL NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "cardTypeId" INTEGER NOT NULL,
    "cashbackPercent" DOUBLE PRECISION NOT NULL,
    "discountPercent" DOUBLE PRECISION,
    "requirements" TEXT,
    "offerEndDate" TIMESTAMP(3),

    CONSTRAINT "CashbackOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "BankCardType" ADD CONSTRAINT "BankCardType_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersCards" ADD CONSTRAINT "UsersCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersCards" ADD CONSTRAINT "UsersCards_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "BankCardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashbackOffer" ADD CONSTRAINT "CashbackOffer_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashbackOffer" ADD CONSTRAINT "CashbackOffer_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "BankCardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
