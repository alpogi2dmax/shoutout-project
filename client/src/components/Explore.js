import { useState } from "react"

function Explore() {

    const [search, setSearch] = useState('')
    const [people, setPeople] = useState([])

    const handleChange = (e) => {
        setSearch(e.target.value)
        
    }

    const handleClick = () => {
        if (search.trim() !== '') {  // Check if search is not empty
            fetch(`/users/${search}`)
                .then((r) => {
                    if (!r.ok) throw new Error('Network response was not ok');
                    return r.json();
                })
                .then((data) => {
                    console.log(data);
                    setPeople(data);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        } else {
            console.log('Search term is empty');
        }
    };

    console.log(search)
    console.log(people)


    return (
        <div>
            <input placeholder="Search..." value={search} onChange={handleChange}/>
            <button onClick={handleClick}>Search</button>
            <h2>People</h2>

        </div>
    )
}

export default Explore