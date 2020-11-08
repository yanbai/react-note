https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
# Creating a package.json file
https://docs.npmjs.com/creating-a-package-json-file
您可以添加一个packagejson文件到您的包，以便其他人易于管理和安装。发布到注册中心的包必须包含一个packagejson文件。
一个packagejson文件:
列出项目所依赖的包
指定项目可以使用语义版本化规则使用的包的版本
使您的构建具有可重复性，因此更容易与其他开发人员共享
注意:为了使您的包更容易在npm网站上找到，我们建议在您的package.json中包含一个description

## package fields

require name and version
The "name" field contains your package’s name, and must be lowercase and one word, and may contain hyphens and underscores.

author
Your Name <email@example.com> (http://example.com)

## default package
npm init --yes

```bash
{
  "name": "my_package",
  "description": "",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ashleygwilliams/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ashleygwilliams/my_package/issues"
  },
  "homepage": "https://github.com/ashleygwilliams/my_package"
}

name: the current directory name
version: always 1.0.0
description: info from the README, or an empty string ""
main: always index.js
scripts: by default creates an empty test script
keywords: empty
author: empty
license: ISC
bugs: information from the current directory, if present
homepage: information from the current directory, if present
```

## ISC
https://opensource.org/licenses/ISC

Copyright <YEAR> <OWNER>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

允许为任何目的使用、复制、修改和/或分发本软件，无论是否收费，只要上述版权声明和本许可声明出现在所有副本中。
本软件是“按原样”提供的，作者不承担与本软件有关的所有保证，包括对适销性和适用性的所有隐含保证。没有任何特殊的作者概,直接、间接或间接损失或使用任何赔偿造成的损失,数据或利润,无论是在一个动作的合同,疏忽或其他侵权行为的行动,引起的或有关的使用该软件的性能。

# Creating Node.js modules

Node.js modules are a type of package that can be published to npm.

## Create a package.json file§
来创建一个package.json,在命令行中，在Node.js模块的根目录下，运行npm init:
对于作用域模块，运行npm init—scope=@scope-name
对于未限定作用域的模块，运行npm init

为所需字段(名称和版本)以及main字段提供响应:
名称:模块的名称。
版本:初始模块版本。我们建议遵循语义版本控制指南，从1.0.0开始。
main:当其他应用程序需要您的模块时，将加载的文件的名称。默认名称是index.js。
浏览有关软件包的更多信息。json文件，请参见“创建一个包”。json文件”。
## Create the file that will be loaded when your module is required by another application§

## Test your module§
