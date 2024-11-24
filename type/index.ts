interface Calendar {
    id: number;
    name: string;
    original_name: string;
    date: string;
    cover: string;
    is_complete: boolean;
}

interface CalendarDetail {
    status: number;
    message: string;
    detail: Calendar[];
}