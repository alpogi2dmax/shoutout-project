import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../context/user"
import ExplorePeopleList from "./ExplorePeopleList"
import ExploreCommentsList from "./ExploreCommentsList"
import Login from "./Login"

function Explore() {

    const { user } = useContext(UserContext)

    const [search, setSearch] = useState('')
    const [people, setPeople] = useState([])
    const [comments, setComments] = useState([])

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
            fetch(`/comments/${search}`)
                .then((r) => {
                    if (!r.ok) throw new Error('Network response was not ok');
                    return r.json();
                })
                .then((data) => {
                    console.log(data);
                    setComments(data)
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        } else {
            console.log('Search term is empty');
        }
    };

    const deleteComment = (deletedComment) => {
        let updatedComments = comments.filter(comment => comment.id !== deletedComment.id)
        setComments(updatedComments)
    }

    if (user) {
        return (
            <div>
                <input className='search-bar' size='58' placeholder="Search..." value={search} onChange={handleChange}/>
                <button className='button' onClick={handleClick}>Search</button>
                <h2>People</h2>
                <ExplorePeopleList people={people}/>
                <h2>Comments</h2>
                <ExploreCommentsList comments={comments} deleteComment={deleteComment}/>
    
            </div>
        )
    } else {
        return (
            <div>
                <Login />
            </div>
        )
    }
}

export default Explore