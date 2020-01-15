import React, { useState, useEffect } from 'react';
import ElementList from '../ElementsList/ElementsList';
import ElementsForm from '../ElementsForm/ElementsForm';
import Search from '../Search/Search';

const ControlPanel = props => {
    const [userElements, setUserElements] = useState([]);

    const loadIngredientsFromDatabase = () => {
        fetch('https://react-udemy-hooks.firebaseio.com/ingredients.json', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            for (const key in responseData) {
                setUserElements(prevElements => [
                    ...prevElements, { id: key, title: responseData[key].title, amount: responseData[key].amount }
                ])
            }
        })
    }

    const addElementHandler = (newElement) => {
        fetch('https://react-udemy-hooks.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(newElement),
            headers: { 'Content-type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setUserElements(prevElements => [
                ...prevElements,
                { id: responseData.name, ...newElement }
            ])
        })
    }

    const removeElementHandler = (id) => {
        fetch(`https://react-udemy-hooks.firebaseio.com/ingredients/${id}.json`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setUserElements(prevElements =>
                prevElements.filter(prevEl => prevEl.id !== id))
        })
    }

    useEffect(() => {
        loadIngredientsFromDatabase()
    }, []);

    const textFilterElements = (filteredElements) => {
        setUserElements(filteredElements);
    }

    return (
        <div>
            <ElementsForm addElement={addElementHandler} />
            <Search onLoadElements={textFilterElements} />
            <ElementList elements={userElements} deleted={removeElementHandler} />
        </div>
    )
}

export default ControlPanel;