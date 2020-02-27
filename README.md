# hardoor

[![NPM version](https://img.shields.io/npm/v/hardoor.svg)](https://www.npmjs.com/package/hardoor)
[![Build Status](https://www.travis-ci.org/SystemLight/hardoor.svg?branch=master)](https://www.travis-ci.org/SystemLight/hardoor)

Hardoor can automatically generate front-end project templates.   
NPM page: https://www.npmjs.com/package/hardoor

# Installation

```
npm install hardoor -g
```

# Use hardoor to generate project template after V0.3.0

## View list of installable templates

```
hardoor list

or

hardoor list -b
```

## Install templates, such as React templates

```
hardoor install react-webpack -a
```

## View parameter description

```
hardoor install -h
```

## Inject vue-router template fragment into the project

```
hardoor i vue-router -b -p ./src
```

# Note

- If installation is slow, change npm repository
- Use `hardoor list -b` when the template lacks features to see if there are suitable patches
- Use `hardoor install -b <patch>` must be in the project path

# Resources

You can read [hardoor Documentation](https://github.com/SystemLight/hardoor) online for more information.

# License

hardoor uses the MIT license, see LICENSE file for the details.
