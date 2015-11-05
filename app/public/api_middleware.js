export default store => next => action => {
  console.log('in api middleware', action);
  return next(action);
};
