# SplitChunksPlugin

最初，chunks(以及其中导入的modules)在内部webpack图中通过父子关系连接。CommonsChunkPlugin用于避免它们之间的重复依赖关系，但无法进一步优化。
从webpack v4开始，CommonsChunkPlugin就被删除了，以支持optimization.splitchunks。

## Defaults

开箱即用SplitChunksPlugin应该适合大多数用户。
默认情况下，它只影响按需的chunks，因为更改初始chunks将影响HTML文件应该包含的脚本标记来运行项目。
webpack会根据以下条件自动分割数据块:

共享chunk或者来自node_modules文件夹的modules
大于30kb的chunk (min+gz之前)
当按需加载块时，并行请求的最大数量将小于或等于6
在初始页面加载时并行请求的最大数量将小于或等于4

当试图满足最后两个条件时，更大的块是首选。

## Configuration

webpack为开发人员提供了一组选项，可以更好地控制这个功能。
选择默认配置是为了适应web性能最佳实践，但是项目的最佳策略可能有所不同。如果您正在更改配置，您应该度量更改的影响，以确保有真正的好处。
### optimization.splitChunks
```js
This configuration object represents the default behavior of the SplitChunksPlugin.

webpack.config.js

module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
When files paths are processed by webpack, they always contain / on Unix systems and \ on Windows. That's why using [\\/] in {cacheGroup}.test fields is necessary to represent a path separator. / or \ in {cacheGroup}.test will cause issues when used cross-platform.

Since webpack 5, passing an entry name to {cacheGroup}.test and using a name of an existing chunk for {cacheGroup}.name is no longer allowed.
```

### splitChunks.automaticNameDelimiter
--specify the delimiter to use for the generated names
### splitChunks.chunks
--This indicates which chunks will be selected for optimization, all, async, and initial
### splitChunks.maxAsyncRequests
--Maximum number of parallel requests when on-demand loading.
### splitChunks.maxInitialRequests
--Maximum number of parallel requests at an entry point.
### splitChunks.minChunks
--Minimum number of chunks that must share a module before splitting.
### splitChunks.minSize
--Minimum size, in bytes, for a chunk to be generated.
### splitChunks.minRemainingSize

### splitChunks.cacheGroups.{cacheGroup}.minRemainingSize

### splitChunks.maxSize
--Using maxSize tells webpack to try to split chunks bigger than maxSize bytes into smaller parts
maxSize option is intended to be used with HTTP/2 and long term caching. It increases the request count for better caching. It could also be used to decrease the file size for faster rebuilding.
### splitChunks.maxAsyncSize
--The difference between maxAsyncSize and maxSize is that maxAsyncSize will only affect on-demand loading chunks.
### splitChunks.maxInitialSize

### splitChunks.name
--The name of the split chunk. Providing true will automatically generate a name based on chunks and cache group key.

Providing a string or a function allows you to use a custom name
```js
main.js

import _ from 'lodash';

console.log(_.join(['Hello', 'webpack'], ' '));
webpack.config.js

module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module.identifier().split('/').reduceRight(item => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all'
        }
      }
    }
  }
};
```
would also output a chunk of the group common with next name: commons-main-lodash.js
### splitChunks.automaticNamePrefix
--Sets the name prefix for created chunks
### splitChunks.cacheGroups

### splitChunks.cacheGroups.{cacheGroup}.priority
--A module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority
### splitChunks.cacheGroups.{cacheGroup}.reuseExistingChunk
--If the current chunk contains modules already split out from the main bundle, it will be reused instead of a new one being generated
### splitChunks.cacheGroups.{cacheGroup}.type
function RegExp string
Allows to assign modules to a cache group by module type.
```js
webpack.config.js

module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        json: {
          type: 'json'
        }
      }
    }
  }
};
```
### splitChunks.cacheGroups.{cacheGroup}.test
Controls which modules are selected by this cache group
When a chunk name is matched, all modules in the chunk are selected.
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        svgGroup: {
          test(module, chunks) {
            // `module.resource` contains the absolute path of the file on disk.
            // Note the usage of `path.sep` instead of / or \, for cross-platform compatibility.
            const path = require('path');
            return module.resource &&
                 module.resource.endsWith('.svg') &&
                 module.resource.includes(`${path.sep}cacheable_svgs${path.sep}`);
          }
        },
        byModuleTypeGroup: {
          test(module, chunks) {
            return module.type === 'javascript/auto';
          }
        }
      }
    }
  }
};
```
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          // Note the usage of `[\\/]` as a path separator for cross-platform compatibility.
          test: /[\\/]node_modules[\\/]|vendor[\\/]analytics_provider|vendor[\\/]other_lib/
        }
      }
    }
  }
};
```
### splitChunks.cacheGroups.{cacheGroup}.filename
Allows to override the filename when and only when it's an initial chunk. All placeholders available in output.filename are also available here.

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: '[name].bundle.js'
        }
      }
    }
  }
};

```
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: (pathData) => {
            // Use pathData object for generating filename string based on your requirements
            return `${pathData.chunk.name}-bundle.js`;
          }
        }
      }
    }
  }
};
```
```js
 create a folder structure
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: 'js/[name]/bundle.js'
        }
      }
    }
  }
};
```

### splitChunks.cacheGroups.{cacheGroup}.enforce
--boolean = false

Tells webpack to ignore splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests options and always create chunks for this cache group.


