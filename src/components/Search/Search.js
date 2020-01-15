import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.css';
import Section from '../UI/Section';

const Search = props => {
    const { onLoadElements } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
            fetch('https://react-udemy-hooks.firebaseio.com/ingredients.json' + query)
                .then(response => response.json())
                .then(responseData => {
                    const loadedIngredients = [];
                    for (const key in responseData) {
                        loadedIngredients.push({
                            id: key,
                            title: responseData[key].title,
                            amount: responseData[key].amount
                        });
                    }
                    onLoadElements(loadedIngredients)
                })

        }, 500)
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter])

    return (
        <div className={styles.Search}>
            <Section>
                <label className={styles.SearchLabel}>Filter by Title</label>
                <input
                    className={styles.SearchInput}
                    ref={inputRef}
                    type="text"
                    value={enteredFilter}
                    onChange={event => setEnteredFilter(event.target.value)} />
            </Section>
        </div>
    );
}

export default Search;