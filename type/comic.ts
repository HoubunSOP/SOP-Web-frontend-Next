export interface Category {
    id: number;
    name: string;
}

export interface Detail {
    id: number;
    name: string;
    date: string;
    cover: string;
    intro: string;
    volume: number;
    isbn: number;
    auto: boolean;
    author: {
        id: number;
        name: string;
    };
    categories: Category[];
}

export interface NewComisDetail {
    id: number;
    name: string;
    date: string;
    cover: string;
}

export interface ComicDetail {
    status: number;
    detail: Detail;
}

export interface NComicDetail {
    status: number;
    detail: NewComisDetail[];
}