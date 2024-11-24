import {HoverCard, Indicator, List, ThemeIcon} from '@mantine/core';
import {Calendar} from '@mantine/dates';
import {IconNotebook} from '@tabler/icons-react';
import 'dayjs/locale/zh-cn';
import './IndexCalendar.css';
import {useEffect, useState} from 'react';

function IndexCalendar() {
    const [calendarDetail, setCalendarDetail] = useState<CalendarDetail | null>(null);

    useEffect(() => {
        const fetchCalendar = async () => {
            const url = `/calendar`;
            try {
                const response = await fetch(`http://127.0.0.1:8000${url}`);
                const data = (await response.json()) as CalendarDetail;
                setCalendarDetail(data);
            } catch (error) {
                console.error('Failed to fetch calendar data', error);
            }
        };
        fetchCalendar();
    }, []);

    // Group comics by date
    const comicsByDate = calendarDetail?.detail.reduce((acc: Record<string, string[]>, comic) => {
        const date = comic.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(comic.name);
        return acc;
    }, {});
    const getDateWithMonthsOffset = (monthsOffset: number) => {
        const currentDate = new Date();
        const currentMonth = new Date().getMonth();
        const targetMonth = (currentMonth + monthsOffset + 12) % 12;
        const targetYear = currentMonth + monthsOffset >= 12 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
        const targetDate = new Date(targetYear, targetMonth, currentDate.getDate());
        return targetDate;
    };
    return (
        <Calendar
            static
            locale="zh-cn"
            className="px-3 pb-3"
            maxLevel='month'
            maxDate={getDateWithMonthsOffset(3)}
            minDate={getDateWithMonthsOffset(-3)}
            defaultDate={new Date()}
            renderDay={(date) => {
                const day = date.getDate();
                // 使用本地日期格式化
                const fullDate = date.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).replace(/\//g, '-'); // 格式为 YYYY-MM-DD

                const comicsForDay = comicsByDate?.[fullDate] || [];
                const allComplete = comicsForDay.every((comicName) =>
                    calendarDetail?.detail.find(comic => comic.name === comicName)?.is_complete
                );

                return (
                    <>
                        <HoverCard
                            shadow="md"
                            withArrow
                            openDelay={200}
                            closeDelay={400}
                            disabled={comicsForDay.length === 0}
                        >
                            <HoverCard.Target>
                                <Indicator
                                    size={6}
                                    color={allComplete ? "red" : "green"}
                                    offset={-2}
                                    disabled={comicsForDay.length === 0}
                                >
                                    <div>{day}</div>
                                </Indicator>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <List
                                    spacing="xs"
                                    size="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="teal" size={24} radius="xl">
                                            <IconNotebook
                                                style={{
                                                    width: 16,
                                                    height: 16,
                                                }}
                                            />
                                        </ThemeIcon>
                                    }
                                >
                                    {comicsForDay.map((comicName, index) => (
                                        <List.Item key={index}>{comicName}</List.Item>
                                    ))}
                                </List>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </>
                );
            }}
        />
    );
}

export default IndexCalendar;
