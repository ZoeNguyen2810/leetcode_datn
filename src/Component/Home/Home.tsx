import Content from "./Content";
import Card from "./Card/Card";
import { FC } from "react";

const HomePage: FC = () => {
    return (
        <>
            <Content />
            <div className="card" style={{ marginLeft: '100px' }}>
                <Card />

            </div>

        </>
    )
}

export default HomePage