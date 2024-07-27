import {Skeleton} from "@mantine/core";
import ComicInfo from "@/components/comic/ComicInfo";

export default function Loading() {

    return (
        <div className="p-6 overflow-hidden box-border relative">
            <div className="flex flex-col md:flex-row ">
                <div className="info order-last md:order-first md:mr-4">
                    <div className="mb-2 mt-2 md:mt-0">
                        <h1 className="mb-[3px] text-lg m-0">
                            <Skeleton height={24} mt={6} width='80%' radius="xl"/>
                        </h1>
                    </div>
                    <p className="mb-2.5 m-0 text-sm tracking-wide">
                        <Skeleton height={8} mt={6} width='30%' radius="xl"/>
                    </p>
                    <Skeleton height={8} mt={6} width='40%' radius="xl"/>
                    <div className="border-t-2 border-solid border-gray-300 py-6 mt-6">
                        <h2 className="mb-3.5">
                            <span className="font-bold text-base text-[#242a36] tracking-wide">漫画简介</span>
                        </h2>
                        <Skeleton height={12} mt={10} radius="xl"/>
                        <Skeleton height={12} mt={10} radius="xl"/>
                        <Skeleton height={12} mt={10} radius="xl"/>
                        <Skeleton height={12} mt={10} radius="xl"/>
                        <Skeleton height={12} mt={10} radius="xl"/>
                        <Skeleton height={12} mt={10} width="70%" radius="xl"/>
                    </div>
                    <ComicInfo loading={true}/>
                </div>
                <div
                    className="w-[174px] order-first mx-auto md:ml-auto md:mb-auto md:mx-0 md:order-last md:self-end h-[245px] ">
                    <Skeleton height="245px" mt={6} width="174px" radius="md"/>
                </div>
            </div>
        </div>
    )
}

