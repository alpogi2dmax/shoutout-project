import ExplorePeopleCard from "./ExplorePeopleCard"

function ExplorePeopleList({people}) {

    return (
        <div>
            {people.map(person => (
                <ExplorePeopleCard key={person.id} person={person}/>
            ))}
        </div>
    )
}

export default ExplorePeopleList