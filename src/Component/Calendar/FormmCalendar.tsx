import './FormCalendar.scss'

import { ShowFrameTime } from './barSowInfo/ShowFrameTime';
import React from 'react';
import CalendarForm from './Calendar';
const FormCalendar = () => {
    return (
        <div className="two-elements-container">
            <div className="element1">
                <CalendarForm />
            </div>
            <div className="element2">
                <ShowFrameTime />
            </div>
        </div>
    );
};

export default FormCalendar;
