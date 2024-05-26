# Kepler

# Developing

To start developing the server, first clone the repository using one of the following commands:
```sh
git clone git@github.com:aelpxy/kepler.git
# or
git clone https://github.com/aelpxy/kepler.git
```

Create a new branch for your feature, following the conventional naming scheme (feat/fix/refactor/chore):
```sh
git branch feat/type

```

To simplify the development process, we provide a `Dockerfile` and `docker-compose.yml`. To get started, run:

```sh
docker compose up
```

Once you've made your changes, create a pull request and our maintainers will review it. If it passes, your code will be merged into the dev branch, and then gradually make its way to the main branch and eventually ship to production.

# Commit Guidelines

When making commits, please follow these guidelines:

* Use **lowercase** commit messages.
* Follow conventional commit message formatting.
* Ensure the description clearly explains what the commit does.

By following these guidelines, we can maintain a clean and readable commit history.

# Code Of Conduct
By participating in this project, including using the repository or contributing to it, you agree to abide by the terms outlined in our [Code of Conduct](./CODE_OF_CONDUCT.md).

# Security
Please adhere to all the guidelines outlined in the [SECURITY.md](./SECURITY.md) file.

# License

Every line of code in this repository is licensed under the terms of the MIT license, as specified in the [LICENSE](./LICENSE) file.