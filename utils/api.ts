// 获取漫画列表
export const fetchComics = async (page: number, category_id?: string | null) => {
    let url = `/comic/list?limit=12&page=${page}`;
    if (category_id != null) {
        url += `&category_id=${category_id}`;
    }

    try {
        const response = await fetch(`https://api.fwgxt.top/api${url}`);
        const data = await response.json();

        if (data.status === 'error') {
            console.log('页码超数');
            return { items: [], total_pages: 1, error: true };
        }

        return { items: data.message.comics, total_pages: data.message.total_pages, error: false };
    } catch (error) {
        console.error('请求漫画列表失败:', error);
        return { items: [], total_pages: 1, error: true };
    }
};

// 获取文章列表
export const fetchPosts = async (page: number, category_id?: string | null) => {
    let url = `/post/list?limit=12&page=${page}`;
    if (category_id != null) {
        url += `&category_id=${category_id}`;
    }

    try {
        const response = await fetch(`https://api.fwgxt.top/api${url}`);
        const data = await response.json();

        if (data.status === 'error') {
            console.log('页码超数');
            return { items: [], total_pages: 1, error: true };
        }

        return { items: data.message.articles, total_pages: data.message.total_pages, error: false };
    } catch (error) {
        console.error('请求文章列表失败:', error);
        return { items: [], total_pages: 1, error: true };
    }
};
