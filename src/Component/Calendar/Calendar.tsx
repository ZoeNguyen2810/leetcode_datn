import type { Dayjs } from 'dayjs';
import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';
import { ShowFrameTime } from './barSowInfo/ShowFrameTime';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);

};

const CalendarForm: React.FC = () => {
    const { token } = theme.useToken();
    const { setSelectedDate } = useGlobalContext()

    const wrCalendarFormerStyle: React.CSSProperties = {
        width: 700,
        height: 600,
        marginLeft: 30,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        // borderColor: 'blue'
    };

    const onDateSelect = (date: Dayjs) => {
        console.log(date.format('YYYY-MM-DD'));
        const dateSelect = date.format('YYYY-MM-DD')

        setSelectedDate(dateSelect)
    };

    return (
        <div style={wrCalendarFormerStyle}>
            <Calendar
                fullscreen={false}
                onPanelChange={onPanelChange}
                onSelect={onDateSelect}
            />
        </div>
    );
};

export default CalendarForm;
