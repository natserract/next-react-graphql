import { useRouter } from "next/router";
import { withApollo } from '../apollo/withApolloCient';
import { useCountriesQuery } from '../__generated__/v1/typescript_operations';

function Home() {
  const { loading, error, data } = useCountriesQuery();
  
  const router = useRouter();
  const navigateLink = (code: string) => {
    router.push(`/country/${code.toLowerCase()}`);
  }

  if (error)
    return <div>Error loading players.</div>;
  if (loading)
    return <h1>Loading</h1>;

  return (
    <div>
      <ul>
        { data && data.countries && data.countries.map((item, index) => (
            <li key={index}>
              <span>Code: {item.code}</span>
              <span>Name: {item.name} </span>
              <button onClick={() => navigateLink(item.code)}>Click Me</button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default withApollo(Home);