# Creating and publishing unscoped public packages
https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages

注意:您只能将未限定作用域的包发布到npm公共注册表。不能将未限定作用域的包发布到npm企业注册中心。
作为一个npm用户，您可以创建未限定作用域的包来在您自己的项目中使用，并将它们发布到npm公共注册表中，以便其他人在他们的项目中使用。未限定作用域的包总是公共的，只通过包名引用:


## Create your package
## Review package contents for sensitive or unnecessary information
向注册中心发布敏感信息可能会伤害您的用户，危及您的开发基础设施，修复成本高昂，并使您面临法律诉讼的风险。我们强烈建议在将包发布到注册中心之前删除敏感信息，如私钥、密码、个人识别信息(PII)和信用卡数据。
对于不太敏感的信息，比如测试数据，使用.npmignore或.gitignore文件来防止发布到注册表。有关更多信息，请参阅本文。
## Test your package
## Publish your package

