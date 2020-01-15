import React, { useState } from 'react';
import styles from './ElementsForm.module.css';
import Section from '../UI/Section';

const ElementsForm = props => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');

    const submitHandler = event => {
        event.preventDefault();
        props.addElement({ title: enteredTitle, amount: enteredAmount })
    }

    return (
        <div className={styles.ElementsForm}>
            <Section>
                <form onSubmit={submitHandler}>
                    <div>
                        <label className={styles.ElementsFormLabel}>Title</label>
                        <input
                            className={styles.ElementsFormInput}
                            type="text"
                            id="title"
                            onChange={event => {
                                setEnteredTitle(event.target.value);
                            }}></input>
                    </div>
                    <div>
                        <label className={styles.ElementsFormLabel}>Amount</label>
                        <input
                            className={styles.ElementsFormInput}
                            type="number"
                            id="amount"
                            onChange={event => {
                                setEnteredAmount(event.target.value);
                            }}></input>
                    </div>
                    <button
                        className={styles.ElementsFormButton}
                        type="submit">Add element</button>
                </form>
            </Section>
        </div>
    )
}

export default ElementsForm;