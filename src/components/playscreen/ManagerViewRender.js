import React from 'react';
import CardContainer from '../card/CardContainer';


export const ManagerViewRender = props => {
	return (

		<div className={'cards9-container gray-scale ' + (props.screenDisplay === 'cropsView' || props.screenDisplay === 'animalsView' ? 'display-none' : '')}>
			<CardContainer
				type='wheat'
				field='wheat1'
				screen='crops'
        feed='null'
			/>
			{/* <CardContainer
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
			/> */}
		</div>
	)
}