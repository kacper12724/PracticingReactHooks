import React from 'react';
import styles from './ElementsList.module.css';

const ElementsList = props => {
    return (
        <section>
            <h2>Loaded elements!</h2>
            <ul className={styles.ElementsListUl}>
                {props.elements.map(el => (
                    <li
                        className={styles.ElementsListLi}
                        key={el.id} onClick={() => props.deleted(el.id)}>
                        <span>{el.title}</span>
                        <br />
                        <span>{el.amount}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ElementsList;