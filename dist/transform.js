//--------------------------------------------------------------------------
//
// carnaby.transform
// Copyright (c) 2015 M&C Saatchi
// Distributed under MIT license
//
//--------------------------------------------------------------------------

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('underscore'), require('jquery'));
    } else {
        root.transform = factory(root._, root.$);
    }
})(this, function(_, $) {
var underscore = _, jquery = $;
/*
 * Given an array of `rule` functions, describes transforms a DOM tree into
 * a custom element tree.
 */
var transform, selector, rule;
transform = function (_, $) {
  'use strict';
  function children(el) {
    return $(el).children();
  }
  function ruleFinder(rules, el) {
    return _.find(rules, function (rule) {
      return rule.isValidRoot(el);
    });
  }
  function node(el, rule) {
    if (!rule) {
      return;
    }
    return {
      el: el,
      rule: rule
    };
  }
  function validChild(node, parentRule) {
    return !!node && parentRule.isValidChild(node.el);
  }
  return function (rules) {
    var findRule = _.partial(ruleFinder, rules || []);
    function childIterator(parentRule, children, candidate) {
      var child = node(candidate, findRule(candidate));
      if (validChild(child, parentRule)) {
        return children.concat(nodeIterator(child));
      }
      return children.concat(childReducer(candidate, parentRule));
    }
    function childReducer(el, parentRule) {
      return _.reduce(children(el), _.partial(childIterator, parentRule), []);
    }
    function nodeIterator(currentNode) {
      if (!currentNode) {
        return;
      }
      currentNode.children = childReducer(currentNode.el, currentNode.rule);
      return currentNode;
    }
    return function (root) {
      return {
        tree: function () {
          return nodeIterator(node(root, findRule(root)));
        }
      };
    };
  };
}(underscore, jquery);
selector = function (_, $) {
  'use strict';
  function selectorValue(value) {
    return _.isString(value) ? '="' + value + '"' : '';
  }
  function selector(name, value) {
    return '[data-' + name + selectorValue(value) + ']';
  }
  return function (name) {
    var sel = function (el) {
      var $el = $(el);
      var valid = $el.is(selector(name));
      return {
        value: function () {
          return valid ? $el.attr(name) : undefined;
        },
        isValid: function () {
          return valid;
        }
      };
    };
    sel.selector = function (value) {
      return selector(name, value);
    };
    return sel;
  };
}(underscore, jquery);
rule = function (_) {
  'use strict';
  function validateChild(el) {
    return function (sel) {
      return sel(el).isValid();
    };
  }
  return function (rootSelector, childSelectors) {
    childSelectors = childSelectors || [];
    return {
      rootKey: function () {
        return rootSelector.selector();
      },
      childKey: function (el) {
        var sel = _.find(childSelectors, validateChild(el));
        return !!sel ? sel.selector() : undefined;
      },
      rootSelector: function () {
        return rootSelector;
      },
      isValidRoot: function (el) {
        return rootSelector(el).isValid();
      },
      isValidChild: function (el) {
        return _.some(childSelectors, validateChild(el));
      }
    };
  };
}(underscore);
transform.VERSION = '0.1.11'
transform.selector = selector;
transform.rule = rule;
return transform;
});
/*
                                                  /
                                                .7
                                     \       , //
                                     |\.--._/|//
                                    /\ ) ) ).'/
                                   /(  \  // /
                                  /(   J`((_/ \
                                 / ) | _\     /
                                /|)  \  eJ    L
                               |  \ L \   L   L
                              /  \  J  `. J   L
                              |  )   L   \/   \
                             /  \    J   (\   /
           _....___         |  \      \   \```
    ,.._.-'        '''--...-||\     -. \   \
  .'.=.'                    `         `.\ [ Y
 /   /                                  \]  J
Y / Y                                    Y   L
| | |          \                         |   L
| | |           Y                        A  J
|   I           |                       /I\ /
|    \          I             \        ( |]/|
J     \         /._           /        -tI/ |
 L     )       /   /'-------'J           `'-:.
 J   .'      ,'  ,' ,     \   `'-.__          \
  \ T      ,'  ,'   )\    /|        ';'---7   /
   \|    ,'L  Y...-' / _.' /         \   /   /
    J   Y  |  J    .'-'   /         ,--.(   /
     L  |  J   L -'     .'         /  |    /\
     |  J.  L  J     .-;.-/       |    \ .' /
     J   L`-J   L____,.-'`        |  _.-'   |
      L  J   L  J                  ``  J    |
      J   L  |   L                     J    |
       L  J  L    \                    L    \
       |   L  ) _.'\                    ) _.'\
       L    \('`    \                  ('`    \
        ) _.'\`-....'                   `-....'
       ('`    \
        `-.___/   sk
*/
