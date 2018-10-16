import React from 'react';
import CardContainer from '../card/CardContainer';


export const CropRender = props => {
	return (

		// <div className={props.screenDisplay === 'animalsView' ? 'cards9-container display-none' : 'cards9-container'}>
		<div className={'cards9-container ' + (props.screenDisplay === 'animalsView' || props.screenDisplay === 'managerView' ? 'display-none' : '')}>

			<CardContainer
				type='wheat'
				field='wheat1'
				screen='crops'
				feed='null'
			/>
			<CardContainer
				type='wheat'
				field='wheat2'
				screen='crops'
				feed='null'
			/>
			<CardContainer
				type='wheat'
				field='wheat3'
				screen='crops'
				feed='null'
			/>
			<CardContainer
				type='corn'
				field='corn1'
				screen='crops'
				feed='null'
			/>
			<CardContainer
				type='corn'
				field='corn2'
				screen='crops'
				feed='null'
			/>
			<CardContainer
				type='corn'
				field='corn3'
				screen='crops'
				feed='null'
			/>
			<CardContainer
				type='soy'
				field='soy1'
				screen='crops'
				feed='null'
			/>
			<CardContainer
				type='soy'
				field='soy2'
				screen='crops'
				feed='null'
			/>
			<CardContainer
				type='soy'
				field='soy3'
				screen='crops'
				feed='null'
			/>
		</div>
	)
}