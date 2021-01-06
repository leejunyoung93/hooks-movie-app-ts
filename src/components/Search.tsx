import React, { useState, ChangeEvent, FormEvent } from "react";

interface Props {
    search: (searchValue: string) => void;
}

const Search = ({ search }: Props) => {
    const [searchValue, setSearchValue] = useState("");

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const onClickSearch = (e: FormEvent) => {
        e.preventDefault();
        search(searchValue);
        setSearchValue("");
    };

    return (
        <form className="search">
            <input type="text" onChange={onChangeSearch} value={searchValue} />
            <input
                onClick={onClickSearch}
                type="submit"
                value="SEARCH"
                disabled={!searchValue}
            />
        </form>
    );
};

export default Search;
