import axios from "axios";
import {GetStaticProps, GetStaticPaths} from 'next';

const API_URL = 'https://api-url.com';

type ResourceType = 'comics' | 'articles' | 'magazines';

interface PaginationParams {
    page?: number;
    limit?: number;
    category_id?: number;
}

interface SearchParams {
    query: string;
    resource_type?: ResourceType | 'all';
    page?: number;
    limit?: number;
}

// Generic API fetch function
async function fetchAPI<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const response = await axios.get(`${API_URL}${endpoint}`, {params});
    return response.data;
}

// API methods
export const listResources = (resourceType: ResourceType, params: PaginationParams = {}) =>
    fetchAPI(`/list/${resourceType}`, params);

export const searchResources = (params: SearchParams) =>
    fetchAPI('/search', params);

export const getArticleDetail = (articleId: number, edit: boolean = false) =>
    fetchAPI(`/articles/${articleId}`, {edit});

export const getComicDetail = (comicId: number, edit: boolean = false) =>
    fetchAPI(`/comics/${comicId}`, {edit});

export const getMagazineDetail = (magazineId: number, edit: boolean = false) =>
    fetchAPI(`/magazines/${magazineId}`, {edit});

export const getCategories = (categoryTypeId?: number) =>
    fetchAPI('/categories', {category_type_id: categoryTypeId});

export const getRecommendedArticles = (limit: number = 5) =>
    fetchAPI('/recommended', {limit});

export const getComicsCalendar = () =>
    fetchAPI('/calendar');

// Next.js ISR methods
export const getStaticArticleProps: GetStaticProps = async ({params}) => {
    const articleId = params?.articleId as string;
    const article = await getArticleDetail(Number(articleId));
    return {
        props: {article},
        revalidate: 360, // 每360秒查询刷新情况
    };
};

export const getStaticComicProps: GetStaticProps = async ({params}) => {
    const comicId = params?.comicId as string;
    const comic = await getComicDetail(Number(comicId));
    return {
        props: {comic},
        revalidate: 360, // 每360秒查询刷新情况
    };
};

export const getStaticMagazineProps: GetStaticProps = async ({params}) => {
    const magazineId = params?.magazineId as string;
    const magazine = await getMagazineDetail(Number(magazineId));
    return {
        props: {magazine},
        revalidate: 360, // 每360秒查询刷新情况
    };
};

// Next.js getStaticPaths
export const getArticlePaths: GetStaticPaths = async () => {
    const data = await listResources('articles', {limit: 100});
    const paths = data.items.map((item: { id: number }) => ({
        params: {articleId: item.id.toString()},
    }));
    return {paths, fallback: 'blocking'};
};

export const getComicPaths: GetStaticPaths = async () => {
    const data = await listResources('comics', {limit: 100});
    const paths = data.items.map((item: { id: number }) => ({
        params: {comicId: item.id.toString()},
    }));
    return {paths, fallback: 'blocking'};
};

export const getMagazinePaths: GetStaticPaths = async () => {
    const data = await listResources('magazines', {limit: 100});
    const paths = data.items.map((item: { id: number }) => ({
        params: {magazineId: item.id.toString()},
    }));
    return {paths, fallback: 'blocking'};
};
