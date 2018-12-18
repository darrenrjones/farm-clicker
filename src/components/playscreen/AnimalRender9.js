import React from 'react';
import CardContainer from '../card/CardContainer';


export const AnimalRender9 = props => {
	return (
		<div className={'cards9-container ' + (props.screenDisplay === 'cropsView' ? 'display-invisible' : '')}>
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
				type='pig'
				field='pig3'
				screen='animals'
				feed='wheat corn'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='sheep'
				field='sheep1'
				screen='animals'
				feed='clover'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='sheep'
				field='sheep2'
				screen='animals'
				feed='clover'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='sheep'
				field='sheep3'
				screen='animals'
				feed='clover'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
		</div>

	)
}