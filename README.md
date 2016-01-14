
This is a boilerplate for making very custom applications. It follows the atomic component structure, includes development pages for viewing individual components, hot reloading and more!

The development server has a proper CLI and runs on a different port from the main server, allowing it to behave like a CDN.

It used react@0.14.3 and react-router@1.0.3

## Getting started

Fetch the dependencies. If you don't have node/npm installed.

    npm install

To run production server:

    # build all assets with webpack first:
    npm run-script build

    # and run server in production mode
    npm start


To run the normal development server on localhost:8080 with the assets on localhost:8081:

    npm run-script start-dev

To run the development pages on localhost:9080 and assets on localhost:9081:

    npm run-script start-dev-pages

To run tests:

    env NODE_ENV=test ./scripts/test

    # run tests on change
    env NODE_ENV=test ./scripts/test --watch

    # only specific tests
    env NODE_ENV=test ./scripts/test src/atoms/Box.test.js

There are some more options:

    $ ./scripts/dev -h
    Options:
      -h, --help          Show help                                        [boolean]
      --asset-url         where assets are to be served from
      --main-url          the main web server root
      --prod              do a development build (default)                 [boolean]
      --only-dev-server   only serve assets                                [boolean]
      --only-main-server  don't run dev-server                             [boolean]
      --dev-pages         instead of running the main app, run the individual
                          component pages

## Development Pages

The development pages allow you to view individual components. Hot reloading is supported here, so you can very quickly make changes.

It allows you to see many variations of the component at once, and serves as documentation.

> TODO: (picture of development pages)

## Docs

Many directories have .md files in them. These serve as an explaination for you and any other developers joining the project.
I recommend not deleting them, and adding more docs specific to your application in a similar way.

## Atomic

Atoms are your low level components. Included is set of atoms that allow you to build most things.
Unlike third party component libraries, these are your own to modify or remove.
Atoms such as `<Box>` and `<Header>` allow you to avoid using dom components directly in higher level views,
and encourage consistency across large applications.

Read more about this in the README.md in the [atoms], [molecules] and [pages] directories.

[atoms]: src/atoms/README.md
[molecules]: src/molecules/README.md
[pages]: src/pages/README.md
