/**
 * Created by Nitsan on 18/01/2017.
 */
const requireAll = require('app/components/core/utils/utils.js');

angular.module('signup',[]);

requireAll(require.context("./config", true, /.*\.(js||es6)$/));
requireAll(require.context("./components", true, /.*\.(js||es6)$/));