import { List } from 'postcss/lib/list';

interface ComicData {
  status: string;
  message: {
    comic_id: Number;
    comic_name: string;
    comic_author: string;
    comic_date: string;
    comic_intro: string;
    comic_cover: string;
    comic_magazine: string;
    categories: List; // 根据实际情况定义categories的类型
  };
}

interface ItemData {
  label: string;
  value: string | number;
}

export default function ComicInfo({ data }: { data: ComicData }) {
  const renderItem = ({ label, value }: ItemData) => (
    <div className="py-3 flex border-b border-gray-200">
      <div className="ListTerm min-w-[6em] text-[#808080] text-sm font-normal">{label}</div>
      <div className="m-0 flex-1 text-[#242a36] text-sm font-medium">
        <p className="text-[#0189EC] mr-4 inline-block">{value || '暂无信息'}</p>
      </div>
    </div>
  );

  return (
    <div className="border-t-2 border-solid border-gray-300 py-6 mt-6">
      <h2 className="mb-3.5">
        <span className="font-bold text-base text-[#242a36] tracking-wide">漫画详情</span>
      </h2>
      {renderItem({
        label: '系列',
        value: data.message.comic_name,
      })}
      {renderItem({
        label: '卷数',
        value: 1,
      })}
      {renderItem({
        label: '作者',
        value: data.message.comic_author,
      })}
      {renderItem({
        label: '发售日',
        value: data.message.comic_date,
      })}
      {renderItem({
        label: '连载刊物',
        value: data.message.comic_magazine,
      })}
      {renderItem({
        label: 'ISBN',
        value: 1,
      })}
    </div>
  );
}
