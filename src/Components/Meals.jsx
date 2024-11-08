import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./UI/Error.jsx";

const requestConfig = {};
const url = 'http://localhost:3000/meals';

function loadedMeals() {
    const {
        data: loadedMeals,
        isLoading,
        error
    } = useHttp(url, requestConfig, [])

    if(isLoading){
        return <p className='center'>Fetching meals...</p>
    }

    if(error){
        return <Error title='Failed to fetch meals' message={error}/>
    }

    return (
        <>
            <ul id='meals'>
                {loadedMeals.map((meal) => (
                    <MealItem meal={meal} key={meal.id}/>
                ))}
            </ul>
        </>
    );
}

export default loadedMeals;