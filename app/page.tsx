import { Mangaswiper } from '@/components/index/Mangaswpier';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Topswiper } from '@/components/index/Topswiper';
import { MainColumn } from '@/components/layout/MainColumn';

export default function HomePage() {
  return (
    <>
      <MainColumn>
        <Topswiper />
        <Mangaswiper />
      </MainColumn>
      <Sidebar />
    </>
  );
}
