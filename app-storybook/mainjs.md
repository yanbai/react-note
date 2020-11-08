# output webpack config
webpackFinal: (config) => console.dir(config, { depth: null }) || config

# center component
.storybook/center.js
```bash
import React from 'react'
const styles = {
  textAlign: 'center'
};
const Center = ({ children }) => <div style={styles}>{children}</div>;
export default Center

```

.storybook/preview.js
```bash
import React from 'react'
import { addDecorator } from '@storybook/react';
import Center from './center';

addDecorator(storyFn => <Center>{storyFn()}</Center>);

```
