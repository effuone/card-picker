import CreateCardModal from '@/components/create-card-modal';
import MainLayout from '@/components/main-layout';
import { FC } from 'react';

const MyCardsPage: FC = () => {
  return (
    <MainLayout route={'/cards'}>
      <h1>Cards</h1>
      <CreateCardModal />
    </MainLayout>
  );
};

export default MyCardsPage;
