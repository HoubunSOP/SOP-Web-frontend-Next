import dynamic from 'next/dynamic';

const PhotoClientComponent = dynamic(() => import('@/components/ImageView'), {
    ssr: false,
});
export default function App() {
    return (
        <PhotoClientComponent photoSrc="https://houbunsha.co.jp/items/comic/w214/9784832295193.jpg">
            <img src="https://houbunsha.co.jp/items/comic/w214/9784832295193.jpg" alt=""/>
        </PhotoClientComponent>
    );
}
