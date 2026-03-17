import * as React from "react";

const ContributePage = () => {
  React.useEffect(() => {
    window.location.replace("https://opencollective.com/loathers");
  }, []);

  return null;
};

export default ContributePage;

export const Head = () => (
  <meta
    httpEquiv="refresh"
    content="0;url=https://opencollective.com/loathers"
  />
);
