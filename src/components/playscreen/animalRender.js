import React from 'react';
import CardContainer from '../card/CardContainer';


export const AnimalRender = () => {
	return (

		<div className='crops9-container'>
			<CardContainer
				type='chicken'
				field='chicken1'
				screen='animals'
				feed='wheat'
			/>
			<CardContainer
				type='chicken'
				field='chicken2'
				screen='animals'
				feed='wheat'
			/>
			<CardContainer
				type='chicken'
				field='chicken3'
				screen='animals'
				feed='wheat'
			/>
			<CardContainer
				type='pig'
				field='pig1'
				screen='animals'
				feed='wheat soy'
			/>
			<CardContainer
				type='pig'
				field='pig2'
				screen='animals'
				feed='wheat soy'
			/>
			<CardContainer
				type='cow'
				field='cow1'
				screen='animals'
				feed='wheat corn'
			/>
			<CardContainer
				type='cow'
				field='cow2'
				screen='animals'
				feed='wheat corn'
			/>

		</div>
	)
}