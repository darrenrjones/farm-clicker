import React from 'react';
import { connect } from 'react-redux';

import { buyCrop, buyAnimal, hireManager, sellAnimalProduct, incrementCrop } from '../../actions/user';

import enoughFeed from '../../actions/helpers/enoughFeed.js';


import cardIntMap from '../../actions/helpers/cardIntMap';
import rateMap from '../../actions/helpers/rateMap';

import ProgressBar from './ProgressBar';
import CardImg from './CardImg';
import FeedTypeDisplay from './FeedTypeDisplay';

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
  currentCard = this.props.screen === 'crops'
    ? this.props.crops.find(crop => crop.type === this.props.field)
    : this.props.screen === 'animals'
      ? this.props.animals.find(animal => animal.type === this.props.field)
      : null


  ccFeed = this.props.screen === 'animals' ? this.currentCard.feed.split(' ').map(feed => feed.replace(/,/g, '')) : [];

  callDispatches = () => {
    if (this.props.screen === 'crops') {
      this.props.dispatch(incrementCrop(this.currentCard))
    } else if (this.props.screen === 'animals') {
      if (!enoughFeed(this.ccFeed, this.currentCard, this.props.inventory)) {
        clearInterval(this.intCall);
        this.setState({ percentage: -3, ticking: false });
      }
      this.props.dispatch(sellAnimalProduct(this.currentCard));
    }
  }

  callDispatchesCheck = () => {
    if (this.props.screen === 'animals') {
      if (this.currentCard.manager) {
        //if being called from managerInterval check enoughFeed to clear managerInterval and set feedChainBroken Display and exit before callDispatches
        if (!enoughFeed(this.ccFeed, this.currentCard, this.props.inventory)) {
          this.setState({ feedChainBroken: true });
          clearInterval(this.managerInterval);
          return;
        }
      }
    }
    this.callDispatches();
  }

  progressTickIntervalSet = () => {
    if (enoughFeed(this.ccFeed, this.currentCard, this.props.inventory)) {
      this.setState({ ticking: true }) // disabled button while progress bar filling    
      this.intCall = setInterval(this.progressTick, cardIntMap[this.currentCard.count] / 48);
      //1 count -> 1000ms --- 9 count -> ~5000 ms --- so /33 for 33 ticks to 99% in progressTick
    }
  }


  //progressTick increments percentage of progress bar to fill
  //when it fills to 99 then callDispatchesCheck is called
  // else if for animals checks if enoughFeed to stop progress if food ran out
  progressTick = () => {
    if (this.state.percentage >= 99) {
      clearInterval(this.intCall);
      this.setState({ percentage: -3, ticking: false });
      this.callDispatchesCheck();
    } else if (this.props.screen === 'animals') {
      if (!enoughFeed(this.ccFeed, this.currentCard, this.props.inventory)) {
        clearInterval(this.intCall);
        this.setState({ percentage: -3, ticking: false });
      }
    }
    this.setState({ percentage: this.state.percentage + 3 });
  }

  //increment count by 1
  incrementFieldCount = (field) => {

    if (this.currentCard.count < 9 && this.props.userCash >= this.currentCard.price) {
      // let currentIntervalName = `${this.props.type}Interval`;

      if (this.props.screen === 'crops') {
        this.props.dispatch(buyCrop(field));
      } else if (this.props.screen === 'animals') {
        this.props.dispatch(buyAnimal(field));
      }

      if (this.currentCard.manager) {
        clearInterval(this.managerInterval);
        this.setManagerInterval();
      }
    }
  }


  hireManager = (field, screen) => {
    if (!this.currentCard.manager && this.props.userCash >= this.currentCard.price * 3 && this.currentCard.count > 0) {
      this.props.dispatch(hireManager(field, screen));
      // this.setState({ ticking: true });
      //auto incrementation due to manager 
      this.setManagerInterval();
    }
  }

  //if managerDisplay, make buttons show up, else they are display-invisible
  displayManagerItems = () => {
    return this.props.managerDisplay ? '' : ' display-invisible';
  }

  feedBrokenButtonDisplay = () => {
    //display fix feed button if feedChainBroken and enough Feed
    return (!this.state.feedChainBroken || this.props.screen === 'crops') ? 'display-invisible display-none' : 'fix-feed-button';
  }

  generateIncrementButtonText = () => {
    // nested ternary to check card's 'this.props.screen' prop to render proper button text 
    if (this.currentCard.count >= 9) {
      return 'Field Full'
    }
    return this.props.screen === 'crops' && this.props.userCash >= this.currentCard.price ?
      `PLANT ${this.props.type.toUpperCase()}` : this.props.screen === 'animals' && this.props.userCash >= this.currentCard.price ?
        `BUY ${this.props.type.toUpperCase()}` : 'insufficient funds'
  }

  generateHireManagerButtonText = () => {
    if (this.currentCard.count === 0) {
      return `no ${this.props.type} found`
    }
    return `hire manager($${this.currentCard.price * 3}`
  }


  fixFeedBroken = () => {
    this.setState({ feedChainBroken: false })
    this.setManagerInterval();
  }

  render() {
    let cardImages = [];
    for (let i = 1; i <= this.currentCard.count; i++) {
      cardImages.push(
        <CardImg
          screen={`${this.props.screen}`}
          source={`${this.props.type}`}
          imgClass={'small-crop-icon'}
          key={`crop-index-${i}`}
        />
      );
    }

    let feedDisplay;
    if (this.currentCard.feed) {
      feedDisplay = (
        <FeedTypeDisplay
          feed={this.props.screen === 'animals' ? this.currentCard.feed : 'crops'}
          screen={this.props.screen}
          type={this.props.type}
        />
      )
    } else {
      feedDisplay = (<p></p>)
    }

    return (

      <div
        onClick={this.props.managerDisplay || this.currentCard.count < 1 || this.currentCard.manager ? null : this.progressTickIntervalSet}
        className={
          'card-container ' + this.props.field +
          (this.state.ticking ? ' disabled-pointer-events' : '') +
          (this.currentCard.count < 1 || this.props.managerDisplay || this.currentCard.manager ? ' no-cursor' : '')
        }
      >

        <div className={'card-icons-box ' + (this.props.managerDisplay ? 'gray-scale reduce-opacity' : '')}>
          {cardImages}
        </div>

        <div className={'card-buttons-container' + (this.displayManagerItems())}>
          <p className='next-cost'>{this.currentCard.count < 9 ? `Next ${this.props.type}: $${this.currentCard.price}` : `Max Capacity`}</p>
          <button
            onClick={() => this.incrementFieldCount(this.props.field)}
            disabled={this.props.userCash < this.currentCard.price}
            className={this.currentCard.count > 8 ? 'gray-scale disabled-pointer-events' : ''}
          >
            {this.generateIncrementButtonText()}
          </button>

          <button
            className={this.feedBrokenButtonDisplay()}
            onClick={() => { this.fixFeedBroken() }}
          // disabled={this.state.feedChainBroken === false}
          >
            Fix Feed
          </button>

          {feedDisplay}

          <button
            onClick={() => { this.hireManager(this.props.field, this.props.screen) }}
            className={(this.currentCard.manager || this.currentCard.count < 1 || this.props.userCash < this.currentCard.price * 3 ? 'gray-scale disabled-pointer-events' : '')}
            disabled={this.currentCard.manager || this.currentCard.count < 1}
          >
            {/* {!this.currentCard.manager ? `hire manager($${this.currentCard.price * 5})` : `Producing ${rateMap[this.currentCard.count]} ${this.props.type} /sec`} */}
            {!this.currentCard.manager ? this.generateHireManagerButtonText() : `Producing ${rateMap[this.currentCard.count]} ${this.props.type} /sec`}

          </button>
        </div>

        <div className={this.props.managerDisplay ? 'display-invisible' : ''}>

          <ProgressBar
            percentage={this.state.percentage}
            screen={this.props.screen}
            type={this.props.type}
            count={this.currentCard.count}
            //enoughFeed will be true for all crops and animals without a .count and will be disabled elsewhere to limit enoughFeed calls
            enoughFeed={this.props.screen === 'animals' && this.currentCard.count > 0 ? enoughFeed(this.ccFeed, this.currentCard, this.props.inventory) : true}
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