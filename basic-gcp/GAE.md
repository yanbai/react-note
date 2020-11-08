# Google app engine

# basic
Cloud Shell is a built-in command-line tool for the console. We're going to use Cloud Shell to deploy our app.

## resource manager
GCP resource manager
https://console.cloud.google.com/cloud-resource-manager?_ga=2.54544099.972416177.1582208003-14149029.1582208003

2020/6
ilovestevenzhang@gmail.com
No organization
	ByneForChanslate id:concise-ivy-770

Project name
ByneForChanslate

Project ID
concise-ivy-770

Project number
440922249091

## project
https://console.cloud.google.com/home/dashboard?project=zendesign&folder=&organizationId=

## compare with GKE GCE
Start
https://cloud.google.com/sdk/auth_success

Information about command-line tools and client libraries
• Build a web app and host it on Google App Engine.
To get started, follow the walkthrough in the Google Cloud Console to Try Google App Engine Now.

• Launch large compute clusters on Google Compute Engine.
To get started, follow the Compute Engine Quickstart Guide.

• Store vast amounts of data on Google Cloud Storage.
To get started, follow the Hello Google Cloud Storage Tutorial.

• Analyze Big Data in the cloud with Google BigQuery.
To get started, follow the bq Command-Line Tool Quickstart.

• Store and manage data using a MySQL database with Google Cloud SQL.
To get started, see Managing Instances Using the Cloud SDK.

• Make your applications and services available to your users with Google Cloud DNS.
To get started, see Getting started with Google Cloud DNS.

# formally start 具体步骤

## start a project
Creating and Managing Projects

This is part of start

From <https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project>

## active bill account

## download SDK(gcloud CMD is part or SDK)

## app.ymal
部署GAE最重要就是app.ymal, 后面有一些实践
https://cloud.google.com/appengine/docs/standard/python/config/appref

## 在项目目录里面执行gcloud app deploy


# API
https://cloud.google.com/sdk/gcloud/reference/app/browse?authuser=1

Gcloud init --console-only
Gcloud auth login --no-launch-browser
gcloud auth activate-service-account [account] --key-file=[key-file]
Gcloud auth list

// switch account
Gcloud config set account [account]

## Config api
// Can also switch config and creating new account
Gcloud config configurations activate [config]

Gcloud config list

Gcloud config confiurations create [name]

Gcloud config set project [project]

# practice

## How to deploy a static React site to Google Cloud Platform
https://medium.com/google-cloud/how-to-deploy-a-static-react-site-to-google-cloud-platform-55ff0bd0f509

## How to deploy Storybook on Google App Engine
https://blog.themainingredient.co/how-to-deploy-storybook-on-google-app-engine-837d767f347e

## offcial project code base
https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/appengine/hello-world/standard/app.yaml

## my custom app.yaml

```bash
runtime: python27
api_version: 1
threadsafe: true
skip_files:
- .storybook/
- build/
- node_modules/
- public/
- src/
- .editorconfig
- .env
- .eslintrc.js
- .gitignore
- app.yaml
- package.json
- README.md
- yarn-error.log
- yarn.lock

handlers:
  - url: /
    static_files: storybook-static/index.html
    upload: storybook-static/index.html

  - url: /(.*)
    static_files: storybook-static/\1
    upload: storybook-static/(.*)
```

https://zendesigner.appspot.com/
