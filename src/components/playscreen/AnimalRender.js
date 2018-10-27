import React from 'react';
import CardContainer from '../card/CardContainer';


export const AnimalRender = props => {
	return (
		<div>
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
			<div className={
				'cards4-container ' + (props.screenDisplay === 'cropsView' ? 'display-none' : '')
			}>

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

				<CardContainer
					type='goat'
					field='goat1'
					screen='animals'
					feed='wheat corn soy clover'
					screenDisplay={props.screenDisplay}
					managerDisplay={props.managerDisplay}
				/>
				<CardContainer
					type='fish'
					field='fish1'
					screen='animals'
					feed='fishfood'
					screenDisplay={props.screenDisplay}
					managerDisplay={props.managerDisplay}
				/>



			</div>
		</div>
	)
}