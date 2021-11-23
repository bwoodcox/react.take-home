import { gql } from "@apollo/client";

export const RepoDetailFragment = gql`
  fragment RepoDetail_RepoDetailFragment on Repository {
    id
    name
    url
    stargazerCount
    description
    forkCount
    createdAt
    primaryLanguage {
      name
    }
    owner {
      ... on User {
        id
        email
        name
        username: login
      }
    }
  }
`;

interface RepositoryInfo {
  id: string;
  name: string;
  url: string;
  stargazerCount: string;
  description: string;
  forkCount: string;
  createdAt: Date;
  primaryLanguage: {
    name: string;
  };
  owner: {
    id: string;
    email: string;
    name: string;
    username: string;
  };
}

interface RepositoryProps {
  repositoryInfos: RepositoryInfo[];
}

const RepoInfos: React.FC<RepositoryProps> = ({ repositoryInfos = [] }) => {
  return (
    <div className="flex flex-col mx-8 w-full h-full min-h-full">
      <h3 className="text-3xl mb-6 font-semibold">
        Highly Rated Repositories (over 7,500 stars)
      </h3>
      <div className="p-4 grid xlg:grid-cols-3 grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-900 rounded shadow-md h-full mb-16">
        {repositoryInfos.map((repositoryInfo) => (
          <div
            key={repositoryInfo.id}
            className="flex flex-col justify-center p-4 px-8 border rounded border-gray-700"
          >
            <a className="text-2xl" href={repositoryInfo.url}>
              {repositoryInfo.name}
            </a>
            <div className="space-x-2 text-thin">
              <span>
                <span className="font-semibold italic">Owner:</span>{" "}
                {repositoryInfo.owner.name}
              </span>
              <span>
                <span className="font-semibold italic">Username:</span>{" "}
                {repositoryInfo.owner.username}
              </span>
              <span>
                <span className="font-semibold italic">Email:</span>{" "}
                {repositoryInfo.owner.email}
              </span>
            </div>
            <div className="space-x-2 text-thin">
              <span>
                <span className="font-semibold italic">Stars:</span>{" "}
                {repositoryInfo.stargazerCount}
              </span>
              <span>
                <span className="font-semibold italic">Language: </span>
                {repositoryInfo.primaryLanguage?.name}
              </span>
              <span>
                <span className="font-semibold italic">Forks:</span>{" "}
                {repositoryInfo.forkCount}
              </span>
              <span>
                <span className="font-semibold italic">Date Created:</span>{" "}
                {new Date(repositoryInfo.createdAt).toDateString()}
              </span>
            </div>
            <div className="space-x-2 text-thin">
              <span>
                <span className="font-semibold italic">Description:</span>{" "}
                {repositoryInfo.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoInfos;
