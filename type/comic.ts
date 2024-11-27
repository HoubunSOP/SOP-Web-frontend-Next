export interface Category {
    id: number;
    name: string;
}

export interface Detail {
    id: number;
    title: string;
    date: string;
    cover: string;
    content: string;
    author: {
        id: number;
        username: string;
        user_avatar: string;
        user_bio: string;
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