import enoughFeed from './enoughFeed';

const inventory = {
  wheat: 5
}
const feed = ['wheat'];


it('returns false if inventory does not have enough', () => {
  const call = enoughFeed(feed, {count:1, type: 'chicken1'} ,inventory);
  expect(call).toBe(true);
})

it('returns true if inventory does have enough', () => {
  const call = enoughFeed(feed, {count:6, type: 'chicken1'} ,inventory);
  expect(call).toBe(false);
})