import React from 'react';
import CardContainer from '../card/CardContainer';


export const CropRender = props => {
	return (
		<div className={
			'cards9-container ' + (props.screenDisplay === 'animalsView' ? 'display-none' : '')
		}>

			<CardContainer
				type='wheat'
				field='wheat1'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='wheat'
				field='wheat2'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='wheat'
				field='wheat3'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='corn'
				field='corn1'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='corn'
				field='corn2'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='corn'
				field='corn3'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
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
				type='clover'
				field='clover1'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='clover'
				field='clover2'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			<CardContainer
				type='clover'
				field='clover3'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/>
			{/* <CardContainer
				type='fishfood'
				field='fishfood1'
				screen='crops'
				feed='null'
				screenDisplay={props.screenDisplay}
				managerDisplay={props.managerDisplay}
			/> */}
		</div>
	)
}