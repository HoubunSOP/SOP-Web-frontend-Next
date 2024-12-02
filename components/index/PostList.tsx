'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PostListLoading } from '@/components/index/PostList.loading'
import { Detail } from '@/type/article'
import './PostList.css'
import { fetchArticles } from '@/utils/api'

export function PostList() {
  const [articles, setArticles] = useState<Detail[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const loadFetch = async () => {
      try {
        const data = await fetchArticles(1)
        setArticles(data.detail.items)
      } catch (error) {
        console.error('获取文章失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFetch()
  }, [])

  return (
    <div>
      <div>
        <h3 className="text-white mb-2 mt-10 mx-5 py-2.5 bg-[#4453c1] rounded-2xl text-center">
          <i className="fa-duotone fa-stars" />
          观星资讯
          <i className="fa-duotone fa-moon-stars" />
        </h3>
        <div className="ContentContainer">
          {isLoading ? (
            <PostListLoading />
          ) : (
            articles.map((article) => (
              <Link
                href={`/post/${article.id}`}
                key={article.id} // 使用唯一的 id 作为 key
                className="pt-[26px] pb-[15px] px-6 relative rounded-md flex flex-wrap overflow-hidden transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out"
              >
                <p className="aText overflow-hidden h-[3.8rem] mr-5 text-sm font-medium line-clamp-3">
                  {article.title}
                </p>
                <div className="justify-self-end ml-auto w-[120px] h-[72px] md:w-[142px] md:h-[88px] rounded-md overflow-hidden relative">
                  <div className="h-full relative">
                    <img
                      loading="lazy"
                      className="w-[100%] h-[100%] absolute top-0 left-0 object-cover"
                      src={article.cover}
                      alt="post cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-2.5">
                  <Link
                    href={`/list/post?category_id=${article.categories[0].id}`} // 使用合适的查询参数
                    className="text-xs md:text-sm font-medium tracking-wide text-[#808080]"
                  >
                    <i className="fa-duotone fa-list-ul mr-1" />
                    {article.categories[0].name}
                  </Link>
                  <span className="text-xs md:text-sm font-medium tracking-wide text-[#808080] pl-2">
                    <i className="fa-duotone fa-calendar-week mr-1" />
                    {article.date}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
