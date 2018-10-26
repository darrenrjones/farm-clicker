import React from 'react';
import CardContainer from '../card/CardContainer';


export const AnimalRender = props => {
	return (
		<div className={
			'cards9-container ' + (props.screenDisplay === 'cropsView' ? 'display-none' : '')
		}>
			<CardContainer
				type='chicken'
				field='chicken1'
				screen='animals'
				feed='wheat'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='chicken'
				field='chicken2'
				screen='animals'
				feed='wheat'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='chicken'
				field='chicken3'
				screen='animals'
				feed='wheat'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='pig'
				field='pig1'
				screen='animals'
				feed='wheat corn'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='pig'
				field='pig2'
				screen='animals'
				feed='wheat corn'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='cow'
				field='cow1'
				screen='animals'
				feed='corn soy'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='cow'
				field='cow2'
				screen='animals'
				feed='corn soy'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>



		</div>
	)
}