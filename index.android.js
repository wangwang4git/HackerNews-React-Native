'use strict';
// 使用 Javascript 严格模式，区别于正常模式，参考 http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html

var React = require('react-native');
// 引用 react-native 模块，ES5语法
// ES5 ES6 语法对比，参考 http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  WebView,
  BackAndroid
} = React;
// 引用 react-native 的具体模块，ES5语法

var _navigator;

var ToolbarAndroid = require('ToolbarAndroid');

var Dashboard = require('./App/Views/Dashboard/index.android.js');
var Post = require('./App/Views/Post/index.android.js');
// 引用导出模块，ES5语法

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

// 定义组件，ES5语法
var HackerNews = React.createClass({
  // 给组件定义方法，ES5语法
  render: function() {
    return (
      // Navigator 组件使用，参考 http://bbs.reactnative.cn/topic/20/%E6%96%B0%E6%89%8B%E7%90%86%E8%A7%A3navigator%E7%9A%84%E6%95%99%E7%A8%8B
      <Navigator
        style={styles.container}
        tintColor='#FF6600'
        // 设置 默认页面
        initialRoute={{id: 'Dashboard'}}
        // 设置 路由
        renderScene={this.navigatorRenderScene}/>
    );
  },
  navigatorRenderScene: function(route, navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'Dashboard':
        return (<Dashboard navigator={navigator} />);
      case 'Post':
        return (<Post navigator={navigator}
                      title={route.title}
                      post={route.post}/>);
      case 'Web':
          return (
            <View style={{flex: 1}}>
                <ToolbarAndroid style={styles.toolbar}
                                title={route.title}
                                navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
                                onIconClicked={navigator.pop}
                                titleColor={'#FFFFFF'}/>
                <WebView source={{uri: route.url}}
                         javaScriptEnabled={true}/>
            </View>
          );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF6600'
  }
});

AppRegistry.registerComponent('HackerNews', () => HackerNews);

module.exports = HackerNews;
// 导出模块，ES5语法
