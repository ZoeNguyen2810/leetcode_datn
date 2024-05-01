import "./Content.scss";
import { Link } from "react-router-dom";

// import { FaGavel } from "react-icons/fa6";
const Content = () => {
    return (
        <div className="content1">

            {/* <FaGavel /> */}

            <ul> <i className="fa-solid fa-screwdriver-wrench" /> Car Repair</ul>
            <div className="content2">
                <h3>AUTO MAINTENANCE, SERVICE & REPAIR</h3>
                <span className="text" dir="ltr" >
                    At vitae commodo amet libero tortor blandit risus condimentum mauris.
                    Cras arcu tortor aenean turpis massa mauris ac mi facilisi cursus
                    aliquam a ac maecenas purus amet sapien id suspendisse porttitor
                    tempor at donec massa nibh massa urna et.
                </span>
            </div>
            <div className="button-content">
                <button className="button-left" >
                    Schedule an appointment</button>
                <button className="button-right">
                    Browse services
                </button>
            </div>
        </div>
    );
};

export default Content;
