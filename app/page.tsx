import { Sidebar } from '@/components/index/Sidebar';
import { Topswiper } from '@/components/index/Topswiper';
import { MainColumn } from '@/components/layout/MainColumn';

export default function HomePage() {
  return (
    <>
      <MainColumn>
        <Topswiper />
      </MainColumn>
      <Sidebar />
    </>
  );
}
