module.exports = {
    client: {
      includes: [`${__dirname}/graphql/*.graphql`],
      service: {
        name: "postgraphql",
        localSchemaFile: `${__dirname}/graphql/*.graphql`,
      },
    },
  };
  