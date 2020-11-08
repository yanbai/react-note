# react css themr
https://www.npmjs.com/package/react-css-themr

# why

当您使用CSS模块来样式化组件时，classnames对象通常会从相同的组件导入。因为css类在默认情况下是有作用域的，所以没有一种简单的方法可以让您的组件对外部环境进行自定义。

# approach
从“future-react-ui”和“react-themeable”(https://github.com/markdalgleish/react-themeable)的观点出发，组件应该不带样式。这意味着我们可以将样式视为可注入的依赖项。在CSS模块中，可以将导入的classnames对象视为组件的主题。因此，每个样式组件都应该定义一个用于呈现函数的classnameAPI。

提供classname对象的最直接方法是通过props。如果您想导入一个已经注入主题的组件，您必须编写一个更高阶的组件来完成这项工作。这对于您自己的组件是可以的，但是对于像React Toolbox或Belle这样的ui工具包，您必须为您想使用的每个组件编写一个包装器。按照这种设想，您可以将主题理解为针对不同组件的一组相关classname对象。将它们组合在一个对象中并使用context在组件树中移动它是有意义的。通过这种方式，您可以通过context、HOC或props来提供主题。

react-css-themr方法由一个provider和一个decorator组成。 provider 设置context主题。根据配置、context和props，decorator向组件添加了确定应该使用哪个主题或如何组合主题的逻辑。

# combining css modules
组件有三种可能的来源。按优先级排序:context，配置和props。它们中的任何一个都可能丢失。如果有多个主题，你可能想要以三种不同的方式组成最终的classnames对象:
Override:使用的是优先级最高的主题对象。
Softly merging:合并主题对象，但如果一个键出现在多个对象中，最终值对应优先级最高的主题。
Deeply merging:合并主题对象，如果一个键出现在多个对象中，则连接每个对象的值。
你可以选择你想要的。我们认为最后一个是最灵活的，因此默认选择它。

# How does it work?

假设您有一个按钮组件，希望将其设置为可主题。您应该传递一个惟一的名称标识符，用于在出现主题时从context检索其主题。

```bash
// Button.js
import React, { Component } from 'react';
import { themr } from 'react-css-themr';

@themr('MyThemedButton')
class Button extends Component {
  render() {
    const { theme, icon, children } = this.props;
    return (
      <button className={theme.button}>
        { icon ? <i className={theme.icon}>{icon}</i> : null}
        <span className={theme.content}>{children}</span>
      </button>
    )
  }
}

export default Button;

The component is defining an API for theming that consists of three classnames: button, icon and content. Now, a component can use a button with a success theme like:

import Button from './Button';
import successTheme from './SuccessButton.css';

export default (props) => (
  <div {...props}>
    <p>Do you like it?</p>
    <Button theme={successTheme}>Yeah!</Button>
  </div>
);
```
```bash
Default theming
如果使用带有基本主题的组件，则可能需要导入带有已注入主题的组件。然后你可以通过props和另一个主题对象来组成它的风格。在这种情况下，基础css将始终绑定:

// SuccessButton.js
import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import successTheme from './SuccessButton.css';

@themr('MySuccessButton', successTheme)
class Button extends Component {
  render() {
    const { theme, icon, children } = this.props;
    return (
      <button className={theme.button}>
        { icon ? <i className={theme.icon}>{icon}</i> : null}
        <span className={theme.content}>{children}</span>
      </button>
    )
  }
}

export default Button;
Imagine you want to make the success button uppercase for a specific case. You can include the classname mixed with other classnames:

import React from 'react';
import SuccessButton from 'SuccessButon';
import style from './Section.css';

export default () => (
  <section className={style.section}>
    <SuccessButton theme={style.button}>Yai!</SuccessButton>
  </section>
);
And being Section.css something like:

.section { border: 1px solid red; }
.button  { text-transform: uppercase; }
The final classnames object for the Button component would include class values from SuccessButton.css and Section.css so it would be uppercase!
```
```bash
Context theming
Although context theming is not limited to ui-kits, it is very useful to avoid declaring hoc for every component. For example, in react-toolbox, you can define a context theme like:

import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'react-css-themr';
import App from './app'

const contextTheme = {
  RTButton: require('react-toolbox/lib/button/style.scss'),
  RTDialog: require('react-toolbox/lib/dialog/style.scss')
};

const content = (
  <ThemeProvider theme={contextTheme}>
    <App />
  </ThemeProvider>
);

render(content, document.getElementById('app'));
The main idea is to inject classnames objects for each component via context. This way you can have the whole theme in a single place and forget about including styles in every require. Any component Button or Dialog from will use the provided styles in the context.
```

# API
```bash
<ThemeProvider theme>
Makes available a theme context to use in styled components. The shape of the theme object consists of an object whose keys are identifiers for styled components provided with the themr function with each theme as the corresponding value. Useful for ui-kits.

themr(Identifier, [defaultTheme], [options])
Returns a function to wrap a component and make it themeable.

The returned component accepts a theme, composeTheme, innerRef and mapThemrProps props apart from the props of the original component. They former two are used to provide a theme to the component and to configure the style composition, which can be configured via options too. innerRef is used to pass a ref callback to the decorated component and mapThemrProps is a function that can be used to map properties to the decorated component. The function arguments are:

Identifier (String) used to provide a unique identifier to the component that will be used to get a theme from context.
[defaultTheme] (Object) is classname object resolved from CSS modules. It will be used as the default theme to calculate a new theme that will be passed to the component.
[options] (Object) If specified it allows to customize the behavior:
[composeTheme = 'deeply'] (String) allows to customize the way themes are merged or to disable merging completely. The accepted values are deeply to deeply merge themes, softly to softly merge themes and false to disable theme merging.
[mapThemrProps = (props, theme) => ({ ref, theme })] (Function) allows to customize how properties are passed down to the decorated component. By default, themr extracts all own properties passing down just innerRef as ref and the generated theme as theme. If you are decorating a component that needs to map the reference or any other custom property, this function is called with all properties given to the component plus the generated theme in the second parameter. It should return the properties you want to pass.
```
# about

The project is originally authored by Javi Velasco as an effort of providing a better customization experience for React Toolbox. Any comments, improvements or feedback is highly appreciated.

Thanks to Nik Graf and Mark Dalgleish for their thoughts about theming and customization for React components.
