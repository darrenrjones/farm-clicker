import React from 'react';
import { connect } from 'react-redux';

import { buyCrop } from '../../actions/crops';
import { buyAnimal } from '../../actions/animals';
import enoughFeed from './helperFunctions';
import { sellAnimal, incrementCrop, decrementCrop } from '../../actions/user';

import ProgressBar from './ProgressBar';
import CardImg from './CardImg';

import '../../styles/card-container.css';

export class CardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      ticking: false,
    }
  }

  render() {
    let intCall;
    const type = this.props.type;
    const field = this.props.field;
    const screen = this.props.screen;
    const feed1 = this.props.feed.split(' ')[0];
    const feed2 = this.props.feed.split(' ')[1];

    // const currentCrop = this.props.crops.find(crop => crop.type === field);
    // const currentAnimal = this.props.animals.find(animal => animal.type === field);

    //return currentCard based on whether its animal or crop card
    const currentCard = screen === 'crops' ?
      this.props.crops.find(crop => crop.type === field) : screen === 'animals' ?
        this.props.animals.find(animal => animal.type === field) : null

    const progressTickIntervalSet = () => {
      this.setState({ ticking: true }) // disabled button while progress bar filling     
      intCall = setInterval(progressTick, (currentCard.count + 7 + currentCard.count * 4));
    }

    //progressTick increments percentage of progress bar to fill
    //when it fills then incrementCrop/sellAnimal is called
    const progressTick = () => {
      if (this.state.percentage >= 100) {
        clearInterval(intCall);
        this.setState({ percentage: 0, ticking: false });

        if (screen === 'crops') {
          this.props.dispatch(incrementCrop(type, currentCard.count));
        } else if (screen === 'animals') {
          //use feed names passed from props
          // const feed1 = this.props.feed.split(' ')[0];
          // const feed2 = this.props.feed.split(' ')[1];
          console.log(feed1,feed2);
          //make sure there are enough crops to feed animal before dispatching actions
          if(enoughFeed(this.props.cropTotals[feed1], this.props.cropTotals[feed2], currentCard.count)){
          this.props.dispatch(sellAnimal(currentCard.count));
          this.props.dispatch(decrementCrop(currentCard.count, feed1, feed2 ));
          console.log('feed1:',this.props.cropTotals[feed1]);
          console.log('feed2:',this.props.cropTotals[feed2]);
          console.log(currentCard.count);
            
        } else {
          console.log('not enough crops');            
        }



        }
      }
      this.setState({ percentage: this.state.percentage + 1 });
    }


    //increment count by 1 and increase tickInterval by 8 ms
    const incrementFieldCount = (field) => {
      if (currentCard.count < 9) {
        if (screen === 'crops') {
          this.props.dispatch(buyCrop(field));
        } else if (screen === 'animals') {
          this.props.dispatch(buyAnimal(field));
        }
      }
    }

    // const count = this.props.crops[field].count;
    let cardImages = [];
    for (let i = 1; i <= currentCard.count; i++) {
      cardImages.push(
        <CardImg
          source={`${this.props.type}`}
          screen={`${this.props.screen}`}
          key={`crop-index-${i}`}
        />
      );
    }

    return (

      <div className='card-container'>

        <div className='image-box'>
          {cardImages}
        </div>

        <div className='progress-bar-container'>
          <ProgressBar
            percentage={this.state.percentage}
            screen={screen}
            type={this.props.type}
            action={progressTickIntervalSet}
            count={currentCard.count}
            ticking={this.state.ticking}
            enoughFeed={
              // if current card is an animals card call enoughFeed helperFunction,
              // else calling enoughFeed on crops is null so return true to pass into 
              // ProgressBar component to set className ternary properly
              screen === 'animals' ? enoughFeed(this.props.cropTotals[feed1], this.props.cropTotals[feed2], currentCard.count) : 
              screen === 'crops' ? true : false
            }
          />

          {/* nested ternary to check card's 'screen' prop to render proper button text */}
          <button onClick={() => incrementFieldCount(this.props.field)}>
            {screen === 'crops' ?
              'PLANT ' : screen === 'animals' ?
                'BUY ' : screen === 'menu' ?
                  'menu ' : null}
            {this.props.type.toUpperCase()}
          </button>

        </div>

      </div>
    )
  }

}

const mapStateToProps = state => ({
  crops: state.crops.crops,
  animals: state.animals.animals,
  cropTotals: state.user.currentUser.cropTotals
});

export default connect(mapStateToProps)(CardContainer);