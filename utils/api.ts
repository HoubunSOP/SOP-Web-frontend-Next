import {redirect} from "next/navigation";

const BASE_URL = "http://127.0.0.1:8000";

export const fetchMagazines = async (page: number, categoryId?: number) => {
    let url = `/list/magazines?limit=12&page=${page}`;
    if (categoryId) {
        url += `&category_id=${categoryId}`;
    }

    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    if (data.status !== 200) {
        throw new Error("Error fetching magazines");
    }
    return { items: data.detail.items, totalPages: data.detail.total_pages };
};

export const fetchNewComics = async () => {
    const url = "/new_comics";
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    return data.detail;
};

export const fetchRecommendedArticles = async () => {
    const url = "/recommended";
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    return data.detail;
};

export const fetchCalendar = async () => {
    const url = "/calendar";
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    return data;
};

export const fetchComics = async (page: number, categoryId?: number) => {
    let url = `/list/comics?limit=12&page=${page}`;
    if (categoryId) {
        url += `&category_id=${categoryId}`;
    }

    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    if (data.status !== 200) {
        throw new Error("Error fetching comics");
    }
    return { items: data.detail.items, totalPages: data.detail.total_pages };
};

export const fetchArticles = async (page: number, categoryId?: number) => {
    let url = `/list/articles?limit=12&page=${page}`;
    if (categoryId) {
        url += `&category_id=${categoryId}`;
    }

    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    if (data.status !== 200) {
        throw new Error("Error fetching articles");
    }
    return { items: data.detail.items, totalPages: data.detail.total_pages };
};

export const fetchArticleDetail = async (id: number) => {
    const url = `/articles/${id}`;
    const response = await fetch(`${BASE_URL}${url}`, {
        next: { revalidate: 60, tags: ["collection"] },
        headers: {
            "Content-Type": "application/json",
            "user-agent": "HoubunSOPWebResponse",
        },
    });
    const data = await response.json();
    if (data.status !== 200) {
        redirect('/not-found');
    }
    return data;
};

export const fetchComicDetail = async (id: number) => {
    const url = `/comics/${id}`;
    const response = await fetch(`${BASE_URL}${url}`, {
        next: { revalidate: 60, tags: ["collection"] },
        headers: {
            "Content-Type": "application/json",
            "user-agent": "HoubunSOPWebResponse",
        },
    });
    const data = await response.json();
    if (data.status !== 200) {
        throw new Error("Comic not found");
    }
    return data;
};

export const fetchMagazineDetail = async (id: number) => {
    const url = `/magazines/${id}`;
    const response = await fetch(`${BASE_URL}${url}`, {
        next: { revalidate: 60, tags: ["collection"] },
        headers: {
            "Content-Type": "application/json",
            "user-agent": "HoubunSOPWebResponse",
        },
    });
    const data = await response.json();
    if (data.status !== 200) {
        throw new Error("Magazine not found");
    }
    return data;
};
