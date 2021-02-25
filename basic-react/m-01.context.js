// basic
const ThemeContext = React.createContext("light");
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

class ThemeButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

// 2. dynamic context
import { ThemeContext, themes } from "./theme-context";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };
  }

  render() {
    return (
      <>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
      </>
    );
  }
}

// 3. context 包括数据和函数

const ThemeContext = React.createContext({
  theme: theme.dark,
  toggleTheme: () => {},
});

function ThemeToggleButton() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => {
        return (
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: theme.background,
            }}
          >
            Toggle Theme
          </button>
        );
      }}
    </ThemeContext.Consumer>
  );
}

import { ThemeContext, themes } from "./theme-context";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 整个state传递进入provider
    return (
      <ThemeContext.Provider value={this.state}>
        <ThemeToggleButton />
      </ThemeContext.Provider>
    );
  }
}

// 4.消费多个context
const ThemeContext = React.createContext("light");

const UserContext = React.createContext({
  name: "guest",
});
class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props;

    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Content></Content>
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <UserContext.Consumer>
          {(user) => (
            <div>
              {user} {theme}
            </div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

// 5.useContext
const themes = {
  light: {
    background: "#ffffff",
  },
  dark: {
    background: "#000000",
  },
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme.background,
      }}
    >
      I am styled by theme context
    </button>
  );
}
