import { gql, useQuery } from "@apollo/client";

import RepoInfos, { RepoDetailFragment } from "../../components/repository";
import DefaultLayout from "../../layouts/default";

const SEARCH = gql`
  query {
    search(
      query: "stars:>7000 created:2021-01-01..2021-11-22"
      type: REPOSITORY
      first: 20
    ) {
      nodes {
        ...RepoDetail_RepoDetailFragment
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }

  ${RepoDetailFragment}
`;

const Magic: React.FC = () => {
  const { data } = useQuery(SEARCH);

  console.log(data);

  return (
    <DefaultLayout className="app-container">
      <div className="h-full flex flex-row">
        <RepoInfos repositoryInfos={data?.search?.nodes || []} />
      </div>
    </DefaultLayout>
  );
};

export default Magic;
