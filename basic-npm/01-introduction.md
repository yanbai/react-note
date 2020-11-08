# About the public npm registry
https://docs.npmjs.com/about-the-public-npm-registry
公共npm注册表是一个JavaScript包的数据库，每个包由软件和元数据(metadata)组成。开放源码开发人员和公司的开发人员使用npm注册中心向整个社区或组织成员贡献包，并下载包用于他们自己的项目。
要开始使用注册表，请注册一个npm帐户，并查看“入门”和CLI文档。
(https://docs.npmjs.com/getting-started/)
(https://docs.npmjs.com/cli-documentation/)

# About packages and modules
npm注册表包含包，其中许多也是节点模块，或者包含节点模块。继续读下去，了解它们之间的区别和相互作用。
## 关于包§
包是由package.json描述的文件或目录。一个包裹必须包含一个package.json文件，以便发布到npm注册表。有关创建package.json的详细信息，请参见“创建package.json文件”。
包可以不限定作用域，也可以限定作用域给用户或Org，限定作用域的包可以是私有的，也可以是公共的。有关更多信息，请参见
“关于作用域”
“关于私人包”
“包范围、访问级别和可见性”

## About package formats§
```bash
A package is any of the following:

a) A folder containing a program described by a package.json file.
b) A gzipped tarball containing (a).
c) A URL that resolves to (b).
d) A <name>@<version> that is published on the registry with (c).
e) A <name>@<tag> that points to (d).
f) A <name> that has a latest tag satisfying (e).
g) A git url that, when cloned, results in (a).
npm package git URL formats§
Git URLs used for npm packages can be formatted in the following ways:

git://github.com/user/project.git#commit-ish
git+ssh://user@hostname:project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish
The commit-ish can be any tag, sha, or branch that can be supplied as an argument to git checkout. The default commit-ish is master.
```

## About modules§

a module is any file or directory in the node_modules directory that can be loaded by the Node.js require() function.

To be loaded by the Node.js require() function, a module must be one of the following:

A folder with a package.json file containing a "main" field.
A folder with an index.js file in it.
A JavaScript file.
Note: Since modules are not required to have a package.json file, not all modules are packages. Only modules that have a package.json file are also packages.
In the context of a Node program, the module is also the thing that was loaded from a file. For example, in the following program:

var req = require('request')
we might say that “The variable req refers to the request module”.

# About scopes
注意:您必须使用npm版本2或更高版本才能使用作用域。要升级到最新版本的npm，在命令行上运行npm install npm@latest -g

当您注册一个npm用户帐户或创建一个组织时，您将被授予一个与您的用户或组织名称匹配的范围。您可以将此范围用作相关包的名称空间。
作用域允许您创建与其他用户或Org创建的包同名的包，而不会产生冲突。
When listed as a dependent in a package.json file, scoped packages are preceded by their scope name. The scope name is everything between the @ and the slash:

To create and publish public scoped packages, see “Creating and publishing scoped public packages”.

To create and publish private scoped packages, see “Creating and publishing private packages”.

## Scopes and package visibility§
未限定作用域的包总是公开的。
私有包总是限定了范围。
范围包默认是私有的;在发布时，必须传递一个命令行标志以使它们公开。
有关包范围和可见性的更多信息，请参见“包范围、访问级别和可见性”。

# About public packages

作为一名npm用户或组织成员，您可以创建和发布任何人都可以在自己的项目中下载和使用的公共包。
Unscoped public packages exist in the global public registry namespace and can be referenced in a package.json file with the package name alone: package-name.

Scoped public packages belong to a user or Org and must be preceded by the user or Org name when included as a dependency in a package.json file:
@username/package-name
@org-name/package-name

# About private packages
必须要付费用户或者组织账号
使用npm私有包，您可以使用npm注册表来托管只对您和所选择的合作者可见的代码，这允许您在项目中管理和使用私有代码以及公共代码。
私有包总是有作用域，作用域包默认是私有的。
用户范围的私有包只能由您和您授予读写权限的合作者访问。有关更多信息，请参见“向用户帐户拥有的私有包添加协作者”。
org范围内的私有包只能由已被授予读或读/写访问权的团队访问。有关更多信息，请参见“管理团队对Org包的访问”。
