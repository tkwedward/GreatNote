declare let projectArray: ({
    name: string;
    description: string;
    reason: string;
    array: {
        name: string;
        description: string;
        reason: string;
        array: ({
            name: string;
            description: string;
            time: string;
            taskArray: {
                name: string;
                description: string;
                record: {
                    content: string;
                    date: string;
                }[];
                startDate: string;
                endDate: string;
            }[];
        } | {
            name: string;
            description: string;
            time?: undefined;
            taskArray?: undefined;
        })[];
    }[];
} | {
    name: string;
    description: string;
    reason: string;
    array: {
        name: string;
        missonType: string;
    }[];
})[];
