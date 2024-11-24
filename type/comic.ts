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

export interface ComicDetail {
    status: number;
    detail: Detail;
}