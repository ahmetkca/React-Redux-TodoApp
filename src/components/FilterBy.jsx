import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilterBy } from '../features/selectors';
import { showAll, showCompleted, showUncompleted } from '../features/filterBy/filterBySlice';
import '../styles/FilterBy.css'

export const FilterBy = () => {
    const dispatch = useDispatch();
    const filterBy = useSelector(selectFilterBy);

    return (
        <div className='filterby-container'>
            <button 
                className={filterBy === 'all' ? 'selected' : ''} 
                onClick={() => dispatch(showAll())}>All</button>
            <button 
                className={filterBy === 'completed' ? 'selected' : ''} 
                onClick={() => dispatch(showCompleted())}>Completed</button>
            <button
                className={filterBy === 'uncompleted' ? 'selected' : ''} 
                onClick={() => dispatch(showUncompleted())}>Uncompleted</button>
        </div>
    )

}