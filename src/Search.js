import {useRef} from 'react';
import "./search.css"

function Search({doSearch}) {

    const searchBox = useRef(null);

    const search = function (event) {
        doSearch(searchBox.current.value);
    }

    return (
        <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
            </span>
            <input type="text" className="form-control" placeholder="Search for contact" aria-label="Search for contact" aria-describedby="basic-addon1" onKeyUp={search} ref={searchBox}></input>
        </div>
        );
}

export default Search;