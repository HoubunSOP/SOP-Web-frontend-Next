import {redirect} from "next/navigation";

const BASE_URL = "https://sop-api.sakurakoi.top";

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

export const fetchComics = async (page: number, categoryId?: string | null) => {
    let url = `/list/comics?limit=12&page=${page}`;
    if (categoryId) {
        url += `&category_id=${categoryId}`;
    }

    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    if (data.status !== 200) {
        redirect('/not-found');
    }
    return data;
};

export const fetchMagazines = async (page: number, categoryId?: string | null) => {
    let url = `/list/magazines?limit=12&page=${page}`;
    if (categoryId) {
        url += `&category_id=${categoryId}`;
    }

    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    if (data.status !== 200) {
        redirect('/not-found');
    }
    return data;
};

export const fetchArticles = async (page: number, categoryId?: string | null) => {
    let url = `/list/articles?limit=12&page=${page}`;
    if (categoryId) {
        url += `&category_id=${categoryId}`;
    }

    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    if (data.status !== 200) {
        redirect('/not-found');
    }
    return data;
};

export const fetchCategories = async (type_id: number) => {
    let url = `/categories?category_type_id=${type_id}`;
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    if (data.status !== 200) {
        redirect('/not-found');
    }
    return data;
};

export const fetchArticleDetail = async (id: number) => {
    const url = `/articles/${id}`;
    const response = await fetch(`${BASE_URL}${url}`, {
        next: {revalidate: 600, tags: ["article"]},
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
        next: {revalidate: 600, tags: ["comics"]},
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

export const fetchMagazineDetail = async (id: number) => {
    const url = `/magazines/${id}`;
    const response = await fetch(`${BASE_URL}${url}`, {
        next: {revalidate: 600, tags: ["magazine"]},
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
