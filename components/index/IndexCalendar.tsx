import {HoverCard, Indicator, List, ThemeIcon} from '@mantine/core';
import {Calendar} from '@mantine/dates';
import {IconNotebook} from '@tabler/icons-react';
import 'dayjs/locale/zh-cn';
import './IndexCalendar.css';

interface CalendarData {
    id: number;
    name: string;
    date: string;
    cover: string;
    auto: number;
}

function IndexCalendar() {
    //const fetchComics = async () => {
    //  let url = `/comic/list?limit=12&page=${currentPage}`;
    //  if (category_id != null) {
    //    url += `&category_id=${category_id}`;
    //  }
    //  try {
    //    const response = await fetch(`https://api.fwgxt.top/api/${url}`);
    //    const data = await response.json();
    //    if (data.status === 'error') {
    //      console.log('error');
    //    }
    //  } catch (error) {}
    //};
    return (
        <Calendar
            static
            locale="zh-cn"
            defaultDate={new Date()}
            renderDay={(date) => {
                const day = date.getDate();
                const fullDate = date.toLocaleDateString();
                return (
                    <>
                        <HoverCard
                            shadow="md"
                            withArrow
                            openDelay={200}
                            closeDelay={400}
                            disabled={fullDate !== '2024/5/16'}
                        >
                            <HoverCard.Target>
                                <Indicator size={6} color="red" offset={-2} disabled={fullDate !== '2024/5/16'}>
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
                                    <List.Item>Clone or download repository from GitHub</List.Item>
                                    <List.Item>Install dependencies with yarn</List.Item>
                                    <List.Item>To start development server run npm start command</List.Item>
                                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                                    <List.Item>Submit a pull request once you are done</List.Item>
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
