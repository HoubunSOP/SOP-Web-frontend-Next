import {MainColumn} from '@/components/layout/MainColumn';
import '../globals.css';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import Loading from "@/app/comic/[id]/loading";
import {Suspense} from "react";
import Content from "@/app/comic/[id]/content";

export default async function ComicPage({params}: { params: { id: number } }) {
    const {id} = params;

    return (
        <>
            <MainColumn>
                <Suspense fallback={<Loading/>}>
                    <Content id={id}/>
                </Suspense>
            </MainColumn>
            <Sidebar/>
        </>
    );
}
export const dynamicParams = true;
