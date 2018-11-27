import React from 'react';
import CardContainer from '../card/CardContainer';


export const CropRender4 = props => {
	return (
		// <div className={'cards-container-main ' + (props.screenDisplay === 'animalsView' ? 'display-none' : '')}>
		<div className={
			'cards4-container ' + (props.screenDisplay === 'animalsView' ? 'display-none' : '')
		}>
			<CardContainer
				type='soy'
				field='soy1'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='soy'
				field='soy2'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='soy'
				field='soy3'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='fishfood'
				field='fishfood1'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
		</div>
		// </div>
	)
}