import React from "react";

type HeaderProps = {
    text: string;
};
const Header = ({ text }: HeaderProps) => {
    return (
        <header>
            <h2>{text}</h2>
        </header>
    );
};

export default Header;