Further Reading
webpack's automatic deduplication algorithm example
(https://github.com/webpack/webpack/blob/master/examples/many-pages/README.md)
webpack 4: Code Splitting, chunk graph and the splitChunks optimization
(https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366)


## practise:
### webpack graph
```js
1.commonjs
    import 'assets/style/_base.scss'
2.button
    import React from 'react'
    import style from './index.module.scss'
    import Icon from '../Icon'
    import classNames from 'classnames'
3.checkbox
    import React from 'react'
    import style from './index.module.scss'
    import PropTypes from 'prop-types'
4.collapse
    import React from 'react'
    import Icon from '../Icon'
    import style from './index.module.scss'
    import classNames from 'classnames'
5.Icon
    import React from 'react'
    import './index.scss'
6.input
    import React from 'react'
    import style from './index.module.scss'
    import classnames from 'classnames'
7.modal
    import React from 'react'
    import style from './index.module.scss'
    import classnames from 'classnames'
8.radio
    import React from 'react'
    import style from './index.module.scss'
    import classnames from 'classnames'
9.select
    import React from 'react'
    import style from './index.module.scss'
    import PropTypes from 'prop-types'
    import onClickOutside from 'react-onclickoutside'
    import Icon from '../Icon'
    import find from 'lodash/find'
    import classNames from 'classnames'

react [2-9] 8
classnames [2,3,4, 6-9] 6
PropTypes [3, 9]
icon [2, 4, 9]
onClickOutside [9]
find [9]
```

## before split chunk

## some packages
```js
./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/:
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
./node_modules/scheduler/xxx
  ./node_modules/scheduler/cjs/scheduler-tracing.development.js
  ./node_modules/scheduler/cjs/scheduler.development.js
  ./node_modules/scheduler/index.js
  ./node_modules/scheduler/tracing.js
```
## solution 1;
```js
optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {
        name: 'commons',
        chunks: 'initial',
        minChunks: 2
      }
    }
  }
}
```
```js
// size:
  commons    98
  common    5
  button    15
  checkbox  13
  collapse  15
  icon  7
  input 11
  modal 11
  radio 14
  select  1163
```
```js
// commons.js
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/xxx
  ./node_modules/classnames/index.js
  ./node_modules/object-assign/index.js
  ./node_modules/prop-types/checkPropTypes.js
  ./node_modules/prop-types/lib/ReactPropTypesSecret.js
  ./node_modules/react/cjs/react.development.js
  ./node_modules/react/index.js
  ./src/components/Icon/index.js
  ./src/components/Icon/index.scss // extracted by mini-css-extract-plugin
// button
  ./src/components/Button/index.js
  ./src/components/Button/index.module.scss
// select
  ./node_modules/lodash/xxx
  ./node_modules/react-dom/cjs/react-dom.development.js
  ./node_modules/react-dom/index.js
  ./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js
  ./node_modules/scheduler/xxx
  ./node_modules/webpack/buildin/global.js
  ./node_modules/webpack/buildin/module.js
  ./src/components/Select/index.js
  ./src/components/Select/index.module.scss // extracted by mini-css-extract-plugin
```

## solution 2;
```js
optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}
```
```js
// size:
  vendor  1243
  common  5
  button  17
  checkbox  13
  collapse  17
  icon  9
  input 11
  modal 11
  radio 14
  select  18
```
```js
// vendor.js
./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/xxx
./node_modules/classnames/index.js
./node_modules/lodash/xxx
./node_modules/object-assign/index.js
./node_modules/prop-types/checkPropTypes.js
./node_modules/prop-types/lib/ReactPropTypesSecret.js
./node_modules/react-dom/cjs/react-dom.development.js
./node_modules/react-dom/index.js
./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js
./node_modules/react/cjs/react.development.js
./node_modules/react/index.js
./node_modules/scheduler/xxx
./node_modules/webpack/buildin/global.js
./node_modules/webpack/buildin/module.js
// button.js
./src/components/Button/index.js
./src/components/Button/index.module.scss
./src/components/Icon/index.js
./src/components/Icon/index.scss
// select.js
./src/components/Icon/index.js
./src/components/Icon/index.scss
./src/components/Select/index.js
./src/components/Select/index.module.scss
```

## solution 3;
```js
optimization: {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'vendor',
        chunks: 'all',
      }
    }
  }
}
```
```js
// size:
  vendor  1018
  common  5
  button  44
  checkbox  37
  collapse  44
  icon  20
  input 24
  modal 21
  radio 41
  select  243
```
```js
// vendor.js
  ./node_modules/react-dom/cjs/react-dom.development.js
  ./node_modules/react-dom/index.js
  ./node_modules/react/cjs/react.development.js
  ./node_modules/react/index.js
// button
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/xxx
  ./node_modules/classnames/index.js
  ./node_modules/object-assign/index.js
  ./node_modules/prop-types/checkPropTypes.js
  ./node_modules/prop-types/lib/ReactPropTypesSecret.js
  ./src/components/Button/index.js
  ./src/components/Button/index.module.scss
  ./src/components/Icon/index.js
  ./src/components/Icon/index.scss
// select
  ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/xxx
  ./node_modules/classnames/index.js
  ./node_modules/lodash/xxx
  ./node_modules/object-assign/index.js
  ./node_modules/prop-types/checkPropTypes.js
  ./node_modules/prop-types/lib/ReactPropTypesSecret.js
  ./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js
  ./node_modules/scheduler/xxx
  ./node_modules/webpack/buildin/global.js
  ./node_modules/webpack/buildin/module.js
  ./src/components/Icon/index.js
  ./src/components/Icon/index.scss
  ./src/components/Select/index.js
  ./src/components/Select/index.module.scss
```
