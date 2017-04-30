const _ = require('lodash');
const friends = require('../data/friends.js');

const friendsScores = _.reduce(friends, (arr, friend)=>{
  arr.push(friend.scores);
  return arr;
},[]);

module.exports = app => {
  app.post('/api/friends', (req, res) => {
    let myScore = _.reduce(_.get(req.body,'survey', []), (memo,question)=>{
      memo.push(question.selection);
      return memo;
    }, []);

    let scoresDifference = _.reduce(friendsScores, (scoreArray ,friend) =>{
      scoreArray.push(calcDifference(myScore, friend));
      return scoreArray;
    }, [])
    let lowestIndex = findLowestScoreIndex(scoresDifference);
    res.json(friends[lowestIndex]);
  });

  app.get('/api/friends', (req, res) => {
    res.json(friends);
  })
};


const calcDifference = (person1, person2) =>{
  const sum = _.reduce(person1, (total, score, i) =>{
    return total + Math.abs((+person1[i]) - (+person2[i]))
  }, 0);
  return sum;
}

const findLowestScoreIndex = scores => {
  return _.reduce(scores, (minIndex, score, i)=>{
    if (score < scores[minIndex]){
      return i;
    } else {
      return minIndex;
    }
  }, 0)
}