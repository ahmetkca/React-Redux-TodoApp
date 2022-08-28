import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilterBy } from '../features/selectors';
import { showAll, showCompleted, showUncompleted } from '../features/filterBy/filterBySlice';
import styled from 'styled-components';

const FilterByContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 8px;
`;

const FilterByButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 4px;
    margin-right: 4px;
    background-color: ${props => props.selected ? '#22ee22' : 'lightgray'};
    color: ${props => props.selected ? 'white' : 'black'};
    &:hover {
        background-color: gray;
        color: white
    }
`;



export const FilterBy = () => {
    const dispatch = useDispatch();
    const filterBy = useSelector(selectFilterBy);

    return (
        <FilterByContainer>
            <FilterByButton 
                selected={filterBy === 'all'}
                onClick={() => dispatch(showAll())}>
                All
            </FilterByButton>
            <FilterByButton 
                selected={filterBy === 'completed'}
                onClick={() => dispatch(showCompleted())}>
                Completed
            </FilterByButton>
            <FilterByButton
                selected={filterBy === 'uncompleted'}
                onClick={() => dispatch(showUncompleted())}>
                Uncompleted
            </FilterByButton>
        </FilterByContainer>
    )

}