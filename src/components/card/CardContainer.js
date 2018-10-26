import React from 'react';
import { connect } from 'react-redux';

import { buyCrop, buyAnimal, hireManager, sellAnimalProduct, incrementCrop } from '../../actions/user';
import enoughFeed from '../../actions/helpers/enoughFeed';
import cardIntMap from '../../actions/helpers/cardIntMap';
import rateMap from '../../actions/helpers/rateMap';

import ProgressBar from './ProgressBar';
import CardImg from './CardImg';

import '../../styles/card-container.css';

export class CardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      ticking: false,
      feedChainBroken: false,
    }
  }
  setManagerInterval = () => {
    this.managerInterval = setInterval(this.callDispatchesCheck, cardIntMap[this.currentCard.count]);
  }
  componentDidMount() { // upon page load if card has manager initiate managerInterval
    if (this.currentCard.manager) {
      this.setManagerInterval();
    }
  }
  componentWillUnmount() {
    clearInterval(this.intCall);
    clearInterval(this.managerInterval);
  }
  intCall;

  //return currentCard based on whether its animal or crop card
  currentCard = this.props.screen === 'crops' ?
    this.props.crops.find(crop => crop.type === this.props.field) : this.props.screen === 'animals' ?
      this.props.animals.find(animal => animal.type === this.props.field) : null

  feed1 = this.props.screen === 'animals' ? this.currentCard.feed.split(' ')[0].replace(/,/g, '') : 'crop';
  feed2 = this.props.screen === 'animals' ? this.currentCard.feed.split(' ')[1] : 'crop';

  callDispatches = () => {
    this.props.screen === 'crops' ? this.props.dispatch(incrementCrop(this.currentCard))
      : this.props.dispatch(sellAnimalProduct(this.currentCard));
  }



  callDispatchesCheck = () => {
    // console.log(`call dispatch check : ${this.props.field}`);
    console.log('cCard: ', this.currentCard);
    console.log('feed1: ', this.feed1);

    console.log('feed2: ', this.feed2);

    //if !enoughFeed clearInterval and set feedChainBroke Display and exit before callDispatches
    if (this.props.screen === 'animals') {
      if (this.currentCard.manager) {
        if (!enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count)) {
          console.log('managerInterval check stopped interval');

          this.setState({ feedChainBroken: true });
          clearInterval(this.managerInterval);
          return;
        }
      }
    }
    this.callDispatches();
  }

  //create 'feedChainCheck' function to be called somewhere GOOD, 
  // it will check enoughFeed and then set feedChain = button => reset managerIntervaland 

  progressTickIntervalSet = () => {
    if (!this.currentCard.manager) {
      this.setState({ ticking: true }) // disabled button while progress bar filling    
      this.intCall = setInterval(this.progressTick, (20 + ((this.currentCard.count - 1) * 10)));//1 count -> 1 second --- 9 count -> 5 seconds
    }
    if (this.props.screen === 'animals') {
      if (!enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count)) {
        console.log('not enough foooood');

      }
    }
  }

  dontSetIntervalLog = () => {
    console.log(`dont set tick due to manager or count < 1: ${this.props.field}`)
  }

  //progressTick increments percentage of progress bar to fill
  //when it fills to 99 then increment Crop/sell Animal Product is called
  progressTick = () => {
    if (this.state.percentage >= 99) {
      clearInterval(this.intCall);
      this.setState({ percentage: -3, ticking: false });
      this.callDispatchesCheck();
    }
    // while bar is not full check for enoughFeed to reset progress bar if food runs out mid progress
    else if (this.props.screen === 'animals') {
      if (!enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count)) {
        clearInterval(this.intCall);
        this.setState({ percentage: -3, ticking: false });
      }
    }
    this.setState({ percentage: this.state.percentage + 3 });
  }

  //increment count by 1
  incrementFieldCount = (field) => {
    if (this.currentCard.count < 9 && this.props.userCash >= this.currentCard.price) {
      let currentIntervalName = `${this.props.type}Interval`;
      console.log('currentIntervalName: ', currentIntervalName);

      if (this.props.screen === 'crops') {
        this.props.dispatch(buyCrop(field));
      } else if (this.props.screen === 'animals') {
        this.props.dispatch(buyAnimal(field));
      }
    }
  }


  hireManager = (field, screen) => {
    if (!this.currentCard.manager && this.props.userCash >= this.currentCard.price && this.currentCard.count > 0) {
      this.props.dispatch(hireManager(field, screen));
      // this.setState({ ticking: true });
      //auto incrementation due to manager 
      this.setManagerInterval();
    }
  }

  //if managerDisplay, make buttons show up, else they are display-none
  displayManagerButtons = () => {
    return this.props.managerDisplay ? '' : ' display-none';
  }

  feedBrokenButtonDisplay = () => {
    //display fix feed button if feedChainBroken and enough Feed
    return (!this.state.feedChainBroken || this.props.screen === 'crops') ? 'display-none' : '';
  }

  generateIncrementButtonText = () => {
    // nested ternary to check card's 'this.props.screen' prop to render proper button text 
    return this.props.screen === 'crops' && this.props.userCash >= this.currentCard.price ?
      `PLANT ${this.props.type.toUpperCase()}` : this.props.screen === 'animals' && this.props.userCash >= this.currentCard.price ?
        `BUY ${this.props.type.toUpperCase()}` : 'insufficient funds'
  }

  fixFeedBroken = () => {
    this.setState({ feedChainBroken: false })
    this.setManagerInterval();
  }

  feedImages = () => {

  }

  feedTypesManagerDisplay = () => {
    if (this.props.screen === 'animals') {
      if (!this.feed2) {
        return (
          <div>
            <p>Feed:</p>
            <CardImg
              screen={'crops'}
              source={`${this.feed1}`}
            />

          </div>
        )
      } else {
        return (
          <div>
            <p>Feed:</p>
            <CardImg
              screen={'crops'}
              source={`${this.feed1}`}
            />
            <CardImg
              screen={'crops'}
              source={`${this.feed2}`}
            />
          </div>
        )
      }



    } else {
      return <p>crops here</p>
    }
  };




  render() {

    // const count = this.props.crops[field].count;
    let cardImages = [];
    for (let i = 1; i <= this.currentCard.count; i++) {
      cardImages.push(
        <CardImg
          screen={`${this.props.screen}`}
          source={`${this.props.type}`}
          key={`crop-index-${i}`}
        />
      );
    }

    return (

      <div
        onClick={this.props.managerDisplay || this.currentCard.count < 1 || this.currentCard.manager ? this.dontSetIntervalLog : this.progressTickIntervalSet}
        className={'card-container' + (this.state.ticking ? ' disabled-pointer-events' : '') + (this.currentCard.count < 1 || this.props.managerDisplay || this.currentCard.manager ? ' no-cursor' : '')}
      >

        <div className={'image-box ' + (this.props.managerDisplay ? 'gray-scale reduce-opacity' : '') + (this.state.feedChainBroken ? ' reduce-opacity' : '')}>
          {cardImages}
        </div>

        <div className={'card-buttons-container' + (this.displayManagerButtons())}>
          <p>{this.currentCard.count < 9 ? `Next ${this.props.type}: $${this.currentCard.price}` : `Max Capacity`}</p>
          <button
            onClick={() => this.incrementFieldCount(this.props.field)}
            disabled={this.props.userCash < this.currentCard.price}
            className={this.currentCard.count > 8 ? 'gray-scale disabled-pointer-events' : ''}
          >
            {this.generateIncrementButtonText()}
          </button>

          <button
            onClick={() => { this.hireManager(this.props.field, this.props.screen) }}
            className={(this.currentCard.manager || this.currentCard.count < 1 || this.props.userCash < this.currentCard.price * 5 ? 'gray-scale disabled-pointer-events' : '')}
            disabled={this.currentCard.manager || this.currentCard.count < 1}
          >
            {!this.currentCard.manager ? `hire manager(${this.currentCard.price * 5})` : `Producing ${rateMap[this.currentCard.count]} /sec`}
          </button>

          <button
            className={this.feedBrokenButtonDisplay()}
            onClick={() => { this.fixFeedBroken() }}
            disabled={this.state.feedChainBroken === false}
          >
            Fix Feed
          </button>
          {this.feedTypesManagerDisplay()}
        </div>

        <div className={this.props.managerDisplay ? 'display-none' : ''}>

          <ProgressBar
            percentage={this.state.percentage}
            screen={this.props.screen}
            type={this.props.type}
            count={this.currentCard.count}
            enoughFeed={
              // if current card is an animals card call enoughFeed helperFunction,
              // else calling enoughFeed on crops is null so return true to pass into 
              // ProgressBar component to set className ternary properly
              this.props.screen === 'animals' ? enoughFeed(this.props.inventory[this.feed1], this.props.inventory[this.feed2], this.currentCard.count) :
                this.props.screen === 'crops' ? true : false
            }
            manager={this.currentCard.manager}
            feedChainBroken={this.state.feedChainBroken}
          />
        </div>

      </div>
    )
  }

}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  crops: state.user.currentUser.crops,
  animals: state.user.currentUser.animals,
  inventory: state.user.currentUser.inventory,
  userCash: state.user.currentUser.cash
});

export default connect(mapStateToProps)(CardContainer);