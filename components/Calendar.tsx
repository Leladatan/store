"use client";

import {type FC, useMemo, useState} from 'react';

const weeks = [
    {
        index: 1,
        value: "Понедельник"
    },
    {
        index: 2,
        value: "Вторник"
    },
    {
        index: 3,
        value: "Среда"
    },
    {
        index: 4,
        value: "Четверг"
    },
    {
        index: 5,
        value: "Пятница"
    },
    {
        index: 6,
        value: "Суббота"
    },
    {
        index: 0,
        value: "Воскресенье"
    },
];

const months = [
    {
        index: 0,
        value: 'Январь',
    },
    {
        index: 1,
        value: 'Февраль',
    },
    {
        index: 2,
        value: 'Март',
    },
    {
        index: 3,
        value: 'Апрель',
    },
    {
        index: 4,
        value: 'Май',
    },
    {
        index: 5,
        value: 'Июнь',
    },
    {
        index: 6,
        value: 'Июль',
    },
    {
        index: 7,
        value: 'Август',
    },
    {
        index: 8,
        value: 'Сентябрь',
    },
    {
        index: 9,
        value: 'Октябрь',
    },
    {
        index: 10,
        value: 'Ноябрь',
    },
    {
        index: 11,
        value: 'Декабрь',
    },
];

const years = [
    {
        value: 2023,
    },
    {
        value: 2024,
    },
];



const Calendar: FC = () => {
    const [panelYear, setPanelYear] = useState<number>(() => new Date().getFullYear());
    const [panelMonth, setPanelMonth] = useState<number>(() => new Date().getMonth());

    const getDaysAmountInAMonth = (year: number, month: number) => {
        const nextMonthDate: Date = new Date(year, month + 1, 1);

        nextMonthDate.setMinutes(-1);
        return nextMonthDate.getDate();
    };

    const getPreviousMonthDays = (year: number, month: number) => {
        const currentMonthFirstDay = new Date(year, month, 1);
        const dayOfTheWeek = currentMonthFirstDay.getDay();
        const prevMonthDateAmount = dayOfTheWeek - 1;

        const daysAmountInPrevMonth = getDaysAmountInAMonth(year, month - 1);

        const dateCells = [];
        const [cellYear, cellMonth] = month === 0 ? [year - 1, 11] : [year, month];

        for (let i = prevMonthDateAmount - 1; i >= 0; i--) {
            dateCells.push({
                year: cellYear,
                month: cellMonth,
                date: daysAmountInPrevMonth - i,
            });
        }

        return dateCells;
    };

    const getNextMonthDays = (year: number, month: number) => {
        const currentMonthFirstDay: Date = new Date(year, month, 1);
        const dayOfTheWeek: number = currentMonthFirstDay.getDay();
        const prevMonthDateAmount: number = dayOfTheWeek - 1;

        const daysAmount: number = getDaysAmountInAMonth(year, month);

        const nextMonthDays: number = 42 - daysAmount - prevMonthDateAmount;

        const dateCells = [];
        const [cellYear, cellMonth] = month === 11 ? [year + 1, 0] : [year, month + 1];

        for (let i = 1; i <= nextMonthDays; i++) {
            dateCells.push({
                year: cellYear,
                month: cellMonth,
                date: i,
            });
        }

        return dateCells;
    };

    const getCurrentMonthDays = (year: number, month: number, numberOfDays: number) => {
        const dateCells = [];

        for (let i = 1; i <= numberOfDays; i++) {
            dateCells.push(
                {
                    year,
                    month,
                    date: i
                });
        }

        return dateCells;
    };

    const dateCells = useMemo(() => {
        const daysInAMonth: number = getDaysAmountInAMonth(panelYear, panelMonth);

        const currentMonthDays = getCurrentMonthDays(panelYear, panelMonth, daysInAMonth);

        const prevMonthDays = getPreviousMonthDays(panelYear, panelMonth);
        const nextMonthDays = getNextMonthDays(panelYear, panelMonth);

        return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    }, [panelYear, panelMonth])

    const prevMonth = (): void => {
        if (panelMonth === 0) {
            setPanelMonth(11);
            setPanelYear(panelYear - 1);
        } else {
            setPanelMonth(panelMonth - 1)
        }
    };

    const prevYear = (): void => {
        setPanelYear(panelYear - 1);
    };

    const nextMonth = (): void => {
        if (panelMonth === 11) {
            setPanelMonth(0);
            setPanelYear(panelYear + 1);
        } else {
            setPanelMonth(panelMonth + 1)
        }
    };

    const nextYear = (): void => {
        setPanelYear(panelYear + 1);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <button onClick={prevYear}>Prev Year</button>
                    <button onClick={prevMonth}>Prev Month</button>
                    <button onClick={nextMonth}>Next Month</button>
                    <button onClick={nextYear}>Next Year</button>
                </div>
                <div className="grid grid-cols-7">
                    {weeks.map(week => (
                        <span key={week.index} className="text-center">{week.value}</span>
                    ))}
                </div>
                <div className="grid grid-cols-7 grid-rows-7 border">
                    {dateCells.map((cell, index) => {
                        const isCurrentDate = cell.year === new Date().getFullYear() && cell.month === new Date().getMonth() && cell.date === new Date().getDate();
                        return <div key={index} className="flex justify-end border w-[200px] h-[100px] p-2">
                            <p className={isCurrentDate ? "text-center text-red-500" : "text-center"}>{cell.date}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
