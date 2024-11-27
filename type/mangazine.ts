export interface Category {
    id: number;
    name: string;
}

export interface MangazineItem {
    id: number;
    name: string;
    publish_date: string;
    cover: string;
    intro: string;
    link: string;
}

export interface Detail {
    magazine: MangazineItem;
    comics: string[];
    categories: Category[];
}

export interface MangazineDetail {
    status: number;
    detail: Detail;
}