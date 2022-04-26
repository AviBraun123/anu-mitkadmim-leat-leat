import {useRef} from 'react';

function Addcontact({doSearch}) {

    const searchBox = useRef(null);

    const search = function (event) {
        doSearch(searchBox.current.value);
    }

    return (
        <div className="input-group">
            
            <input type="text" className="form-control" placeholder="Search contact by username (case sensitive)" aria-label="Search contact by username (case sensitive)" aria-describedby="basic-addon1" onKeyUp={search} ref={searchBox} id="inputForContacts"></input>
        </div>
        );
}

export default Addcontact;