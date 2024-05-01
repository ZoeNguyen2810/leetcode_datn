import "./Card1.scss";
const Card = () => {
    return (
        <div className="Card-par">
            <div className="text">
                <div className="container1">
                    <div className="number">10+</div>
                    <div className="text1">YEARS OF SERVICE</div>
                </div>

                <div className="container1">
                    <div className="number">50K+ </div>
                    <div className="text1">HAPPY CLIENTS</div>
                </div>

                <div className="container1">
                    <div className="number">99%</div>
                    <div className="text1">CUSTOMER SATISFACTION</div>
                </div>
            </div>
            <div className="button-ani">
                <div className="about">
                    <a
                        className="bg_links social portfolio"
                        href="https://www.rafaelalucas.com"
                        target="_blank"
                    >
                        <span className="icon"></span>
                    </a>
                    <a
                        className="bg_links social dribbble"
                        href="https://dribbble.com/rafaelalucas"
                        target="_blank"
                    >
                        <span className="icon"></span>
                    </a>
                    <a
                        className="bg_links social linkedin"
                        href="https://www.linkedin.com/in/rafaelalucas/"
                        target="_blank"
                    >
                        <span className="icon"></span>
                    </a>
                    <a className="bg_links logo"></a>
                </div>
                {/* <!-- end about --> */}
                <div className="button">
                    <a className="link">Read more</a>
                </div>
            </div>
            <div className="card-content"></div>
            <div className="text2">
                <div className="content-2">
                    <div className="big-text" >PROFESSIONAL TEAM</div>
                    <div className="sm-text">
                        At vitae commodo amet libero tortor blandit risus condimentum
                        mauris.
                    </div>
                </div>
                <div className="content-2" >
                    <div className="big-text" dir="rtl" >ADVANCED TECHNOLOGY</div>
                    <div className="sm-text" dir="rtl">
                        At vitae commodo amet libero tortor blandit risus condimentum
                        mauris.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
