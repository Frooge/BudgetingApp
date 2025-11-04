export const useDateFormatter = () => {
    const formatDateSection = (date: Date): string => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Reset time to midnight for accurate comparison
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);

        const todayOnly = new Date(today);
        todayOnly.setHours(0, 0, 0, 0);

        const yesterdayOnly = new Date(yesterday);
        yesterdayOnly.setHours(0, 0, 0, 0);

        if (dateOnly.getTime() === todayOnly.getTime()) {
            return 'TODAY';
        } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
            return 'YESTERDAY';
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }).toUpperCase();
        }
    };

    return { formatDateSection };
};
