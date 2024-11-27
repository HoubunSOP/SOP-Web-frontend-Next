import {MainColumn} from '@/components/layout/MainColumn';
import '../globals.css';
import Loading from "@/app/magazine/[id]/loading";
import {Suspense} from "react";
import Content from "@/app/magazine/[id]/content";
import dynamic from "next/dynamic";
import {fetchMagazineDetail} from "@/utils/api";
import {MangazineDetail} from "@/type/mangazine";

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
    ssr: false,
});

export async function generateMetadata({params}: { params: { id: number } }) {
    const {id} = params;
    const magazineDetail = (await fetchMagazineDetail(id)) as MangazineDetail;

    return {
        title: magazineDetail.detail.magazine.name,
    };
}

export default async function MagazinePage({params}: { params: { id: number } }) {
    const {id} = params;
    const magazineDetail = (await fetchMagazineDetail(id)) as MangazineDetail;
    return (
        <>
            <MainColumn>
                <Suspense fallback={<Loading/>}>
                    <Content data={magazineDetail}/>
                </Suspense>
            </MainColumn>
            <Sidebar/>
        </>
    );
}
export const dynamicParams = true;
